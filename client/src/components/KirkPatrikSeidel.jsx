import React, { useEffect, useState } from "react";
import "../css/JarvisMarch.css";
import KPS from "../algorithms/KirkPatrikSeidel";

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

function KirkPatrikSeidel() {
  const [points, setPoints] = useState([]);
  const [edges, setEdges] = useState([]);

  // Function to handle mouse click event
  const handleMouseClick = (event, ctx) => {
    // Get mouse position relative to canvas
    const rect = event.target.getBoundingClientRect();
    var scaleX = event.target.width / rect.width; // relationship bitmap vs. element for x
    var scaleY = event.target.height / rect.height;
    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fill();

    // Add point to array
    var newPoints = [...points, new Point(x, y)];
    setPoints(newPoints);
  };

  // Function to draw the points on the canvas
  const drawPoints = (ctx) => {
    ctx.fillStyle = "black";
    for (let point of points) {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  // Function to draw the edges on the canvas
  const drawEdges = (ctx) => {
    ctx.strokeStyle = "green";
    ctx.lineWidth = 1;
    ctx.lineCap = "round";
    for (let edge of edges) {
      ctx.beginPath();
      ctx.moveTo(edge[0].x, edge[0].y);
      ctx.lineTo(edge[1].x, edge[1].y);
      ctx.stroke();
    }
  };

  // Function to draw the canvas
  const drawCanvas = () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw points
    drawPoints(ctx);

    // Draw edges
    drawEdges(ctx);
  };

  // Function to clear the canvas and reset points
  const clearCanvas = () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setPoints([]);
    setEdges([]);
  };

  // Function to run KPS algorithm and update edges
  const generateConvexHull = () => {
    const newEdges = KPS(points);
    setEdges(newEdges);
    drawCanvas();
  };

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
        <button onClick={generateConvexHull} className="redrawButton">
          Generate Convex Hull
        </button>
        <button onClick={clearCanvas} className="redrawButton">
          Clear Canvas
        </button>
      </div>
    </div>
  );
}

export default KirkPatrikSeidel;
