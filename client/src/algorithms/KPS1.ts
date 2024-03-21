import kthSmallestElement from "./MedianOfMedians";
import kthSmallestElementSlope from "./MedianOfMediansSlope";

class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

function UpperBridge(T: Point[], l: number): Point[] {
    if (T.length === 0) return [];
    if (T.length === 1) return [];

    let candidates: Point[] = [];

    if (T.length === 2) {
        let finalBridgePoints: Point[] = [];
        if (T[0].x < T[1].x) {
            finalBridgePoints.push(T[0]);
            finalBridgePoints.push(T[1]);
        } else {
            finalBridgePoints.push(T[1]);
            finalBridgePoints.push(T[0]);
        }
        return finalBridgePoints;
    }

    let pairs: Point[][] = [];
    if (T.length % 2 !== 0) {
        candidates.push(T[T.length - 1]);
    }

    for (let i = 0; i < T.length - 1; i += 2) {
        let pair: Point[] = [];
        if (T[i].x <= T[i + 1].x) {
            pair.push(T[i]);
            pair.push(T[i + 1]);
        } else {
            pair.push(T[i + 1]);
            pair.push(T[i]);
        }
        pairs.push(pair);
    }

    let slopes: number[] = [];
    for (let pair of pairs) {
        if (pair[0].x == pair[1].x) {
            if (pair[0].y > pair[1].y) {
                candidates.push(pair[0]);
            } else {
                candidates.push(pair[1]);
            }
        } else {
            let slope = ((pair[1].y - pair[0].y) * 1.0) / ((pair[1].x - pair[0].x) * 1.0);
            slopes.push(slope);
        }
    }

    if (slopes.length === 0) {
        return UpperBridge(candidates, l);
    }

    let k = 0;
    slopes.sort((a,b)=>a-b);
    k = slopes[Math.ceil(slopes.length / 2)-1+0];
    // k = kthSmallestElementSlope(slopes, 0, slopes.length - 1, slopes.length / 2);

    let small: Point[][] = [];
    let equal: Point[][] = [];
    let large: Point[][] = [];

    const EPSILON = 1e-9;
    for (let pair of pairs) {
        if (pair[0].x !== pair[1].x) {
            let slope = (pair[1].y - pair[0].y) / (pair[1].x - pair[0].x);
            if (slope < k) {
                small.push(pair);
            } else if (Math.abs(slope - k) < EPSILON) {
                equal.push(pair);
            } else {
                large.push(pair);
            }
        }
    }

    let maxSet: [Point, number][] = [];
    let maxIntercept = Number.MIN_SAFE_INTEGER;
    for (let point of T) {
        if ((point.y - k * point.x) >= maxIntercept) {
            maxIntercept = point.y - k * point.x;
        }
    }

    for (let i = 0; i < T.length; i++) {
        let point = T[i];
        if (Math.abs((point.y - k * point.x)-maxIntercept) < EPSILON) {
            let temp: [Point, number] = [point, i];
            maxSet.push(temp);
        }
    }

    let pk = new Point(Number.MAX_VALUE,-1);
    let pm = new Point(Number.MIN_SAFE_INTEGER,-1);
    let pkIndex:number, pmIndex:number;
    pkIndex = 0;
    pmIndex = 0;

    for (let i = 0; i < maxSet.length; i++) {
        if (maxSet[i][0].x > pm.x) {
            pm = maxSet[i][0];
            pmIndex = maxSet[i][1];
        }
        if (maxSet[i][0].x < pk.x) {
            pk = maxSet[i][0];
            pkIndex = maxSet[i][1];
        }
    }

    if (pk.x <= l && pm.x > l) {
        let ans: Point[] = [];
        ans.push(T[pkIndex]);
        ans.push(T[pmIndex]);
        return ans;
    }

    if (pm.x <= l) {
        for (let pair of large) {
            candidates.push(pair[1]);
        }
        for (let pair of equal) {
            candidates.push(pair[1]);
        }
        for (let pair of small) {
            candidates.push(pair[0]);
            candidates.push(pair[1]);
        }
    }

    if (pk.x > l) {
        for (let pair of small) {
            candidates.push(pair[0]);
        }
        for (let pair of equal) {
            candidates.push(pair[0]);
        }
        for (let pair of large) {
            candidates.push(pair[0]);
            candidates.push(pair[1]);
        }
    }

    return UpperBridge(candidates, l);
}


function UpperHull(pmin: Point, pmax: Point, T: Point[]): Point[] {
    // finding median of these points to get line L in linear time
    var p : Point;
    T.sort((a,b)=>a.x-b.x);
    p = T[Math.ceil(T.length / 2)-1+0];
    // var p = kthSmallestElement(T, 0, T.length - 1, T.length / 2);
    console.log("sorted array ",p);


    var T_left: Point[] = [];
    var T_right: Point[] = [];
    for (var point of T) {
        if (point.x <= p.x) {
            T_left.push(point);
        } else {
            T_right.push(point);
        }
    }

    var pl: Point, pr: Point;
    // finding upper-bridge in linear time
    var upperAns = UpperBridge(T, p.x);
    if(upperAns.length !== 0){
        pl = upperAns[0];
        pr = upperAns[1];
    }else{
        return T;
    }

    // if(pl === pmin){
    //     return [pl];
    // }
    // if(pr == pmax){
    //     return [pr];
    // }

    console.log("pl",pl);
    console.log("pr",pr);

    var T_left_new: Point[] = [];
    var T_right_new: Point[] = [];

    // left set of points
    T_left_new.push(pl);

    // right set of points
    T_right_new.push(pr);

    var test_distance:number;
    var sl:number;
    var intercept:number;
    // if slope is inf
    if(pmin.x === pl.x){
        for(var point of T_left){
            if(point.x < pl.x){
                T_left_new.push(point);
            }
        }
    }else{
        sl = (pl.y-pmin.y)/(pl.x-pmin.x);
        intercept = pl.y - sl*pl.x;
        var test_x = pl.x-1;
        var test_y = pl.y;
        test_distance = test_y-(sl*test_x)-intercept;
        console.log("td",test_distance);

        for (var point of T_left) {
            var newDistance = point.y-(sl*point.x)-intercept;
            console.log("point nd",point,newDistance);
            if(newDistance * test_distance > 0){
                T_left_new.push(point);
            }
        }
    }

    // if slope is inf
    if(pmax.x === pr.x){
        for(var point of T_right){
            if(point.x > pr.x){
                T_right_new.push(point);
            }
        }
    }else{
        sl = (pr.y-pmax.y)/(pr.x-pmax.x);
        intercept = pr.y - sl*pr.x;
        var test_x = pr.x+1;
        var test_y = pr.y;
        test_distance = test_y-(sl*test_x)-intercept;
        console.log("upper td",test_distance);

        for (var point of T_right) {
            var newDistance = point.y-(sl*point.x)-intercept;
            console.log(" right upper point nd",point,newDistance);
            if(newDistance * test_distance > 0){
                T_right_new.push(point);
            }
        }
    }
    
    console.log("upper hull_tleftnew",T_left_new);
    console.log("upper hull_trightnew",T_right_new);

    // recursive call on left and right halves
    var leftList = (T_left_new.length >= 2) ? UpperHull(pmin, pl, T_left_new) : [T_left_new[0]];
    var rightList = (T_right_new.length >= 2) ? UpperHull(pr, pmax, T_right_new) : [T_right_new[0]];


    console.log("left list is",leftList);
    console.log("right list is",rightList);

    var upperHullAns = [...leftList, ...rightList]
    return upperHullAns;
}

function LowerBridge(T: Point[], l: number): Point[] {
    if (T.length === 0) return [];
    if (T.length === 1) return [];

    // array to store indices of candidate points
    let candidates: Point[] = [];

    // base case when only two points are there
    if (T.length === 2) {
        var finalBridgePoints: Point[] = [];
        if (T[0].x < T[1].x) {
            finalBridgePoints.push(T[0]);
            finalBridgePoints.push(T[1]);
        } else {
            finalBridgePoints.push(T[1]);
            finalBridgePoints.push(T[0]);
        }
        return finalBridgePoints;
    }

    // if number of points is odd
    let pairs: Point[][] = [];
    if (T.length % 2 !== 0) {
        candidates.push(T[T.length - 1]);
    }

    // pushing pairs i,j such that pi.x <= pj.x
    for (let i = 0; i < T.length - 1; i += 2) {
        let pair: Point[] = [];
        if (T[i].x <= T[i + 1].x) {
            pair.push(T[i]);
            pair.push(T[i + 1]);
        } else {
            pair.push(T[i + 1]);
            pair.push(T[i]);
        }
        pairs.push(pair);
    }

    // finding slope for each pair
    let slopes: number[] = [];
    for (let pair of pairs) {
        if (pair[0].x == pair[1].x) {
            if (pair[0].y > pair[1].y) {
                candidates.push(pair[1]);
            } else {
                candidates.push(pair[0]);
            }
        } else {
            let slope = ((pair[1].y - pair[0].y) * 1.0) / ((pair[1].x - pair[0].x) * 1.0);
            slopes.push(slope);
        }
    }

    if (slopes.length === 0) {
        return LowerBridge(candidates, l);
    }

    // finding median slope
    let k = 0;
    slopes.sort((a,b)=>a-b);
    k = slopes[Math.ceil(slopes.length / 2)-1+0];

    // dividing points into 3 sets according to their slopes
    let small: Point[][] = [];
    let equal: Point[][] = [];
    let large: Point[][] = [];

    const EPSILON = 1e-9;
    for (let pair of pairs) {
        if (pair[0].x !== pair[1].x) {
            let slope = (pair[1].y - pair[0].y) / (pair[1].x - pair[0].x);
            if (slope < k) {
                small.push(pair);
            } else if (Math.abs(slope - k) < EPSILON) {
                equal.push(pair);
            } else {
                large.push(pair);
            }
        }
    }

    // we will take points which have minimum y intercept with slope k
    var minSet: [Point, number][] = [];
    var minIntercept = Number.MAX_VALUE;
    for (var point of T) {
        if ((point.y - k * point.x) <= minIntercept) {
            minIntercept = point.y - k * point.x;
        }
    }

    for (var i = 0; i < T.length; i++) {
        var point = T[i];
        if (Math.abs((point.y - k * point.x)-minIntercept) < EPSILON) {
            var temp: [Point, number] = [point, i];
            minSet.push(temp);
        }
    }

    // pk is point with min x-coordinate among points in max set
    // pm is point with max x-coordinate among points in max set
    var pk: Point = { x: Number.MAX_VALUE, y: 0 };
    var pm: Point = { x: Number.MIN_SAFE_INTEGER, y: 0 };
    var pkIndex: number, pmIndex: number;
    pkIndex = 0;
    pmIndex = 0;

    for (var i = 0; i < minSet.length; i++) {
        if (minSet[i][0].x > pm.x) {
            pm = minSet[i][0];
            pmIndex = minSet[i][1];
        }
        if (minSet[i][0].x < pk.x) {
            pk = minSet[i][0];
            pkIndex = minSet[i][1];
        }
    }

    // determine if h contains the bridge or not
    if (pk.x <= l && pm.x > l) {
        var ans: Point[] = [];
        ans.push(T[pkIndex]);
        ans.push(T[pmIndex]);
        return ans;
    }

    // if h contains only points of P to left of or on L
    if (pm.x <= l) {
        for (var pair of large) {
            candidates.push(pair[0]);
            candidates.push(pair[1]);
        }
        for (var pair of equal) {
            candidates.push(pair[1]);
        }
        for (var pair of small) {
            candidates.push(pair[1]);
        }
    }

    // if h contains only points of P to the right of L
    if (pk.x > l) {
        for (var pair of small) {
            candidates.push(pair[0]);
            candidates.push(pair[1]);
        }
        for (var pair of equal) {
            candidates.push(pair[0]);
        }
        for (var pair of large) {
            candidates.push(pair[0]);
        }
    }

    return LowerBridge(candidates, l);
}

function LowerHull(pmin: Point, pmax: Point, T: Point[]): Point[] {
    // finding median of these points to get line L in linear time
    var p : Point;
    T.sort((a,b)=>a.x-b.x);
    p = T[Math.ceil(T.length / 2)-1+0];
    // var p = kthSmallestElement(T, 0, T.length - 1, T.length / 2);

    var T_left: Point[] = [];
    var T_right: Point[] = [];
    for (var point of T) {
        if (point.x <= p.x) {
            T_left.push(point);
        } else {
            T_right.push(point);
        }
    }

    var pl: Point, pr: Point;
    // finding lower-bridge in linear time
    var lowerAns = LowerBridge(T, p.x);
    if(lowerAns.length !== 0){
        pl = lowerAns[0];
        pr = lowerAns[1];
    }else{
        return T;
    }

    console.log("lower bridge",pl,pr);

    // if(pl === pmin){
    //     return [pl];
    // }
    // if(pr == pmax){
    //     return [pr];
    // }


    var T_left_new: Point[] = [];
    var T_right_new: Point[] = [];

    T_left_new.push(pl);

    T_right_new.push(pr);

    var test_distance:number;
    var sl:number;
    var intercept:number;
    // if slope is inf
    if(pmin.x === pl.x){
        for(var point of T_left){
            if(point.x < pl.x){
                T_left_new.push(point);
            }
        }
    }else{
        sl = (pl.y-pmin.y)/(pl.x-pmin.x);
        intercept = pl.y - sl*pl.x;
        var test_x = pl.x-1;
        var test_y = pl.y;
        test_distance = test_y-(sl*test_x)-intercept;
        console.log("lower td",test_distance);

        for (var point of T_left) {
            var newDistance = point.y-(sl*point.x)-intercept;
            console.log("lower point nd",point,newDistance);
            if(newDistance * test_distance > 0){
                T_left_new.push(point);
            }
        }
    }

    // if slope is inf
    if(pmax.x === pr.x){
        for(var point of T_right){
            if(point.x > pr.x){
                T_right_new.push(point);
            }
        }
    }else{
        sl = (pr.y-pmax.y)/(pr.x-pmax.x);
        intercept = pr.y - sl*pr.x;
        var test_x = pr.x+1;
        var test_y = pr.y;
        test_distance = test_y-(sl*test_x)-intercept;
        console.log("lower td",test_distance);

        for (var point of T_right) {
            var newDistance = point.y-(sl*point.x)-intercept;
            console.log(" right lower point nd",point,newDistance);
            if(newDistance * test_distance > 0){
                T_right_new.push(point);
            }
        }
    }

    console.log("lower hull_tleftnew",T_left_new);
    console.log("lower hull_trightnew",T_right_new);

    // recursive call on left and right halves
    var rightList = (T_right_new.length >= 2) ? LowerHull(pmax, pr, T_right_new) : [T_right_new[0]];
    var leftList = (T_left_new.length >= 2) ? LowerHull(pl, pmin, T_left_new) : [T_left_new[0]];

    var lowerHullAns = [...rightList, ...leftList];
    return lowerHullAns;
}

function KPS(points: Point[]): [Point, Point][] {
    console.log("point are",points);

    // Convert points to Point class

    let pu_min = new Point(Number.MAX_VALUE, Number.MIN_SAFE_INTEGER);
    let pu_max = new Point(Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);
    let pl_min = new Point(Number.MAX_VALUE, Number.MAX_VALUE);
    let pl_max = new Point(Number.MIN_SAFE_INTEGER, Number.MAX_VALUE);

    // Finding pu_min and pu_max
    for (let point of points) {
        if (point.x >= pu_max.x) {
            if (point.x == pu_max.x) {
                if (point.y > pu_max.y) {
                    pu_max = point;
                } else if (point.y < pl_max.y) {
                    pl_max = point;
                }
            } else {
                pu_max = point;
                pl_max = point;
            }
        }
        if (point.x <= pu_min.x) {
            if (point.x == pu_min.x) {
                if (point.y > pu_min.y) {
                    pu_min = point;
                } else if (point.y < pl_min.y) {
                    pl_min = point;
                }
            } else {
                pu_min = point;
                pl_min = point;
            }
        }
    }

    let setT_UpperHull: Point[] = [];
    setT_UpperHull.push(pu_min);
    setT_UpperHull.push(pu_max);

    for (let point of points) {
        if (point.x > pu_min.x && point.x < pu_max.x) {
            setT_UpperHull.push(point)
        }
    }

    let setT_LowerHull: Point[] = [];
    setT_LowerHull.push(pl_min);
    setT_LowerHull.push(pl_max);

    for (let point of points) {
        if (point.x > pl_min.x && point.x < pl_max.x) {
            setT_LowerHull.push(point);
        }
    }

    // Call upper-hull function
    const upperHullAns = UpperHull(pu_min, pu_max, setT_UpperHull);
    console.log("upper hull ans", upperHullAns);

    // // Call lower-hull function
    console.log(pl_min);
    console.log(pl_max);
    const lowerHullAns = LowerHull(pl_min, pl_max, setT_LowerHull);
    console.log("lower hull ans", lowerHullAns);

    // // Join two lists in clockwise order
    let convexHull: Point[] = [];
    convexHull.push(pu_min);
    for (let point of upperHullAns) convexHull.push(point);
    convexHull.push(pu_max);
    convexHull.push(pl_max);
    for (let point of lowerHullAns) convexHull.push(point);
    convexHull.push(pl_min);

    console.log("convex hull points are", convexHull);

    let edges: [Point, Point][] = [];
    for (let i = 0; i < convexHull.length - 1; i++) {
        let edge: [Point, Point] = [convexHull[i], convexHull[i + 1]];
        edges.push(edge);
    }

    // console.log(edges);
    return edges;
}

// Define an array of points
const temp = [
    [0, 3],
    [2, 2],
    [1, 1],
    [2, 1],
    [3, 0],
    [0, 0],
    [3, 3]
];


// var temp = [[415.55555555555554, 40.3125],
// [597.7777777777777,61.64583333333333],
// [692.8888888888888,265.6458333333333],
// [641.3333333333333,508.3125],
// [433.3333333333333,508.3125],
// [271.55555555555554,469.6458333333333],
// [211.1111111111111,250.97916666666666],
// [244.88888888888889,65.64583333333333],
// ]

// {x: 415.55555555555554, y: 40.3125}
// {x: 597.7777777777777, y: 61.64583333333333}
// {x: 692.8888888888888, y: 265.6458333333333}
// {x: 641.3333333333333, y: 508.3125}
// {x: 433.3333333333333, y: 508.3125}
// {x: 271.55555555555554, y: 469.6458333333333}
// {x: 211.1111111111111, y: 250.97916666666666}
// {x: 244.88888888888889, y: 65.64583333333333}

let points: Point[] = [];
for (let point of temp) {
    points.push(new Point(point[0], point[1]));
}

var p : Point;
points.sort((a,b)=>a.x-b.x);
p = points[Math.ceil(points.length / 2)-1+0];

console.log(p.x);

let convexHull = KPS(points);
// console.log(convexHull);

export {KPS};