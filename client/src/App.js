import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [points, setPoints] = useState([]); // Array of points
  const [edges, setEdges] = useState([]);   // Array of edges (0: not included, 1: temporarily changes, 2: included in convex hull)
  const [leftPoint,setLeftPoint] = useState(0);

  // Function to handle mouse click event
  const handleMouseClick = (event, ctx) => {
    // Get mouse position relative to canvas

    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    console.log(rect.left);
    console.log(rect.top);
    console.log(event.clientX);
    console.log(event.clientY)
    console.log(x);
    console.log(y);

    ctx.fillStyle = 'blue';
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

  /**
 * x and y coordinates
*/
class Point {
  constructor(x, y) {
      this.x = x;
      this.y = y;
  }
}

/**
* if edge is not included flag is 0
* if temporary changed flag is 1
* otherwise if included in final hull flag is 2
*/
class Edge {
  constructor(p1, p2, flag) {
      this.p1 = p1;
      this.p2 = p2;
      this.flag = flag;
  }
}

/**
* To find orientation of ordered triplet (p, q, r).
* The function returns following values
* 0 --> p, q and r are collinear
* 1 --> Clockwise
* 2 --> Counterclockwise
*/
function orientation(p, q, r) {
  const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
  if (val === 0) return 0; // collinear
  return (val > 0) ? 1 : 2; // clock or counterclockwise
}

/**
* function to find convex hull for a given set of points
*/
function computeConvexHull(points) {
  const n = points.length;
  // checking base case
  if (n < 2) return [];
  if (n === 2) {
      return [new Edge(points[0], points[1], true)];
  }

  const edges = [];

  // Find the leftmost point
  let l = 0;
  for (let i = 1; i < n; i++) {
      if (points[i].x < points[l].x) {
          l = i;
      }
  }
  setLeftPoint(l);

  // Start from leftmost point, keep moving counterclockwise
  // until reach the start point again. This loop runs O(h)
  // times where h is number of points in result or output.
  let p = l, q;
  do {
      // Search for a point 'q' such that orientation(p, q,
      // x) is counterclockwise for all points 'x'. The idea
      // is to keep track of last visited most counterclock-
      // wise point in q. If any point 'i' is more counterclock-
      // wise than q, then update q.
      q = (p + 1) % n;
      for (let i = 0; i < n; i++) {
          const edge = new Edge(points[p], points[i], 0);
          if (orientation(points[p], points[i], points[q]) === 2) {
              q = i;
              edge.flag = 1;
          }
          edges.push(edge);
      }

      /**
      * As we are including the edge p-q and setting p as q for next iteration
      */
      edges.push(new Edge(points[p], points[q], 2));
      p = q;
  } while (p !== l);

  return edges;
}

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const drawRemainingEdges = (ctx,edges) => {
    console.log(edges);
    for(var edge of edges){
      console.log("weubre");
      ctx.strokeStyle = 'green';
      ctx.beginPath();
      ctx.moveTo(edge.p1.x, edge.p1.y);
      ctx.lineTo(edge.p2.x, edge.p2.y);
      ctx.stroke();
    }
  };

  const drawPoints = (ctx) => {
    ctx.fillStyle = 'blue';
    for (let point of points) {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  
  const drawCanvas = async () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw points
    ctx.fillStyle = 'blue';
    for (let point of points) {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw edges
    console.log(edges);



  var finalTillNow = [];
  // Draw edges one by one with a delay
  for (let i = 0; i < edges.length; i++) {
    const edge = edges[i];

    if (edge.flag === 0) {
      ctx.strokeStyle = 'red';
    } else if (edge.flag === 1) {
      ctx.strokeStyle = 'orange';
    } else {
      ctx.strokeStyle = 'green';
      finalTillNow.push(edge);
    }

    ctx.beginPath();
    ctx.moveTo(edge.p1.x, edge.p1.y);
    ctx.lineTo(edge.p2.x, edge.p2.y);
    ctx.stroke();

    // Add a delay before drawing the next edge
    await sleep(500); // Adjust the delay time as needed

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPoints(ctx);
    drawRemainingEdges(ctx,finalTillNow);
  }
  };

  return (
    <div className="App">
    <canvas id="canvas" width="800" height="600" onClick={(event) => handleMouseClick(event, document.getElementById('canvas').getContext('2d'))}></canvas>
    <button onClick={() => drawCanvas()} className='redrawButton'>Generate Convex Hull</button>
  </div>
  );
}

export default App;
