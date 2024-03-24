class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

class Pair {
    pi: Point;
    pj : Point;
    constructor(pi: Point, pj : Point) {
        this.pi = pi;
        this.pj = pj;
    }
}

function Gcd(a: number, b: number):number{
    if(a===0){
        return b;
    }else{
        return Gcd(b%a, a)
    }
}
function getMedian(arr: Point[]): Point{
    arr.sort((a, b) => a.x-b.x);
    if(arr.length%2==0){
        var p1 = arr[Math.ceil(arr.length/2)-1]
        var p2 = arr[Math.ceil(arr.length/2)]
        return new Point((p1.x+p2.x)/2,(p1.y+p2.y)/2)
    }else {
        return arr[Math.ceil(arr.length/2)-1]
    }
}

function upperBridge(T: Point[], a: Point): Point[]{
    let candidates: Set<Point> = new Set();
    console.log("T",T);
    if(T.length === 1){
        return T;
    }
    if(T.length === 2){
        T.sort((a, b)=> a.x-b.x);
        return T;
    }
    var pairs: Pair[] = [];
    if(T.length%2 == 0){
        for (let i = 0; i < T.length-1; i+=2){
            let pair = [T[i], T[i+1]];
            pair.sort((a, b)=> a.x-b.x);
            let temp = new Pair(pair[0], pair[1]);
            pairs.push(temp);
        }
    }
    else{
        candidates.add(T[0]);
        for (let i = 1; i < T.length-1; i+=2){
            let pair = [T[i], T[i+1]];
            pair.sort((a, b)=> a.x-b.x);
            let temp = new Pair(pair[0], pair[1]);
            pairs.push(temp);
        }
    }
    console.log("pairs", pairs);
    var slopes: number[][] = []
    for(let pair of pairs){
        if(pair.pi.x === pair.pj.x){
            if(pair.pi.y> pair.pj.y){
                candidates.add(pair.pi);
            }
            else{
                candidates.add(pair.pj);
            }
        }
        else{
            var dy = pair.pi.y - pair.pj.y;
            var dx = pair.pi.x - pair.pj.x;
            // var g = Gcd(Math.abs(dy), Math.abs(dx));
            if(dy*dx<0){
                dy = Math.abs(dy)*(-1);
                dx = Math.abs(dx)
            }
            else{
                dy = Math.abs(dy);
                dx = Math.abs(dx)
            }
            // dy = dy/g;
            // dx = dx/g;
            slopes.push([dy, dx]);
        }
    }
    
    // if (slopes.length == 0) {
    //     var arr: Point[] = [];
    // candidates.forEach(value => {
    //     arr.push(value);
    // });
    // arr.sort((a,b)=>a.x-b.x)
    //     return upperBridge(arr, a);
    // }
    slopes.sort((a, b)=> a[0]*b[1]- a[1]*b[0]);
    console.log("slopes", slopes);
    var median_slope:number[] = []
    if(slopes.length%2==0){
        var s1 = slopes[Math.ceil(slopes.length/2)-1];
        var s2 = slopes[Math.ceil(slopes.length/2)];
        median_slope = [s1[0]*s2[1]+s1[1]*s2[0],2*s1[1]*s2[1]]
    }else{
        median_slope = slopes[Math.ceil(slopes.length/2)-1];
    }
    console.log('median slope',median_slope)
    let small : Pair[] = [];
    let equal : Pair[] = [];
    let large : Pair[] = [];

    for(let pair of pairs){
        if(pair.pi.x === pair.pj.x){
        }
        else{
            var dy = pair.pi.y - pair.pj.y;
            var dx = pair.pi.x - pair.pj.x;
            // var g = Gcd(Math.abs(dy), Math.abs(dx));
            if(dy*dx<0){
                dy = Math.abs(dy)*(-1);
                dx = Math.abs(dx)
            }
            else{
                dy = Math.abs(dy);
                dx = Math.abs(dx)
            }
            // dy = dy/g;
            // dx = dx/g;
            if(dy*median_slope[1]<dx*median_slope[0]){
                small.push(pair);
            }
            else if(dy*median_slope[1]===dx*median_slope[0]){
                equal.push(pair);
            }
            else if(dy*median_slope[1]>dx*median_slope[0]){
                large.push(pair);
            }
        }
    }
    console.log("small", small, "large", large, "equal", equal);
    var maxSet: Point[] = [];
    var maxIntercept = Number.MIN_SAFE_INTEGER;
    for (let point of T){
        var intercept = point.y*median_slope[1] - point.x*median_slope[0];
        maxIntercept = Math.max(maxIntercept, intercept);
    }
    console.log("maxintercept", maxIntercept);
    for(let point of T){
        var intercept = point.y*median_slope[1] - point.x*median_slope[0];
        console.log(point,intercept)
        if(intercept === maxIntercept){
            maxSet.push(point);
        }
    }
    console.log("maxset", maxSet);
    let pk = maxSet[0];
    let pm = maxSet[0];

    for(let point of maxSet){
        if(point.x<pk.x){
            pk = point;
        }
        if(point.x>pm.x){
            pm = point;
        }
    }
    console.log("pk", pk, "pm", pm);
    if(pk.x<= a.x && pm.x> a.x){
        return [pk, pm];
    }
    if(pm.x<=a.x){
        for(let pair of large){
            candidates.add(pair.pj);
        }
        for(let pair of equal){
            candidates.add(pair.pj);
        }
        for(let pair of small){
            candidates.add(pair.pj);
            candidates.add(pair.pi);
        }
    }
    if(pk.x>a.x){
        for(let pair of small){
            candidates.add(pair.pi);
        }
        for(let pair of equal){
            candidates.add(pair.pi);
        }
        for(let pair of large){
            candidates.add(pair.pj);
            candidates.add(pair.pi);
        }
    }
    var arr: Point[] = [];
    candidates.forEach(value => {
        arr.push(value);
    });
    arr.sort((a,b)=>a.x-b.x)
    return upperBridge(arr, a);

}

function UpperHull(pu_min: Point, pu_max: Point, T: Point[]): Point[]{
    var a = getMedian([...T])
    T.sort((a,b)=> a.x-b.x)
    console.log("a", a);
    var T_left: Point[] = []
    var T_right: Point[] = []
    for(let point of T){
        if(point.x<=a.x){
            T_left.push(point);
        }
        if(point.x>a.x){
            T_right.push(point);
        }
    }
    console.log("tleft", T_left, "tright", T_right);
    var bridge = upperBridge(T, a);
    var pl = bridge[0];
    var pr = bridge[1];
    var T_new_left: Point[] = [];
    var T_new_right: Point[] = [];
    for (let point of T_left){
        if(point.x<pl.x){
            T_new_left.push(point);
        }
    }
    for (let point of T_right){
        if(point.x>pr.x){
            T_new_right.push(point);
        }
    }
    T_new_left.push(pl);
    T_new_right.push(pr);
    console.log("pl", pl, "pr", pr);
    console.log("tnewleft", T_new_left, "tnewright", T_new_right);
    var leftList = (pu_min.x === pl.x && pu_min.y === pl.y)?[pu_min]:UpperHull(pu_min, pl, T_new_left);
    var rightList = (pu_max.x === pr.x && pu_max.y === pr.y)?[pu_max]:UpperHull(pr, pu_max, T_new_right);
    console.log("leftlist", leftList, "rightlist", rightList);
    var final = [...leftList, ...rightList];
    return final;

}

function KPS(points: Point[]): [Point, Point][] {
    console.log(points);
    points.sort((a, b) => a.x-b.x)
    let pu_min = new Point(Number.MAX_VALUE, Number.MIN_SAFE_INTEGER);
    let pu_max = new Point(Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);
    let pl_min = new Point(Number.MAX_VALUE, Number.MAX_VALUE);
    let pl_max = new Point(Number.MIN_SAFE_INTEGER, Number.MAX_VALUE);

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

    const upperHullAns = UpperHull(pu_min, pu_max, setT_UpperHull);

    console.log("upper hull ans", upperHullAns);

    // // Call lower-hull function
    console.log("pu-pl",pu_min, pu_max, pl_min, pl_max);
    // const lowerHullAns = LowerHull(pl_min, pl_max, setT_LowerHull);
    // console.log("lower hull ans", lowerHullAns);

    let convexHull: Point[] = [];
    for (let point of upperHullAns) convexHull.push(point);
    // for (let point of lowerHullAns) convexHull.push(point);

    let edges: [Point, Point][] = [];
    for (let i = 0; i < convexHull.length - 1; i++) {
        let edge: [Point, Point] = [convexHull[i], convexHull[i + 1]];
        edges.push(edge);
    }
    console.log("edges", edges);
    return edges;

}

// var temp = [[20,44],
//     [-2,-20],
//     [12,28],
//     [10,32],
//     [46,48],
//     [30,-44],
//     [8,50]]

// var temp = [[415.55555555555554, 40.3125],
// [597.7777777777777,61.64583333333333],
// [692.8888888888888,265.6458333333333],
// [641.3333333333333,508.3125],
// [433.3333333333333,508.3125],
// [271.55555555555554,469.6458333333333],
// [211.1111111111111,250.97916666666666],
// [244.88888888888889,65.64583333333333],
// ]
// var temp  = [[300, 320.85416666666663],[366.66666666666663,119.52083333333333],[540,316.85416666666663]]
// {x: 415.55555555555554, y: 40.3125}
// {x: 597.7777777777777, y: 61.64583333333333}
// {x: 692.8888888888888, y: 265.6458333333333}
// {x: 641.3333333333333, y: 508.3125}
// {x: 433.3333333333333, y: 508.3125}
// {x: 271.55555555555554, y: 469.6458333333333}
// {x: 211.1111111111111, y: 250.97916666666666}
// {x: 244.88888888888889, y: 65.64583333333333}

// var Pts: Point[] = [];

// for(let t of temp){
//     Pts.push(new Point(t[0], t[1]))
// }
// Pts.sort((a, b)=>a.x-b.x);
// KPS(Pts);

/*
300, y: 320.85416666666663}
1
: 
Point {x: 366.66666666666663, y: 119.52083333333333}
2
: 
Point {x: 540, y: 316.85416666666663

*/
// console.log(KPS(Pts))
export {KPS}