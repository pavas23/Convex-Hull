import React, { useEffect, useState } from "react";
import "../css/JarvisMarch.css";
import computeConvexHull from "../algorithms/JarvisMarch";

function JarvisMarch() {
  const [points, setPoints] = useState([]);
  const [edges, setEdges] = useState([]);

  // Function to handle mouse click event
  const handleMouseClick = (event, ctx) => {
    // Get mouse position relative to canvas
    const rect = event.target.getBoundingClientRect();
    var scaleX = event.target.width / rect.width    // relationship bitmap vs. element for x
    var scaleY = event.target.height / rect.height;  
    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fill();

    // Add point to array
    const newPoints = [...points, { x: x, y: y }];
    setPoints(newPoints);

    // Compute convex hull and update edges
    const newEdges = computeConvexHull(newPoints);
    setEdges(newEdges);
  };

  // x and y coordinates
  class Point {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  }

  // defining sleep function
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const drawRemainingEdges = (ctx, edges) => {
    console.log(edges);
    for (var edge of edges) {
      console.log("weubre");
      ctx.strokeStyle = "green";
      ctx.lineWidth = 1
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(edge.p1.x, edge.p1.y);
      ctx.lineTo(edge.p2.x, edge.p2.y);
      ctx.stroke();
    }
  };

  const drawPoints = (ctx) => {
    ctx.fillStyle = "black";
    for (let point of points) {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const getWaypoints = (edge) => {
    var dx = edge.p2.x - edge.p1.x;
    var dy = edge.p2.y - edge.p1.y;
    var waypts = [];
    for (let i = 1; i <= 60; i++) {
      var x = edge.p1.x + (dx * i) / 60;
      var y = edge.p1.y + (dy * i) / 60;
      waypts.push({ x: x, y: y });
    }

    return waypts;
  };

  const drawCanvas = async () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw points
    ctx.fillStyle = "black";
    for (let point of points) {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw edges
    var finalTillNow = [];
    // Draw edges one by one with a delay
    for (let i = 0; i < edges.length; i++) {
      const edge = edges[i];

      if (edge.flag === 0) {
        ctx.strokeStyle = "red";
      } else if (edge.flag === 1) {
        ctx.strokeStyle = "orange";
      } else {
        ctx.strokeStyle = "green";
        finalTillNow.push(edge);
      }

      var waypts = getWaypoints(edge);

      for (let t = 1; t < waypts.length; t++) {
        ctx.lineWidth = 1
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(waypts[t - 1].x, waypts[t - 1].y);
        ctx.lineTo(waypts[t].x, waypts[t].y);
        ctx.stroke();
        await sleep(0.5);
        t++;
      }

      // Add a delay before drawing the next edge
      await sleep(500); // Adjust the delay time as needed

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawPoints(ctx);
      drawRemainingEdges(ctx, finalTillNow);
    }
  };

  const clearCanvas = () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setPoints([])
    setEdges([])
  }
  return (
    <div className="App">
      <canvas
        id="canvas"
        width="800"
        height="600"
        onClick={(event) =>
          handleMouseClick(
            event,
            document.getElementById("canvas").getContext("2d")
          )
        }
      ></canvas>
      <div className="buttonDiv">
      <button onClick={() => drawCanvas()} className="redrawButton">
      Generate Convex Hull
      </button>
      <button onClick={() => clearCanvas()} className="redrawButton">
       Clear Canvas
      </button>
      </div>
    </div>
  );
}

export default JarvisMarch;
