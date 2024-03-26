import React, { useEffect, useState, useRef } from "react";
import "../css/JarvisMarch.css";
import computeConvexHull from "../algorithms/JarvisMarch";

var start = { start: true };
var speed = { speed: 60 };
var stopViz = { stop: false };
var JmDone = { start: true };

function JarvisMarch() {
  const [points, setPoints] = useState([]);
  const [edges, setEdges] = useState([]);
  const [disable, setDisable] = useState(false);
  const [startBtn, setStartBtn] = useState(start.start);
  const [speedUp, setSpeedUp] = useState(false);
  const [slowDown, setSlowDown] = useState(false);

  const createRandomPoints = () => {
    var canvas = document.getElementById("canvas");
    var ctx = document.getElementById("canvas").getContext("2d");
    var pts = 10;
    var ptsArr = [];
    const rect = canvas.getBoundingClientRect();
    var scaleX = canvas.width / rect.width; // relationship bitmap vs. element for x
    var scaleY = canvas.height / rect.height;
    var radius = rect.height / 10;
    console.log(scaleX, scaleY);
    while (pts--) {
      var pt_x = Math.random() * (rect.right - rect.left + 1) + rect.left;
      var pt_y = Math.random() * (rect.bottom - rect.top + 1) + rect.top;

      var x = (pt_x - rect.left) * scaleX;
      var y = (pt_y - rect.top) * scaleY;
      ptsArr = [...ptsArr, { x: x, y: y }];
      ctx.fillStyle = "black";
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
    }
    console.log(ptsArr);
    ptsArr = [...points, ...ptsArr];
    setPoints(ptsArr);
    const newEdges = computeConvexHull(ptsArr);
    setEdges(newEdges);
    return ptsArr;
  };

  // Function to handle mouse click event
  const handleMouseClick = (event, ctx) => {
    // Get mouse position relative to canvas
    const rect = event.target.getBoundingClientRect();
    var scaleX = event.target.width / rect.width; // relationship bitmap vs. element for x
    var scaleY = event.target.height / rect.height;
    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;
    console.log(scaleX, scaleY);
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

  const showSolution = async (JmDone) => {
    var canvas = document.getElementById("canvas");
    var ctx = document.getElementById("canvas").getContext("2d");
    var edges = computeConvexHull(points);
    await stopExec(JmDone);
    console.log("jm done", JmDone);
    drawPoints(ctx);
    var newEdges = [];
    for (var edge of edges) {
      if (edge.flag === 2) {
        newEdges.push(edge);
      }
    }
    drawRemainingEdges(ctx, newEdges);
  };

  const drawRemainingEdges = (ctx, edges) => {
    console.log(edges);
    for (var edge of edges) {
      console.log("weubre");
      ctx.strokeStyle = "green";
      ctx.lineWidth = 1;
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

  const getWaypoints = (edge, obj) => {
    var dx = edge.p2.x - edge.p1.x;
    var dy = edge.p2.y - edge.p1.y;
    var waypts = [];
    for (let i = 1; i <= obj.speed; i++) {
      var x = edge.p1.x + (dx * i) / obj.speed;
      var y = edge.p1.y + (dy * i) / obj.speed;
      waypts.push({ x: x, y: y });
    }
    return waypts;
  };

  const stopExec = async (obj) => {
    while (!obj.start) {
      console.log("exec ", obj.start);
      await sleep(1000);
    }
  };

  const drawCanvas = async (startObj, speedObj, stopViz, JmDone) => {
    if (stopViz.stop) {
      return;
    }
    // setDisable(true);
    console.log(points);
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
      if (stopViz.stop) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }
      const edge = edges[i];
      var oldGreenEdge;
      var greenFlag = false;
      if (edge.flag === 0) {
        ctx.strokeStyle = "red";
      } else if (edge.flag === 1) {
        ctx.strokeStyle = "blue";
      } else {
        ctx.strokeStyle = "green";
        if (finalTillNow.length > 0) {
          oldGreenEdge = finalTillNow[finalTillNow.length - 1];
          greenFlag = true;
        }
        finalTillNow.push(edge);
      }
      var waypts = getWaypoints(edge, speedObj);

      for (let t = 1; t < waypts.length; t++) {
        if (stopViz.stop) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          return;
        }
        ctx.lineWidth = 1;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(waypts[t - 1].x, waypts[t - 1].y);
        ctx.lineTo(waypts[t].x, waypts[t].y);
        ctx.stroke();
        await sleep(5);
        t += 2;
      }

      if (finalTillNow.length > 0) {
        const pq = finalTillNow[finalTillNow.length - 1];
        const qr = edge;
        //if both have atmost one common point
        if (
          !(
            (pq.p1.x === qr.p1.x &&
              pq.p1.y === qr.p1.y &&
              pq.p2.x === qr.p2.x &&
              pq.p2.y === qr.p2.y) ||
            (pq.p1.x === qr.p2.x &&
              pq.p1.y === qr.p2.y &&
              pq.p2.x === qr.p1.x &&
              pq.p2.y === qr.p1.y)
          )
        ) {
          console.log(pq, qr);
          var common_pt;
          var other1, other2;
          if (pq.p1.x === qr.p1.x && pq.p1.y === qr.p1.y) {
            common_pt = pq.p1;
            other1 = pq.p2;
            other2 = qr.p2;
          } else if (pq.p2.x === qr.p2.x && pq.p2.y === qr.p2.y) {
            common_pt = pq.p2;
            other1 = pq.p1;
            other2 = qr.p1;
          } else if (pq.p1.x === qr.p2.x && pq.p1.y === qr.p2.y) {
            common_pt = pq.p1;
            other1 = pq.p2;
            other2 = qr.p1;
          } else if (pq.p2.x === qr.p1.x && pq.p2.y === qr.p1.y) {
            common_pt = pq.p2;
            other1 = pq.p1;
            other2 = qr.p2;
          }

          console.log(common_pt);
          ctx.beginPath();
          var startAngle = Math.atan2(
            other1.y - common_pt.y,
            other1.x - common_pt.x
          );
          var endAngle = Math.atan2(
            other2.y - common_pt.y,
            other2.x - common_pt.x
          );
          ctx.arc(common_pt.x, common_pt.y, 20, startAngle, endAngle, true);
          ctx.lineWidth = 3;
          ctx.strokeStyle = "black";
          ctx.stroke();
        }
      }
      // Add a delay before drawing the next edge
      if (greenFlag) {
        var newGreenEdge = finalTillNow[finalTillNow.length - 1];
        if (
          newGreenEdge.p1.x === oldGreenEdge.p1.x &&
          newGreenEdge.p1.y === oldGreenEdge.p1.y
        ) {
          common_pt = newGreenEdge.p1;
          other1 = newGreenEdge.p2;
          other2 = oldGreenEdge.p2;
        } else if (
          newGreenEdge.p2.x === oldGreenEdge.p2.x &&
          newGreenEdge.p2.y === oldGreenEdge.p2.y
        ) {
          common_pt = newGreenEdge.p2;
          other1 = newGreenEdge.p1;
          other2 = oldGreenEdge.p1;
        } else if (
          newGreenEdge.p1.x === oldGreenEdge.p2.x &&
          newGreenEdge.p1.y === oldGreenEdge.p2.y
        ) {
          common_pt = newGreenEdge.p1;
          other1 = newGreenEdge.p2;
          other2 = oldGreenEdge.p1;
        } else if (
          newGreenEdge.p2.x === oldGreenEdge.p1.x &&
          newGreenEdge.p2.y === oldGreenEdge.p1.y
        ) {
          common_pt = newGreenEdge.p2;
          other1 = newGreenEdge.p1;
          other2 = oldGreenEdge.p2;
        }
        ctx.beginPath();
        var startAngle = Math.atan2(
          other1.y - common_pt.y,
          other1.x - common_pt.x
        );
        var endAngle = Math.atan2(
          other2.y - common_pt.y,
          other2.x - common_pt.x
        );
        ctx.arc(common_pt.x, common_pt.y, 20, startAngle, endAngle, false);
        ctx.lineWidth = 5;
        ctx.strokeStyle = "green";
        ctx.stroke();
      }

      await sleep(500); // Adjust the delay time as needed

      await stopExec(startObj);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (stopViz.stop) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }
      drawPoints(ctx);
      drawRemainingEdges(ctx, finalTillNow);
      console.log(startObj);
    }
  };

  const clearCanvas = () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setPoints([]);
    setEdges([]);
  };

  const generateConvex = async (JmDone, speed, start, stopViz) => {
    speed.speed = 60;
    start.start = true;
    setStartBtn(true);
    setSlowDown(false);
    setSpeedUp(false);
    setDisable(true);
    stopViz.stop = false;
    JmDone.start = false;
    await drawCanvas(start, speed, stopViz);
    setDisable(false);
    JmDone.start = true;
    console.log("generate done");
  };

  const showSolnUtil = (JmDone, stopViz) => {
    stopViz.stop = true;
    showSolution(JmDone);
  };

  function minMaxScaling(value, minValue, maxValue, newMin, newMax) {
    return (
      ((value - minValue) / (maxValue - minValue)) * (newMax - newMin) + newMin
    );
  }

  const fileInputRef = useRef(null);

  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    var canvas = document.getElementById("canvas");
    var ctx = document.getElementById("canvas").getContext("2d");
    const rect = canvas.getBoundingClientRect();

    var scaleX = canvas.width / rect.width; // relationship bitmap vs. element for x
    var scaleY = canvas.height / rect.height;
    var radius = rect.height / 10;

    const file = event.target.files[0];
    const reader = new FileReader();
    var ptsArr = [];

    reader.onload = (e) => {
      const contents = e.target.result;
      const rows = contents.split("\n");
      const data = rows.map((row) => {
        const values = row.split(",");
        const pt_x = values[1]; // Value at index 1 (1)
        const pt_y = values[2]; // Value at index 2 (2)
        ptsArr = [...ptsArr, { x: pt_x, y: pt_y }];
      });

      const minX = Math.min(...ptsArr.map((point) => point.x));
      const maxX = Math.max(...ptsArr.map((point) => point.x));
      const minY = Math.min(...ptsArr.map((point) => point.y));
      const maxY = Math.max(...ptsArr.map((point) => point.y));

      const scaledPtsArr = ptsArr.map((point) => ({
        x:
          (minMaxScaling(point.x, minX-5, maxX+5, 0, 1) *
            (rect.right - rect.left + 1) +
            rect.left -
            rect.left) *
          scaleX,
        y:
          (minMaxScaling(point.y, minY-5, maxY+5, 0, 1) *
            (rect.bottom - rect.top + 1) +
            rect.top -
            rect.top) *
          scaleY,
      }));

      for (var point of scaledPtsArr) {
        console.log(point);
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      setPoints(scaledPtsArr);
      const newEdges = computeConvexHull(scaledPtsArr);
      setEdges(newEdges);
    };

    reader.onerror = (e) => {
      console.error("File reading error:", e.target.error);
    };

    reader.readAsText(file);
  };

  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          width: "100vw",
          paddingLeft: "20px",
          paddingRight: "8px",
        }}
      >
        <h1 className="title">Jarvis March Visualization</h1>
        <div className="custom-file-input-container">
          <input
            type="file"
            id="csvFileInput"
            accept=".csv"
            ref={fileInputRef} // Assign the ref to the file input
            className="custom-file-input"
            onChange={handleFileChange}
          />
          <button
            className="button-30"
            style={{ height: "35px" }}
            onClick={openFileDialog}
          >
            Upload CSV File
          </button>
          <span className="custom-file-input-label">Choose file</span>
        </div>
      </div>
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
        <button
          onClick={() => {
            generateConvex(JmDone, speed, start, stopViz);
          }}
          className="button-30"
          disabled={disable}
        >
          Generate Convex Hull
        </button>
        <button
          onClick={() => clearCanvas()}
          className="button-30"
          disabled={disable}
        >
          Clear Canvas
        </button>
        <button
          onClick={() => createRandomPoints()}
          className="button-30"
          disabled={disable}
        >
          Random Points
        </button>
        <button
          onClick={() => {
            console.log("clk", start);
            start.start = !start.start;
            setStartBtn(!startBtn);
          }}
          className="button-30"
        >
          {startBtn ? "Stop" : "Start"}
        </button>
        <button
          onClick={() => {
            if (speed.speed > 60) {
              setSlowDown(false);
              speed.speed = 60;
            } else if (speed.speed > 20) {
              speed.speed = 20;
              setSpeedUp(true);
            }
          }}
          className="button-30"
          disabled={speedUp}
        >
          Speed Up
        </button>
        <button
          onClick={() => {
            if (speed.speed < 60) {
              setSpeedUp(false);
              speed.speed = 60;
            } else if (speed.speed < 150) {
              setSlowDown(true);
              speed.speed = 150;
            }
          }}
          className="button-30"
          disabled={slowDown}
        >
          Slow Down
        </button>
        <button
          onClick={() => {
            showSolnUtil(JmDone, stopViz);
          }}
          className="button-30"
        >
          Show Solution
        </button>
      </div>
    </div>
  );
}

export default JarvisMarch;