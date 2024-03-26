import React, { useEffect, useState } from "react";
import "../css/JarvisMarch.css";
// import {KPS} from "../algorithms/KirkPatrickSeidel.ts";

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static equals(p,q){
    return (p.x===q.x && p.y===q.y)
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
  const [height,setHeight] = useState(0);
  const [scaleYState,setScaleYState] = useState(0);

  // Function to handle mouse click event
  const handleMouseClick = (event, ctx) => {
    // Get mouse position relative to canvas
    const rect = event.target.getBoundingClientRect();
    var scaleX = event.target.width / rect.width; // relationship bitmap vs. element for x
    var scaleY = event.target.height / rect.height;
    const x = (event.clientX - rect.left) * scaleX;
    const y = (rect.height - (event.clientY - rect.top)) * scaleY;
    setHeight(rect.height);
    setScaleYState(scaleY);

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(x, rect.height*scaleY - y, 3, 0, Math.PI * 2);
    ctx.fill();

    // Add point to array
    console.log( new Point(x, y));
    var newPoints = [...points, new Point(x, y)];
    setPoints(newPoints);
  };


  // Function to draw the points on the canvas
  const drawPoints = (ctx) => {
    ctx.fillStyle = "black";
    for (let point of points) {
      ctx.beginPath();
      ctx.arc(point.x, height*scaleYState-point.y, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  // Function to draw the edges on the canvas
  const drawEdges = (ctx) => {
    for (let edge of edges) {
      ctx.strokeStyle = "green";
      ctx.lineWidth = 1;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(edge[0].x,height*scaleYState - edge[0].y);
      ctx.lineTo(edge[1].x,height*scaleYState - edge[1].y);
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
//   var temp = [202.6666667	,187.2083333]
// [296,	124.5416667]
// [205.3333333,	183.2083333]
// [208.8888889	,173.875]
// [213.3333333,	171.2083333]
// [230.2222222,	155.2083333]
// [234.6666667,	152.5416667]
// [243.5555556,	151.2083333]
// [248.8888889	,151.2083333]
// [263.1111111,	141.875]
// [264,	132.5416667]
// [264.8888889	,131.2083333]
// [270.2222222,	131.2083333]
// [293.3333333,	105.875]
// [313.7777778,	113.875]
// [322.6666667,	108.5416667]
// [328.8888889,	117.875]
// [340.4444444,	123.2083333]
// [360	,136.5416667]
// [360,144.5416667]
// [357.3333333,	219.2083333]
// [335.1111111	,219.2083333]
// [331.5555556,	220.5416667]
// [308.4444444	,237.875]
// [307.5555556	,239.2083333]
// [298.6666667	,239.2083333]
// [275.5555556	,239.2083333]
// [270.2222222	,239.2083333]
// [257.7777778,	239.2083333]
// [257.7777778	,239.2083333]
// [241.7777778,	239.2083333]
// [218.6666667	,237.875]
// [218.6666667,	232.5416667]
// [216	,221.875]
// [208.8888889	,197.875]
  const generateConvexHull = () => {
    // points.sort((a, b) => a.x-b.x)
    console.log(points)
    const newEdges = KirkPatrickSeidel(points);
    setEdges(newEdges);
    drawCanvas();
  };

function medianTemp(T){
  var T_cpy = [...T]
  T_cpy.sort((a,b)=>a.x-b.x)
  return T_cpy[Math.floor(T_cpy.length/2)]
}
function upperBridge(T,a){
  var candidates = []
  if(T.length == 1) return T
  if(T.length==2){
    T.sort((a,b)=>a.x-b.x)
    return T
  }
  var pairs = []

  if(T.length%2==0){
    for(let i = 0;i < T.length-1;i+=2){
      var edge = [T[i],T[i+1]]
      edge.sort((a,b)=>a.x-b.x)
      pairs.push(new Pair(edge[0],edge[1]))
    }
  }else{
    candidates.push(T[0])
    for(let i = 1;i < T.length-1;i+=2){
      var edge = [T[i],T[i+1]]
      edge.sort((a,b)=>a.x-b.x)
      pairs.push(new Pair(edge[0],edge[1]))
    }
  }
console.log('pairs = ',pairs)
  var slopes = []
  for(var p of pairs){
    if(p.pi.x===p.pj.x){
      if(p.pi.y > p.pj.y) candidates.push(p.pi)
      else candidates.push(p.pj)
    }else{
      slopes.push((p.pi.y-p.pj.y)/(p.pi.x-p.pj.x))
    }
  }
  console.log('slopes = ',slopes)
  if(slopes.length==0) return upperBridge(candidates,a)


  //replace with MOM
  slopes.sort((a,b)=>a-b)
  var median_slope=0
  if(slopes.length%2==0){
    median_slope = (slopes[slopes.length/2]+slopes[(slopes.length/2)-1])/2
  }else{
    median_slope = slopes[Math.floor(slopes.length/2)]
  }
  console.log('median_slope = ',median_slope)
  var small = []
  var equal = []
  var large = []

  for(var p of pairs)
  {
    if(p.pi.x===p.pj.x) continue
      var s = (p.pi.y-p.pj.y)/(p.pi.x-p.pj.x)
      if(s<median_slope) small.push(p)
      else if(s===median_slope) equal.push(p)
      else large.push(p)
  }
  console.log('small = ',small)
  console.log('large = ',large)
  console.log('equal = ',equal)
  var max_intercept = Number.MIN_SAFE_INTEGER
  for(var p of T){
    var intercept = p.y-median_slope*p.x
    if(intercept>max_intercept)
    {
      max_intercept = intercept
    }
  }
  console.log('max_intercept = ',max_intercept)
  var EPSILON = 1e-9
  var max_set = []
  for(var p of T){
    var intercept = p.y-median_slope*p.x
    console.log('intercept = ',intercept)
    if((max_intercept-intercept)<=EPSILON){
      max_set.push(p)
    }
  }

  console.log('max_set = ',max_set)
  var pk= new Point(Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER)
  var pm = new Point(Number.MIN_SAFE_INTEGER,Number.MIN_SAFE_INTEGER)
  for(var p of max_set){
    if(p.x < pk.x) pk = p
    if(p.x > pm.x) pm = p
  }

  console.log('pk = ',pk,'pm= ',pm)

  if(pk.x <= a.x && pm.x > a.x) return [pk,pm]
  else if(pm.x <= a.x){
    for(var p of small){
      candidates.push(p.pi)
      candidates.push(p.pj)
    }

    for(var p of equal){
      candidates.push(p.pj)
    }

    for(var p of large){
      candidates.push(p.pj)
    }
  }
  else if(pk.x > a.x){
    for(var p of small){
      candidates.push(p.pi)
     
    }

    for(var p of equal){
      candidates.push(p.pi)
    }

    for(var p of large){
      candidates.push(p.pi)
      candidates.push(p.pj)
    }
  }
  console.log('candidates = ',candidates)
  return upperBridge(candidates,a)


}
function  upperHull(pumin,pumax,T){
  if(Point.equals(pumin,pumax)) return [pumin]
  //replace with MOM
  var a= medianTemp(T)
  console.log('a = ',a)
  var bridge = upperBridge(T,a)
  console.log('bridge = ',bridge)
  if(bridge.length==1) return [pumin,pumax] //unecessary but there for security
  var pl = bridge[0]
  var pr = bridge[1]
  if(pl.x>pr.x){
    var temp = pl
    pl = pr
    pr = temp
  }else if(pl.x===pr.x && pl.y>pr.y){
    var temp = pl
    pl = pr
    pr = temp
  }

  var T_left = [pl,pumin]
  var T_right = [pr,pumax]
  var ref_pt = new Point(Math.floor((pl.x+pumin.x)/2),Math.max(pl.y,pumin.y)+1)
  var ref_dist = (ref_pt.y-pl.y)*(pumin.x-pl.x)-(ref_pt.x-pl.x)*(pumin.y-pl.y)
  console.log('left ref pt = ',ref_pt,'left ref dist = ',ref_dist)
  for(var p of T){
    var dist =(p.y-pl.y)*(pumin.x-pl.x)-(p.x-pl.x)*(pumin.y-pl.y)
    console.log('left pt = ',p,'left dist = ',dist)
    if(dist*ref_dist>0){
      T_left.push(p)
    }
  }

  ref_pt = new Point(Math.floor((pr.x+pumax.x)/2),Math.max(pr.y,pumax.y)+1)
  ref_dist = (ref_pt.y-pr.y)*(pumax.x-pr.x)-(ref_pt.x-pr.x)*(pumax.y-pr.y)
  console.log('right ref pt = ',ref_pt,'right ref dist = ',ref_dist)
  for(var p of T){
    var dist =  (p.y-pr.y)*(pumax.x-pr.x)-(p.x-pr.x)*(pumax.y-pr.y)
    console.log('right pt = ',p,'right dist = ',dist)
    if(dist*ref_dist > 0){
      T_right.push(p)
    }
  }
  console.log('Tleft = ',T_left)
  var leftList = (Point.equals(pumin,pl))?[pl] : upperHull(pumin,pl,T_left)
  console.log('Tright = ',T_right)
  var rightList = (Point.equals(pumax,pr))?[pr] :  upperHull(pr,pumax,T_right)
  console.log('leftlist = ',leftList,'rightlist = ',rightList)

  return [...leftList,...rightList]
}

function lowerHull(points){
  var pumin = new Point(Number.MAX_SAFE_INTEGER,Number.MIN_SAFE_INTEGER)
  var pumax = new Point(Number.MIN_SAFE_INTEGER,Number.MIN_SAFE_INTEGER)
  for(var p of points){
    if(p.x < pumin.x){
      pumin = p
    }else if(p.x===pumin.x && p.y > pumin.y){
      pumin = p
    }
    if(p.x > pumax.x ){
      pumax = p
    }else if(p.x===pumax.x && p.y > pumax.y){
      pumax = p
    }
  }

  var T = [pumin,pumax]
  for(var p of points){
    if(p.x < pumax.x && p.x > pumin.x){
      T.push(p)
    }
  }
  console.log('T = ',T)
  var UH = upperHull(pumin,pumax,T)
  var LH = []
  for(var p of UH){
    LH.push(new Point(p.x,(-1)*p.y))
  }
  return LH
}
function KirkPatrickSeidel(points){
  var pumin = new Point(Number.MAX_SAFE_INTEGER,Number.MIN_SAFE_INTEGER)
  var pumax = new Point(Number.MIN_SAFE_INTEGER,Number.MIN_SAFE_INTEGER)
  for(var p of points){
    if(p.x < pumin.x){
      pumin = p
    }else if(p.x===pumin.x && p.y > pumin.y){
      pumin = p
    }
    if(p.x > pumax.x ){
      pumax = p
    }else if(p.x===pumax.x && p.y > pumax.y){
      pumax = p
    }
  }

  var T = [pumin,pumax]
  for(var p of points){
    if(p.x < pumax.x && p.x > pumin.x){
      T.push(p)
    }
  }
  console.log('T = ',T)
  var UH = upperHull(pumin,pumax,T)
  var lowerPts = []
  for(var p of points){
    lowerPts.push(new Point(p.x,(-1)*p.y))
  }
  var LH = lowerHull(lowerPts)
  LH.reverse()
  UH = [...UH,...LH]
  var edges = []
  for(let i = 0; i<UH.length-1;i++){
    edges.push([UH[i],UH[i+1]])
  }

  return edges
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
        <button onClick={clearCanvas} className="redrawButton">
          Clear Canvas
        </button>
      </div>
    </div>
  );
}

export default KirkPatrikSeidel;


/**
 * var temp = [202.6666667	,187.2083333]
[296,	124.5416667]
[205.3333333,	183.2083333]
[208.8888889	,173.875]
[213.3333333,	171.2083333]
[230.2222222,	155.2083333]
[234.6666667,	152.5416667]
[243.5555556,	151.2083333]
[248.8888889	,151.2083333]
[263.1111111,	141.875]
[264,	132.5416667]
[264.8888889	,131.2083333]
[270.2222222,	131.2083333]
[293.3333333,	105.875]
[313.7777778,	113.875]
[322.6666667,	108.5416667]
[328.8888889,	117.875]
[340.4444444,	123.2083333]
[360	,136.5416667]
[360,144.5416667]
[357.3333333,	219.2083333]
[335.1111111	,219.2083333]
[331.5555556,	220.5416667]
[308.4444444	,237.875]
[307.5555556	,239.2083333]
[298.6666667	,239.2083333]
[275.5555556	,239.2083333]
[270.2222222	,239.2083333]
[257.7777778,	239.2083333]
[257.7777778	,239.2083333]
[241.7777778,	239.2083333]
[218.6666667	,237.875]
[218.6666667,	232.5416667]
[216	,221.875]
[208.8888889	,197.875]

 * 
 * 
 * 
 */