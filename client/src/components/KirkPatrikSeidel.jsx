import React, { useEffect, useState } from "react";
import "../css/JarvisMarch.css";
import nthSmallestPoints from "../algorithms/MedianOfMediansPoints";
import nthSmallest from "../algorithms/MedianOfMedians";

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

function KirkPatrikSeidel() {
  const [points, setPoints] = useState([]);
  const [edges, setEdges] = useState([]);
  const [height, setHeight] = useState(0);
  const [scaleYState, setScaleYState] = useState(0);
  const [text, setText] = useState(" ");
  var upperBridges = [];
  var lowerBridges = [];

  const createRandomPoints = () => {
    // var canvas = document.getElementById("canvas")
    // var ctx = document.getElementById("canvas").getContext("2d")
    // var pts = 20;
    // const rect = canvas.getBoundingClientRect();
    // var scaleX = canvas.width / rect.width;
    // var scaleY = canvas.height / rect.height;
    // while(pts--) {
    //   var pt_x = Math.random() * canvas.width;
    //   var pt_y = Math.random() * canvas.height;
    //   var x = (pt_x - rect.left) * scaleX;
    //   var y = (rect.height - (pt_y - rect.top)) * scaleY;
    //   if(x>5 && y>5){
    //     var newPoints = [...points,new Point(x,y)];
    //     ctx.fillStyle = "blue";
    //     ctx.beginPath();
    //     ctx.arc(x, rect.height * scaleY - y, 5, 0, Math.PI * 2);
    //     ctx.fill();
    //   }
    // }
    // setPoints(newPoints);
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
    ctx.arc(x, rect.height * scaleY - y, 5, 0, Math.PI * 2);
    ctx.fill();

    // Add point to array
    // console.log(new Point(x, y));
    var newPoints = [...points, new Point(x, y)];
    setPoints(newPoints);
  };

  // Function to draw the points on the canvas
  const drawPoints = (ctx) => {
    ctx.fillStyle = "blue";
    for (let point of points) {
      ctx.beginPath();
      ctx.arc(point.x, height * scaleYState - point.y, 5, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const drawUpperBridges = (ctx) => {
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

  const drawLowerBridges = (ctx) => {
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
  const drawEdges = (ctx) => {
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

  async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const generateConvexHull = async () => {
    const newEdges = await KirkPatrickSeidel(points);
    setEdges(newEdges);
  };

  async function upperBridge(T, a, flag) {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (flag === 1) {
      ctx.fillStyle = "blue";
      for (let point of T) {
        ctx.beginPath();
        ctx.arc(point.x, height * scaleYState + point.y, 5, 0, Math.PI * 2);
        ctx.fill();
      }
      drawLowerBridges(ctx);
      setText("Lower bridge is called");
      await sleep(3000);
    } else {
      ctx.fillStyle = "blue";
      for (let point of T) {
        ctx.beginPath();
        ctx.arc(point.x, height * scaleYState - point.y, 5, 0, Math.PI * 2);
        ctx.fill();
      }
      drawUpperBridges(ctx);
      setText("Upper bridge is called");
      await sleep(3000);
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
    }
    setText("Plotting lines formed by random pairing of points");
    await sleep(3000);

    // clear these lines
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // only draw points which are passed to upper bridge
    ctx.fillStyle = "blue";
    if (flag === 1) {
      for (let point of T) {
        ctx.beginPath();
        ctx.arc(point.x, height * scaleYState + point.y, 5, 0, Math.PI * 2);
        ctx.fill();
      }
      drawLowerBridges(ctx);
    } else {
      for (let point of T) {
        ctx.beginPath();
        ctx.arc(point.x, height * scaleYState - point.y, 5, 0, Math.PI * 2);
        ctx.fill();
      }
      drawUpperBridges(ctx);
    }

    // console.log("slopes = ", slopes);
    if (slopes.length == 0) return upperBridge(candidates, a, flag);

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
      }
    }
    setText("Plotting line through every point with slope as median slope");
    await sleep(3000);

    // clear these lines
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "blue";
    if (flag === 1) {
      for (let point of T) {
        ctx.beginPath();
        ctx.arc(point.x, height * scaleYState + point.y, 5, 0, Math.PI * 2);
        ctx.fill();
      }
      drawLowerBridges(ctx);
    } else {
      for (let point of T) {
        ctx.beginPath();
        ctx.arc(point.x, height * scaleYState - point.y, 5, 0, Math.PI * 2);
        ctx.fill();
      }
      drawUpperBridges(ctx);
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
          ctx.arc(p.pi.x, height * scaleYState + p.pi.y, 5, 0, Math.PI * 2);
          ctx.fill();
          setText("Removing points that can not be part of lower bridge");
        } else {
          ctx.fillStyle = "green";
          ctx.beginPath();
          ctx.arc(p.pi.x, height * scaleYState - p.pi.y, 5, 0, Math.PI * 2);
          ctx.fill();
          setText("Removing points that can not be part of upper bridge");
        }
      }

      for (var p of large) {
        candidates.push(p.pj);
        if (flag === 1) {
          ctx.fillStyle = "green";
          ctx.beginPath();
          ctx.arc(p.pi.x, height * scaleYState + p.pi.y, 5, 0, Math.PI * 2);
          ctx.fill();
          setText("Removing points that can not be part of lower bridge");
        } else {
          ctx.fillStyle = "green";
          ctx.beginPath();
          ctx.arc(p.pi.x, height * scaleYState - p.pi.y, 5, 0, Math.PI * 2);
          ctx.fill();
          setText("Removing points that can not be part of upper bridge");
        }
      }
    } else if (pk.x > a.x) {
      for (var p of small) {
        candidates.push(p.pi);
        if (flag === 1) {
          ctx.fillStyle = "green";
          ctx.beginPath();
          ctx.arc(p.pj.x, height * scaleYState + p.pj.y, 5, 0, Math.PI * 2);
          ctx.fill();
          setText("Removing points that can not be part of lower bridge");
        } else {
          ctx.fillStyle = "green";
          ctx.beginPath();
          ctx.arc(p.pj.x, height * scaleYState - p.pj.y, 5, 0, Math.PI * 2);
          ctx.fill();
          setText("Removing points that can not be part of upper bridge");
        }
      }

      for (var p of equal) {
        candidates.push(p.pi);
        if (flag === 1) {
          ctx.fillStyle = "green";
          ctx.beginPath();
          ctx.arc(p.pj.x, height * scaleYState + p.pj.y, 5, 0, Math.PI * 2);
          ctx.fill();
          setText("Removing points that can not be part of lower bridge");
        } else {
          ctx.fillStyle = "green";
          ctx.beginPath();
          ctx.arc(p.pj.x, height * scaleYState - p.pj.y, 5, 0, Math.PI * 2);
          ctx.fill();
          setText("Removing points that can not be part of upper bridge");
        }
      }

      for (var p of large) {
        candidates.push(p.pi);
        candidates.push(p.pj);
      }
    }
    await sleep(3000);

    return upperBridge(candidates, a, flag);
  }

  async function upperHull(pumin, pumax, T, flag) {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    // only draw points which are passed to upperHull
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (flag === 1) {
      ctx.fillStyle = "blue";
      for (let point of T) {
        ctx.beginPath();
        ctx.arc(point.x, height * scaleYState + point.y, 5, 0, Math.PI * 2);
        ctx.fill();
      }
      setText("Lower hull called");
    } else {
      ctx.fillStyle = "blue";
      for (let point of T) {
        ctx.beginPath();
        ctx.arc(point.x, height * scaleYState - point.y, 5, 0, Math.PI * 2);
        ctx.fill();
      }
      setText("Upper hull called");
    }
    if (flag === 1) {
      drawLowerBridges(ctx);
    } else {
      drawUpperBridges(ctx);
    }

    if (Point.equals(pumin, pumax)) return [pumin];

    var a = nthSmallestPoints(T, Math.floor(T.length / 2));

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
    await sleep(3000);

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
        ctx.arc(point.x, height * scaleYState + point.y, 5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = "red";
      for (let point of T_right_viz) {
        ctx.beginPath();
        ctx.arc(point.x, height * scaleYState + point.y, 5, 0, Math.PI * 2);
        ctx.fill();
      }
      setText(
        "Points which are on left and right side of the median line respectively"
      );
      await sleep(3000);
    } else {
      ctx.fillStyle = "green";
      for (let point of T_left_viz) {
        ctx.beginPath();
        ctx.arc(point.x, height * scaleYState - point.y, 5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = "red";
      for (let point of T_right_viz) {
        ctx.beginPath();
        ctx.arc(point.x, height * scaleYState - point.y, 5, 0, Math.PI * 2);
        ctx.fill();
      }
      setText(
        "Points which are on left and right side of the median line respectively"
      );
      await sleep(3000);
    }

    // now remove this median line from viz
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (flag === 1) {
      ctx.fillStyle = "blue";
      for (let point of T) {
        ctx.beginPath();
        ctx.arc(point.x, height * scaleYState + point.y, 5, 0, Math.PI * 2);
        ctx.fill();
      }
    } else {
      ctx.fillStyle = "blue";
      for (let point of T) {
        ctx.beginPath();
        ctx.arc(point.x, height * scaleYState - point.y, 5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    if (flag === 1) {
      drawLowerBridges(ctx);
    } else {
      drawUpperBridges(ctx);
    }

    // finding upper bridge
    var bridge = await upperBridge(T, a, flag);
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
        ctx.arc(point.x, height * scaleYState + point.y, 5, 0, Math.PI * 2);
        ctx.fill();
      }
    } else {
      ctx.fillStyle = "blue";
      for (let point of T) {
        ctx.beginPath();
        ctx.arc(point.x, height * scaleYState - point.y, 5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    if (flag === 1) {
      drawLowerBridges(ctx);
    } else {
      drawUpperBridges(ctx);
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
    await sleep(3000);

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
    await sleep(3000);

    if (flag === 1) {
      // plotting T_left which goes for recursion
      ctx.fillStyle = "orange";
      for (var point of T_left) {
        ctx.beginPath();
        ctx.arc(point.x, height * scaleYState + point.y, 5, 0, Math.PI * 2);
        ctx.fill();
      }
      setText("Points on which lower hull is called recursively for left side");
      await sleep(3000);
    } else {
      // plotting T_left which goes for recursion
      ctx.fillStyle = "orange";
      for (var point of T_left) {
        ctx.beginPath();
        ctx.arc(point.x, height * scaleYState - point.y, 5, 0, Math.PI * 2);
        ctx.fill();
      }
      setText("Points on which upper hull is called recursively for left side");
      await sleep(3000);
    }

    // plotting T_right which goes for recursion
    if (flag === 1) {
      ctx.fillStyle = "red";
      for (var point of T_right) {
        ctx.beginPath();
        ctx.arc(point.x, height * scaleYState + point.y, 5, 0, Math.PI * 2);
        ctx.fill();
      }
      setText(
        "Points on which lower hull is called recursively for right side"
      );
      await sleep(3000);
      drawLowerBridges(ctx);
    } else {
      ctx.fillStyle = "red";
      for (var point of T_right) {
        ctx.beginPath();
        ctx.arc(point.x, height * scaleYState - point.y, 5, 0, Math.PI * 2);
        ctx.fill();
      }
      setText(
        "Points on which upper hull is called recursively for right side"
      );
      await sleep(3000);
      drawUpperBridges(ctx);
    }

    var leftList = Point.equals(pumin, pl)
      ? [pl]
      : await upperHull(pumin, pl, T_left, flag);

    var rightList = Point.equals(pumax, pr)
      ? [pr]
      : await upperHull(pr, pumax, T_right, flag);

    return [...leftList, ...rightList];
  }

  async function lowerHull(points, flag) {
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

    var UH = await upperHull(pumin, pumax, T, flag);
    var LH = [];
    for (var p of UH) {
      LH.push(new Point(p.x, -1 * p.y));
    }
    return LH;
  }

  async function KirkPatrickSeidel(points) {
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
      ctx.arc(point.x, height * scaleYState - point.y, 5, 0, Math.PI * 2);
      ctx.fill();
    }
    setText("Points with minimum and maximum x-coordinates respectively");
    // sleep to viz pumin and pumax
    await sleep(3000);

    for (var p of points) {
      if (p.x < pumax.x && p.x > pumin.x) {
        T.push(p);
      }
    }

    // marking points T that are passed to upper hull
    ctx.fillStyle = "orange";
    for (let point of T) {
      ctx.beginPath();
      ctx.arc(point.x, height * scaleYState - point.y, 5, 0, Math.PI * 2);
      ctx.fill();
    }
    setText("Points that are passed to upper hull");
    await sleep(3000);

    var UH = await upperHull(pumin, pumax, T, 0);
    drawPoints(ctx);

    var lowerPts = [];
    for (var p of points) {
      lowerPts.push(new Point(p.x, -1 * p.y));
    }

    // marking points T that are passed to lower hull
    ctx.fillStyle = "orange";
    for (let point of points) {
      ctx.beginPath();
      ctx.arc(point.x, height * scaleYState - point.y, 5, 0, Math.PI * 2);
      ctx.fill();
    }
    setText("Points that are passed to lower hull");
    await sleep(3000);

    var LH = await lowerHull(lowerPts, 1);
    LH.reverse();

    UH = [...UH, ...LH];
    var edges = [];
    for (let i = 0; i < UH.length - 1; i++) {
      edges.push([UH[i], UH[i + 1]]);
    }

    setText("Convex Hull completed !!");
    drawPoints(ctx);
    drawUpperBridges(ctx);
    drawLowerBridges(ctx);
    return edges;
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
        <button onClick={generateConvexHull} className="redrawButton">
          Generate Convex Hull
        </button>
        <button onClick={createRandomPoints} className="redrawButton">
          Random Points
        </button>
        <button onClick={clearCanvas} className="redrawButton">
          Clear Canvas
        </button>
      </div>
      <div>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default KirkPatrikSeidel;
