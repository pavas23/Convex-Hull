import React, { useEffect, useState, useRef } from "react";
import "../css/JarvisMarch.css";
import nthSmallestPoints from "../algorithms/MedianOfMediansPoints";
import nthSmallest from "../algorithms/MedianOfMedians";
import KirkPatrickSeidelAlgorithm from "../algorithms/KirkPatrickSeidelAlgo";

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static equals(p, q) {
    return p.x === q.x && p.y === q.y;
  }
}

class Pair {
  constructor(pi, pj) {
    this.pi = pi;
    this.pj = pj;
  }
}
var start = { start: true };
var stopViz = { stop: false };
var speed = { speed: 1500 };
var kpsDone = { start: true };

function KirkPatrikSeidel() {
  const [points, setPoints] = useState([]);
  const [edges, setEdges] = useState([]);
  const [height, setHeight] = useState(0);
  const [scaleYState, setScaleYState] = useState(0);
  const [text, setText] = useState(" ");
  const [startBtn, setStartBtn] = useState(start.start);
  const [disable, setDisable] = useState(false);
  const [stopV, setStopV] = useState(false);
  const [speedUp, setSpeedUp] = useState(false);
  const [slowDown, setSlowDown] = useState(false);
  const [execTime,setExecTime] = useState(0.0);
  var upperBridges = [];
  var lowerBridges = [];

  const createRandomPoints = () => {
    var canvas = document.getElementById("canvas");
    var ctx = document.getElementById("canvas").getContext("2d");
    var pts = 10;
    var ptsArr = [];
    const rect = canvas.getBoundingClientRect();
    var scaleX = canvas.width / rect.width; // relationship bitmap vs. element for x
    var scaleY = canvas.height / rect.height;
    console.log(scaleX, scaleY);
    setHeight(rect.height);
    setScaleYState(scaleY);
    while (pts--) {
      var pt_x = Math.random() * (rect.right - rect.left + 1) + rect.left;
      var pt_y = Math.random() * (rect.bottom - rect.top + 1) + rect.top;

      var x = (pt_x - rect.left) * scaleX;
      var y = (rect.height - (pt_y - rect.top)) * scaleY;
      ptsArr = [...ptsArr, new Point(x, y)];
      ctx.fillStyle = "blue";
      ctx.beginPath();
      ctx.arc(x, rect.height * scaleY - y, 3, 0, Math.PI * 2);
      ctx.fill();
    }
    console.log(ptsArr);
    ptsArr = [...points, ...ptsArr];
    setPoints(ptsArr);
    return ptsArr;
  };

  const drawEdgesSolution = (ctx, edges) => {
    for (let edge of edges) {
      ctx.strokeStyle = "green";
      ctx.lineWidth = 1;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(edge[0].x, height * scaleYState - edge[0].y);
      ctx.lineTo(edge[1].x, height * scaleYState - edge[1].y);
      ctx.stroke();
    }
  };

  const drawPointsSolution = (ctx) => {
    ctx.fillStyle = "blue";
    for (let point of points) {
      ctx.beginPath();
      ctx.arc(point.x, height * scaleYState - point.y, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const findExecutionTime = () => {
    const start = performance.now();
    const edges = KirkPatrickSeidelAlgorithm(points);
    const end = performance.now();
    const executionTime = end - start;
    if(executionTime !== null && !isNaN(executionTime)) setExecTime(parseFloat(executionTime));
  }

  const findSolution = async () => {
    stopViz.stop = true;
    setStopV(true);

    const start = performance.now();
    const edges = KirkPatrickSeidelAlgorithm(points);
    const end = performance.now();
    const executionTime = end - start;
    if(executionTime !== null && !isNaN(executionTime)) setExecTime(parseFloat(executionTime));

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    await stopExec(kpsDone);
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw points
    drawPointsSolution(ctx);
    drawEdgesSolution(ctx, edges);
  };

  // Function to handle mouse click event
  const handleMouseClick = (event, ctx) => {
    // Get mouse position relative to canvas
    const rect = event.target.getBoundingClientRect();
    var scaleX = event.target.width / rect.width;
    var scaleY = event.target.height / rect.height;
    const x = (event.clientX - rect.left) * scaleX;
    const y = (rect.height - (event.clientY - rect.top)) * scaleY;
    setHeight(rect.height);
    setScaleYState(scaleY);

    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(x, rect.height * scaleY - y, 3, 0, Math.PI * 2);
    ctx.fill();

    // Add point to array
    // console.log(new Point(x, y));
    var newPoints = [...points, new Point(x, y)];
    setPoints(newPoints);
  };

  // Function to draw the points on the canvas
  const drawPoints = (ctx, stopViz) => {
    if (stopViz.stop) {
      return;
    }
    ctx.fillStyle = "blue";
    for (let point of points) {
      ctx.beginPath();
      ctx.arc(point.x, height * scaleYState - point.y, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const drawUpperBridges = (ctx, stopViz) => {
    if (stopViz.stop) {
      return;
    }
    for (let edge of upperBridges) {
      ctx.strokeStyle = "purple";
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(edge[0].x, height * scaleYState - edge[0].y);
      ctx.lineTo(edge[1].x, height * scaleYState - edge[1].y);
      ctx.stroke();
    }
  };

  const drawLowerBridges = (ctx, stopViz) => {
    if (stopViz.stop) {
      return;
    }
    for (let edge of lowerBridges) {
      ctx.strokeStyle = "purple";
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(edge[0].x, height * scaleYState + edge[0].y);
      ctx.lineTo(edge[1].x, height * scaleYState + edge[1].y);
      ctx.stroke();
    }
  };

  // Function to draw the edges on the canvas
  const drawEdges = (ctx, stopViz) => {
    if (stopViz.stop) {
      return;
    }
    console.log("ewfew");
    console.log(edges);
    for (let edge of edges) {
      ctx.strokeStyle = "green";
      ctx.lineWidth = 1;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(edge[0].x, height * scaleYState - edge[0].y);
      ctx.lineTo(edge[1].x, height * scaleYState - edge[1].y);
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
    drawPoints(ctx, stopViz);
    // Draw edges
    drawEdges(ctx, stopViz);
  };

  // Function to clear the canvas and reset points
  const clearCanvas = () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setPoints([]);
    setEdges([]);
  };

  async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const stopExec = async (obj) => {
    while (!obj.start) {
      await sleep(1000);
    }
  };

  const generateConvexHull = async () => {
    kpsDone.start = false;
    stopViz.stop = false;
    setStopV(false);
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    start.start = true;
    setStartBtn(true);
    setDisable(true);
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw points
    drawPoints(ctx, stopViz);
    const newEdges = await KirkPatrickSeidel(points, start, kpsDone);
    findExecutionTime();
    setDisable(false);
    setEdges(newEdges);
  };

  async function upperBridge(T, a, flag, stopObj, stopViz, speed) {
    if (stopViz.stop) {
      return [];
    }
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (flag === 1) {
      ctx.fillStyle = "blue";
      for (let point of T) {
        ctx.beginPath();
        ctx.arc(point.x, height * scaleYState + point.y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
      await stopExec(stopObj);
      drawLowerBridges(ctx, stopViz);
      setText("Lower bridge is called");
      await sleep(speed.speed);
      await stopExec(stopObj);
    } else {
      ctx.fillStyle = "blue";
      for (let point of T) {
        ctx.beginPath();
        ctx.arc(point.x, height * scaleYState - point.y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
      await stopExec(stopObj);
      drawUpperBridges(ctx, stopViz);
      setText("Upper bridge is called");
      await sleep(speed.speed);
      await stopExec(stopObj);
    }

    var candidates = [];

    // base case when less than 3 points are there
    if (T.length == 1) return T;
    if (T.length == 2) {
      T.sort((a, b) => a.x - b.x);
      return T;
    }

    var pairs = [];
    if (T.length % 2 == 0) {
      for (let i = 0; i < T.length - 1; i += 2) {
        var edge = [T[i], T[i + 1]];
        edge.sort((a, b) => a.x - b.x);
        pairs.push(new Pair(edge[0], edge[1]));
      }
    } else {
      candidates.push(T[0]);
      for (let i = 1; i < T.length - 1; i += 2) {
        var edge = [T[i], T[i + 1]];
        edge.sort((a, b) => a.x - b.x);
        pairs.push(new Pair(edge[0], edge[1]));
      }
    }

    // console.log("pairs = ", pairs);
    var slopes = [];
    for (var p of pairs) {
      if (p.pi.x === p.pj.x) {
        if (p.pi.y > p.pj.y) candidates.push(p.pi);
        else candidates.push(p.pj);
      } else {
        slopes.push((p.pi.y - p.pj.y) / (p.pi.x - p.pj.x));
        if (flag === 1) {
          ctx.strokeStyle = "pink";
          ctx.lineWidth = 2;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(p.pi.x, height * scaleYState + p.pi.y);
          ctx.lineTo(p.pj.x, height * scaleYState + p.pj.y);
          ctx.stroke();
        } else {
          ctx.strokeStyle = "pink";
          ctx.lineWidth = 2;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(p.pi.x, height * scaleYState - p.pi.y);
          ctx.lineTo(p.pj.x, height * scaleYState - p.pj.y);
          ctx.stroke();
        }
      }
      await stopExec(stopObj);
    }
    setText("Plotting lines formed by random pairing of points");
    await sleep(speed.speed);
    await stopExec(stopObj);

    // clear these lines
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // only draw points which are passed to upper bridge
    ctx.fillStyle = "blue";
    if (flag === 1) {
      for (let point of T) {
        ctx.beginPath();
        ctx.arc(point.x, height * scaleYState + point.y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
      await stopExec(stopObj);
      drawLowerBridges(ctx, stopViz);
    } else {
      for (let point of T) {
        ctx.beginPath();
        ctx.arc(point.x, height * scaleYState - point.y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
      await stopExec(stopObj);
      drawUpperBridges(ctx, stopViz);
    }

    // console.log("slopes = ", slopes);
    if (slopes.length == 0)
      return upperBridge(candidates, a, flag, stopViz, speed);

    var median_slope = 0;
    if (slopes.length % 2 == 0) {
      median_slope =
        (nthSmallest(slopes, slopes.length / 2) +
          nthSmallest(slopes, slopes.length / 2 + 1)) /
        2;
    } else {
      median_slope = nthSmallest(slopes, Math.ceil(slopes.length / 2));
    }

    // now plotting the line with median slope
    if (flag === 1) {
      for (var point of T) {
        ctx.strokeStyle = "orange";
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(point.x, height * scaleYState + point.y);
        ctx.lineTo(
          0,
          height * scaleYState + (point.y - point.x * median_slope)
        );
        ctx.stroke();
        await stopExec(stopObj);
      }
    } else {
      for (var point of T) {
        ctx.strokeStyle = "orange";
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(point.x, height * scaleYState - point.y);
        ctx.lineTo(
          0,
          height * scaleYState - (point.y - point.x * median_slope)
        );
        ctx.stroke();
        await stopExec(stopObj);
      }
    }
    setText("Plotting line through every point with slope as median slope");
    await sleep(speed.speed);
    await stopExec(stopObj);

    // clear these lines
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "blue";
    if (flag === 1) {
      for (let point of T) {
        ctx.beginPath();
        ctx.arc(point.x, height * scaleYState + point.y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
      await stopExec(stopObj);
      drawLowerBridges(ctx, stopViz);
    } else {
      for (let point of T) {
        ctx.beginPath();
        ctx.arc(point.x, height * scaleYState - point.y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
      await stopExec(stopObj);
      drawUpperBridges(ctx, stopViz);
    }

    // dividing the pairs into 3 sets
    var small = [];
    var equal = [];
    var large = [];

    for (var p of pairs) {
      if (p.pi.x === p.pj.x) continue;
      var s = (p.pi.y - p.pj.y) / (p.pi.x - p.pj.x);
      if (s < median_slope) small.push(p);
      else if (s === median_slope) equal.push(p);
      else large.push(p);
    }

    var max_intercept = Number.MIN_SAFE_INTEGER;
    for (var p of T) {
      var intercept = p.y - median_slope * p.x;
      if (intercept > max_intercept) {
        max_intercept = intercept;
      }
    }

    var EPSILON = 1e-9;
    var max_set = [];
    for (var p of T) {
      var intercept = p.y - median_slope * p.x;
      if (max_intercept - intercept <= EPSILON) {
        max_set.push(p);
      }
    }

    var pk = new Point(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
    var pm = new Point(Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);
    for (var p of max_set) {
      if (p.x < pk.x) pk = p;
      if (p.x > pm.x) pm = p;
    }

    if (pk.x <= a.x && pm.x > a.x) return [pk, pm];
    else if (pm.x <= a.x) {
      for (var p of small) {
        candidates.push(p.pi);
        candidates.push(p.pj);
      }

      for (var p of equal) {
        candidates.push(p.pj);
        if (flag === 1) {
          ctx.fillStyle = "green";
          ctx.beginPath();
          ctx.arc(p.pi.x, height * scaleYState + p.pi.y, 3, 0, Math.PI * 2);
          ctx.fill();
          setText("Removing points that can not be part of lower bridge");
        } else {
          ctx.fillStyle = "green";
          ctx.beginPath();
          ctx.arc(p.pi.x, height * scaleYState - p.pi.y, 3, 0, Math.PI * 2);
          ctx.fill();
          setText("Removing points that can not be part of upper bridge");
        }
        await stopExec(stopObj);
      }

      for (var p of large) {
        candidates.push(p.pj);
        if (flag === 1) {
          ctx.fillStyle = "green";
          ctx.beginPath();
          ctx.arc(p.pi.x, height * scaleYState + p.pi.y, 3, 0, Math.PI * 2);
          ctx.fill();
          setText("Removing points that can not be part of lower bridge");
        } else {
          ctx.fillStyle = "green";
          ctx.beginPath();
          ctx.arc(p.pi.x, height * scaleYState - p.pi.y, 3, 0, Math.PI * 2);
          ctx.fill();
          setText("Removing points that can not be part of upper bridge");
        }
        await stopExec(stopObj);
      }
    } else if (pk.x > a.x) {
      for (var p of small) {
        candidates.push(p.pi);
        if (flag === 1) {
          ctx.fillStyle = "green";
          ctx.beginPath();
          ctx.arc(p.pj.x, height * scaleYState + p.pj.y, 3, 0, Math.PI * 2);
          ctx.fill();
          setText("Removing points that can not be part of lower bridge");
        } else {
          ctx.fillStyle = "green";
          ctx.beginPath();
          ctx.arc(p.pj.x, height * scaleYState - p.pj.y, 3, 0, Math.PI * 2);
          ctx.fill();
          setText("Removing points that can not be part of upper bridge");
        }
        await stopExec(stopObj);
      }

      for (var p of equal) {
        candidates.push(p.pi);
        if (flag === 1) {
          ctx.fillStyle = "green";
          ctx.beginPath();
          ctx.arc(p.pj.x, height * scaleYState + p.pj.y, 3, 0, Math.PI * 2);
          ctx.fill();
          setText("Removing points that can not be part of lower bridge");
        } else {
          ctx.fillStyle = "green";
          ctx.beginPath();
          ctx.arc(p.pj.x, height * scaleYState - p.pj.y, 3, 0, Math.PI * 2);
          ctx.fill();
          setText("Removing points that can not be part of upper bridge");
        }
        await stopExec(stopObj);
      }

      for (var p of large) {
        candidates.push(p.pi);
        candidates.push(p.pj);
      }
    }
    await sleep(speed.speed);

    var temp = upperBridge(candidates, a, flag, stopObj, stopViz, speed);
    if (stopViz.stop) {
      return [];
    }
    return temp;
  }

  async function upperHull(pumin, pumax, T, flag, stopObj, stopViz, speed) {
    if (stopViz.stop) {
      return [];
    }
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    // only draw points which are passed to upperHull
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (flag === 1) {
      ctx.fillStyle = "blue";
      for (let point of T) {
        ctx.beginPath();
        ctx.arc(point.x, height * scaleYState + point.y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
      setText("Lower hull called");
      await stopExec(stopObj);
    } else {
      ctx.fillStyle = "blue";
      for (let point of T) {
        ctx.beginPath();
        ctx.arc(point.x, height * scaleYState - point.y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
      setText("Upper hull called");
      await stopExec(stopObj);
    }
    if (flag === 1) {
      drawLowerBridges(ctx, stopViz);
    } else {
      drawUpperBridges(ctx, stopViz);
    }

    if (Point.equals(pumin, pumax)) return [pumin];

    var a = nthSmallestPoints(T, Math.ceil(T.length / 2));

    // plotting median line
    ctx.strokeStyle = "green";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    if (flag === 1) {
      ctx.beginPath();
      ctx.moveTo(a.x, height * scaleYState + a.y);
      ctx.lineTo(a.x, height * scaleYState);
      ctx.moveTo(a.x, height * scaleYState + a.y);
      ctx.lineTo(a.x, 0);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.moveTo(a.x, height * scaleYState - a.y);
      ctx.lineTo(a.x, height * scaleYState);
      ctx.moveTo(a.x, height * scaleYState - a.y);
      ctx.lineTo(a.x, 0);
      ctx.stroke();
    }
    setText("Line passing through the median point");
    await sleep(speed.speed);
    await stopExec(stopObj);

    var T_left_viz = [];
    var T_right_viz = [];

    // dividing points into left and right half
    for (var point of T) {
      if (point.x <= a.x) T_left_viz.push(point);
      else T_right_viz.push(point);
    }

    // plotting T_left and T_right wrt median line
    if (flag === 1) {
      ctx.fillStyle = "green";
      for (let point of T_left_viz) {
        ctx.beginPath();
        ctx.arc(point.x, height * scaleYState + point.y, 3, 0, Math.PI * 2);
        ctx.fill();
        await stopExec(stopObj);
      }
      ctx.fillStyle = "red";
      for (let point of T_right_viz) {
        ctx.beginPath();
        ctx.arc(point.x, height * scaleYState + point.y, 3, 0, Math.PI * 2);
        ctx.fill();
        await stopExec(stopObj);
      }
      setText(
        "Points which are on left and right side of the median line respectively"
      );
      await sleep(speed.speed);
      await stopExec(stopObj);
    } else {
      ctx.fillStyle = "green";
      for (let point of T_left_viz) {
        ctx.beginPath();
        ctx.arc(point.x, height * scaleYState - point.y, 3, 0, Math.PI * 2);
        ctx.fill();
        await stopExec(stopObj);
      }
      ctx.fillStyle = "red";
      for (let point of T_right_viz) {
        ctx.beginPath();
        ctx.arc(point.x, height * scaleYState - point.y, 3, 0, Math.PI * 2);
        ctx.fill();
        await stopExec(stopObj);
      }
      setText(
        "Points which are on left and right side of the median line respectively"
      );
      await sleep(speed.speed);
      await stopExec(stopObj);
    }

    // now remove this median line from viz
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (flag === 1) {
      ctx.fillStyle = "blue";
      for (let point of T) {
        ctx.beginPath();
        ctx.arc(point.x, height * scaleYState + point.y, 3, 0, Math.PI * 2);
        ctx.fill();
        await stopExec(stopObj);
      }
    } else {
      ctx.fillStyle = "blue";
      for (let point of T) {
        ctx.beginPath();
        ctx.arc(point.x, height * scaleYState - point.y, 3, 0, Math.PI * 2);
        ctx.fill();
        await stopExec(stopObj);
      }
    }
    if (flag === 1) {
      await stopExec(stopObj);
      drawLowerBridges(ctx, stopViz);
    } else {
      await stopExec(stopObj);
      drawUpperBridges(ctx, stopViz);
    }

    // finding upper bridge
    var bridge = await upperBridge(T, a, flag, stopObj, stopViz, speed);
    if (stopViz.stop) {
      return [];
    }
    if (flag === 1) {
      lowerBridges.push(bridge);
    } else {
      upperBridges.push(bridge);
    }

    // now remove this median line from viz
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (flag === 1) {
      ctx.fillStyle = "blue";
      for (let point of T) {
        ctx.beginPath();
        ctx.arc(point.x, height * scaleYState + point.y, 3, 0, Math.PI * 2);
        ctx.fill();
        await stopExec(stopObj);
      }
    } else {
      ctx.fillStyle = "blue";
      for (let point of T) {
        ctx.beginPath();
        ctx.arc(point.x, height * scaleYState - point.y, 3, 0, Math.PI * 2);
        ctx.fill();
        await stopExec(stopObj);
      }
    }
    if (flag === 1) {
      await stopExec(stopObj);
      drawLowerBridges(ctx, stopViz);
    } else {
      await stopExec(stopObj);
      drawUpperBridges(ctx, stopViz);
    }

    if (bridge.length == 1) return [pumin, pumax]; //unecessary but there for security
    var pl = bridge[0];
    var pr = bridge[1];
    if (pl.x > pr.x) {
      var temp = pl;
      pl = pr;
      pr = temp;
    } else if (pl.x === pr.x && pl.y > pr.y) {
      var temp = pl;
      pl = pr;
      pr = temp;
    }

    // plotting upper bridge line returned by upper bridge function
    ctx.strokeStyle = "purple";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    if (flag === 1) {
      ctx.beginPath();
      ctx.moveTo(pl.x, height * scaleYState + pl.y);
      ctx.lineTo(pr.x, height * scaleYState + pr.y);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.moveTo(pl.x, height * scaleYState - pl.y);
      ctx.lineTo(pr.x, height * scaleYState - pr.y);
      ctx.stroke();
    }
    if (flag === 1) {
      setText("Lower Bridge Line");
    } else {
      setText("Upper Bridge line");
    }
    await sleep(speed.speed);
    await stopExec(stopObj);

    var T_left = [pl, pumin];
    var T_right = [pr, pumax];

    var ref_pt = new Point(
      Math.floor((pl.x + pumin.x) / 2),
      Math.max(pl.y, pumin.y) + 1
    );

    var ref_dist =
      (ref_pt.y - pl.y) * (pumin.x - pl.x) -
      (ref_pt.x - pl.x) * (pumin.y - pl.y);
    for (var p of T) {
      var dist =
        (p.y - pl.y) * (pumin.x - pl.x) - (p.x - pl.x) * (pumin.y - pl.y);
      if (dist * ref_dist > 0) {
        T_left.push(p);
      }
    }

    ref_pt = new Point(
      Math.floor((pr.x + pumax.x) / 2),
      Math.max(pr.y, pumax.y) + 1
    );

    ref_dist =
      (ref_pt.y - pr.y) * (pumax.x - pr.x) -
      (ref_pt.x - pr.x) * (pumax.y - pr.y);

    for (var p of T) {
      var dist =
        (p.y - pr.y) * (pumax.x - pr.x) - (p.x - pr.x) * (pumax.y - pr.y);
      if (dist * ref_dist > 0) {
        T_right.push(p);
      }
    }

    // plotting line passing through pmin and pl and line passing through pmax and pr
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    if (flag === 1) {
      ctx.beginPath();
      ctx.moveTo(pl.x, height * scaleYState + pl.y);
      ctx.lineTo(pumin.x, height * scaleYState + pumin.y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(pr.x, height * scaleYState + pr.y);
      ctx.lineTo(pumax.x, height * scaleYState + pumax.y);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.moveTo(pl.x, height * scaleYState - pl.y);
      ctx.lineTo(pumin.x, height * scaleYState - pumin.y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(pr.x, height * scaleYState - pr.y);
      ctx.lineTo(pumax.x, height * scaleYState - pumax.y);
      ctx.stroke();
    }
    if (pl != pumin && pr != pumax)
      setText("Lines passing through (pumin and pl) and (pumax and pr)");
    await sleep(speed.speed);
    await stopExec(stopObj);

    if (flag === 1) {
      // plotting T_left which goes for recursion
      ctx.fillStyle = "orange";
      for (var point of T_left) {
        ctx.beginPath();
        ctx.arc(point.x, height * scaleYState + point.y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
      setText("Points on which lower hull is called recursively for left side");
      await sleep(speed.speed);
      await stopExec(stopObj);
    } else {
      // plotting T_left which goes for recursion
      ctx.fillStyle = "orange";
      for (var point of T_left) {
        ctx.beginPath();
        ctx.arc(point.x, height * scaleYState - point.y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
      setText("Points on which upper hull is called recursively for left side");
      await sleep(speed.speed);
      await stopExec(stopObj);
    }

    // plotting T_right which goes for recursion
    if (flag === 1) {
      ctx.fillStyle = "red";
      for (var point of T_right) {
        ctx.beginPath();
        ctx.arc(point.x, height * scaleYState + point.y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
      setText(
        "Points on which lower hull is called recursively for right side"
      );
      await sleep(speed.speed);
      await stopExec(stopObj);
      drawLowerBridges(ctx, stopViz);
    } else {
      ctx.fillStyle = "red";
      for (var point of T_right) {
        ctx.beginPath();
        ctx.arc(point.x, height * scaleYState - point.y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
      setText(
        "Points on which upper hull is called recursively for right side"
      );
      await sleep(speed.speed);
      await stopExec(stopObj);
      drawUpperBridges(ctx, stopViz);
    }

    var leftList = Point.equals(pumin, pl)
      ? [pl]
      : await upperHull(pumin, pl, T_left, flag, stopObj, stopViz, speed);

    if (stopViz.stop) {
      return [];
    }
    var rightList = Point.equals(pumax, pr)
      ? [pr]
      : await upperHull(pr, pumax, T_right, flag, stopObj, stopViz, speed);

    if (stopViz.stop) {
      return [];
    }

    return [...leftList, ...rightList];
  }

  async function lowerHull(points, flag, stopObj, stopViz, speed) {
    if (stopViz.stop) {
      return [];
    }
    var pumin = new Point(Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);
    var pumax = new Point(Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);

    for (var p of points) {
      if (p.x < pumin.x) {
        pumin = p;
      } else if (p.x === pumin.x && p.y > pumin.y) {
        pumin = p;
      }
      if (p.x > pumax.x) {
        pumax = p;
      } else if (p.x === pumax.x && p.y > pumax.y) {
        pumax = p;
      }
    }

    var T = [pumin, pumax];
    for (var p of points) {
      if (p.x < pumax.x && p.x > pumin.x) {
        T.push(p);
      }
    }

    var UH = await upperHull(pumin, pumax, T, flag, stopObj, stopViz, speed);
    var LH = [];
    if (stopViz.stop) {
      return [];
    }
    for (var p of UH) {
      LH.push(new Point(p.x, -1 * p.y));
    }
    return LH;
  }

  async function KirkPatrickSeidel(points, stopObj, kpsDone) {
    if (stopViz.stop) {
      return [];
    }

    if (points.length === 0) {
      setText("No points selected !!");
      return [];
    }

    var pumin = new Point(Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);
    var pumax = new Point(Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);

    for (var p of points) {
      if (p.x < pumin.x) {
        pumin = p;
      } else if (p.x === pumin.x && p.y > pumin.y) {
        pumin = p;
      }
      if (p.x > pumax.x) {
        pumax = p;
      } else if (p.x === pumax.x && p.y > pumax.y) {
        pumax = p;
      }
    }

    var T = [pumin, pumax];

    // marking pumin and pumax for viz
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "red";
    for (let point of T) {
      ctx.beginPath();
      ctx.arc(point.x, height * scaleYState - point.y, 3, 0, Math.PI * 2);
      ctx.fill();
    }
    setText("Points with minimum and maximum x-coordinates respectively");
    // sleep to viz pumin and pumax
    await sleep(speed.speed);
    await stopExec(stopObj);

    for (var p of points) {
      if (p.x < pumax.x && p.x > pumin.x) {
        T.push(p);
      }
    }

    // marking points T that are passed to upper hull
    ctx.fillStyle = "orange";
    for (let point of T) {
      ctx.beginPath();
      ctx.arc(point.x, height * scaleYState - point.y, 3, 0, Math.PI * 2);
      ctx.fill();
    }
    setText("Points that are passed to upper hull");
    await sleep(speed.speed);
    await stopExec(stopObj);

    var UH = await upperHull(pumin, pumax, T, 0, stopObj, stopViz, speed);
    drawPoints(ctx, stopViz);

    var lowerPts = [];
    for (var p of points) {
      lowerPts.push(new Point(p.x, -1 * p.y));
    }

    // marking points T that are passed to lower hull
    ctx.fillStyle = "orange";
    for (let point of points) {
      ctx.beginPath();
      ctx.arc(point.x, height * scaleYState - point.y, 3, 0, Math.PI * 2);
      ctx.fill();
      await stopExec(stopObj);
    }
    setText("Points that are passed to lower hull");
    await sleep(speed.speed);
    await stopExec(stopObj);

    var LH = await lowerHull(lowerPts, 1, stopObj, stopViz, speed);
    LH.reverse();

    UH = [...UH, ...LH];
    var edges = [];
    for (let i = 0; i < UH.length - 1; i++) {
      edges.push([UH[i], UH[i + 1]]);
    }

    setText("Convex Hull completed !!");
    await stopExec(stopObj);
    drawPoints(ctx, stopViz);
    drawUpperBridges(ctx, stopViz);
    drawLowerBridges(ctx, stopViz);
    kpsDone.start = true;
    return edges;
  }

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

    setHeight(rect.height);
    setScaleYState(scaleY);

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
          minMaxScaling(point.x, minX - 5, maxX + 5, 0, 1) *
          (rect.right - rect.left + 1) *
          scaleX,
        y:
          (rect.height -
            minMaxScaling(point.y, minY - 5, maxY + 5, 0, 1) *
              (rect.bottom - rect.top + 1)) *
          scaleY,
      }));

      const scaledNewPts = [];
      for (var point of scaledPtsArr) {
        scaledNewPts.push(new Point(point.x, point.y));
        console.log(point);
        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.arc(point.x, rect.height * scaleY - point.y, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      console.log("scaled points are", scaledNewPts);
      setPoints(scaledNewPts);
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
        <h1 className="title">KPS Visualization</h1>
        <h5>Execution Time : {execTime} ms</h5>
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
          onClick={generateConvexHull}
          className="button-30"
          disabled={disable}
        >
          Generate Convex Hull
        </button>
        <button onClick={clearCanvas} className="button-30" disabled={disable}>
          Clear Canvas
        </button>
        <button
          onClick={createRandomPoints}
          className="button-30"
          disabled={disable}
        >
          Random Points
        </button>
        <button onClick={findSolution} className="button-30">
          Show Solution
        </button>
        <button
          onClick={() => {
            if (speed.speed > 1500) {
              setSlowDown(false);
              speed.speed = 1500;
            } else if (speed.speed > 500) {
              speed.speed = 500;
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
            if (speed.speed < 1500) {
              setSpeedUp(false);
              speed.speed = 1500;
            } else if (speed.speed < 3000) {
              setSlowDown(true);
              speed.speed = 3000;
            }
          }}
          className="button-30"
          disabled={slowDown}
        >
          Slow Down
        </button>
        <button
          onClick={() => {
            start.start = !start.start;
            setStartBtn(!startBtn);
          }}
          className="button-30"
          disabled={stopV}
        >
          {startBtn ? "Pause" : "Play"}
        </button>
      </div>
      <div>
        <p
          style={{
            fontFamily: "Times New Roman",
            fontWeight: "bold",
            fontSize: "22px",
          }}
        >
          {text}
        </p>
      </div>
    </div>
  );
}

export default KirkPatrikSeidel;
