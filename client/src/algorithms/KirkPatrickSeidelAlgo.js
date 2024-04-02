const nthSmallest = require("./MedianOfMedians");
const nthSmallestPoints = require("./MedianOfMediansPoints");

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static equals(p, q) {
        return (p.x === q.x && p.y === q.y)
    }
}

class Pair {
    constructor(pi, pj) {
        this.pi = pi;
        this.pj = pj;
    }
}

function upperBridge(T, a) {
    var candidates = []
    if(T.length == 0){
        return []
    }
    if (T.length == 1) return T
    if (T.length === 2) {
        T.sort((a, b) => a.x - b.x)
        return T
    }
    var pairs = []

    if (T.length % 2 == 0) {
        for (let i = 0; i < T.length - 1; i += 2) {
            var edge = [T[i], T[i + 1]]
            edge.sort((a, b) => a.x - b.x)
            pairs.push(new Pair(edge[0], edge[1]))
        }
    } else {
        candidates.push(T[0])
        for (let i = 1; i < T.length - 1; i += 2) {
            var edge = [T[i], T[i + 1]]
            edge.sort((a, b) => a.x - b.x)
            pairs.push(new Pair(edge[0], edge[1]))
        }
    }

    var slopes = []
    for (var p of pairs) {
        if (p.pi.x === p.pj.x) {
            if (p.pi.y > p.pj.y) candidates.push(p.pi)
            else candidates.push(p.pj)
        } else {
            slopes.push((p.pi.y - p.pj.y) / (p.pi.x - p.pj.x))
        }
    }

    if (slopes.length == 0) return upperBridge(candidates, a)

    var median_slope = 0;
    if (slopes.length % 2 == 0) {
      median_slope =
        (nthSmallest(slopes, slopes.length / 2) +
          nthSmallest(slopes, slopes.length / 2 + 1)) /
        2;
    } else {
      median_slope = nthSmallest(slopes, Math.ceil(slopes.length / 2));
    }

    var small = []
    var equal = []
    var large = []

    for (var p of pairs) {
        if (p.pi.x === p.pj.x) continue
        var s = (p.pi.y - p.pj.y) / (p.pi.x - p.pj.x)
        if (s < median_slope) small.push(p)
        else if (s === median_slope) equal.push(p)
        else large.push(p)
    }

    var max_intercept = Number.MIN_SAFE_INTEGER
    for (var p of T) {
        var intercept = p.y - median_slope * p.x
        if (intercept > max_intercept) {
            max_intercept = intercept
        }
    }

    var EPSILON = 1e-9
    var max_set = []
    for (var p of T) {
        var intercept = p.y - median_slope * p.x
        if ((max_intercept - intercept) <= EPSILON) {
            max_set.push(p)
        }
    }

    var pk = new Point(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)
    var pm = new Point(Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER)
    for (var p of max_set) {
        if (p.x < pk.x) pk = p
        if (p.x > pm.x) pm = p
    }

    if (pk.x <= a.x && pm.x > a.x) return [pk, pm]
    else if (pm.x <= a.x) {
        for (var p of small) {
            candidates.push(p.pi)
            candidates.push(p.pj)
        }
        for (var p of equal) {
            candidates.push(p.pj)
        }
        for (var p of large) {
            candidates.push(p.pj)
        }
    }
    else if (pk.x > a.x) {
        for (var p of small) {
            candidates.push(p.pi)
        }
        for (var p of equal) {
            candidates.push(p.pi)
        }
        for (var p of large) {
            candidates.push(p.pi)
            candidates.push(p.pj)
        }
    }
    return upperBridge(candidates, a)
}

function upperHull(pumin, pumax, T) {
    // console.log("begin")
    // if(pumin.x>pumax.x){
    //     var temp = pumin
    //     pumin = pumax
    //     pumax = temp
    // }
    // console.log(pumin, pumax, T)
    if (Point.equals(pumin, pumax)) return [pumin];

    var a = nthSmallestPoints(T, Math.ceil(T.length / 2));

    var bridge = upperBridge(T, a);
    // console.log("bridge", bridge)
    if (bridge.length === 1) return [pumin, pumax] //unecessary but there for security
    var pl = bridge[0]
    var pr = bridge[1]
    if (pl.x > pr.x) {
        var temp = pl
        pl = pr
        pr = temp
    }
     else if (pl.x === pr.x && pl.y > pr.y) {
        var temp = pl
        pl = pr
        pr = temp
    }

    var T_left = [pl, pumin]
    var T_right = [pr, pumax]
    var ref_pt = new Point(Math.floor((pl.x + pumin.x) / 2), Math.max(pl.y, pumin.y) + 2)
    var ref_dist = (ref_pt.x - pumin.x) * (pl.y - pumin.y) - (ref_pt.y - pumin.y) * (pl.x - pumin.x)
    for (var p of T) {
        var dist = (p.x - pumin.x) * (pl.y - pumin.y) - (p.y - pumin.y) * (pl.x - pumin.x)
        if (dist * ref_dist > 0) {
            T_left.push(p)
        }

    }

    ref_pt = new Point(Math.floor((pr.x + pumax.x) / 2), Math.max(pr.y, pumax.y) + 2)
    ref_dist = (ref_pt.x - pumax.x) * (pr.y- pumax.y) - (ref_pt.y - pumax.y) * (pr.x - pumax.x)
    for (var p of T) {
        var dist = (p.x - pumax.x) * (pr.y - pumax.y) - (p.y - pumax.y) * (pr.x - pumax.x)
        if (dist * ref_dist > 0) {
            T_right.push(p)
        }

    }
    
    // console.log("see left", pumin, pl, T_left)
    // console.log("see right", pr, pumax, T_right)
    var leftList = (Point.equals(pumin, pl)) ? [pl] : upperHull(pumin, pl, T_left)
    var rightList = (Point.equals(pumax, pr)) ? [pr] : upperHull(pr, pumax, T_right)
    return [...leftList, ...rightList]
}

function lowerHull(points) {
    var pumin = new Point(Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER)
    var pumax = new Point(Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER)
    for (var p of points) {
        if (p.x < pumin.x) {
            pumin = p
        } else if (p.x === pumin.x && p.y > pumin.y) {
            pumin = p
        }
        if (p.x > pumax.x) {
            pumax = p
        } else if (p.x === pumax.x && p.y > pumax.y) {
            pumax = p
        }
    }

    var T = [pumin, pumax]
    for (var p of points) {
        if (p.x < pumax.x && p.x > pumin.x) {
            T.push(p)
        }
    }

    var UH = upperHull(pumin, pumax, T)
    var LH = []
    for (var p of UH) {
        LH.push(new Point(p.x, (-1) * p.y))
    }
    return LH
}

function KirkPatrickSeidelAlgorithm(points) {
    if(points.length === 0){
        return [];
    }
    
    var pumin = new Point(Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER)
    var pumax = new Point(Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER)
    for (var p of points) {
        if (p.x < pumin.x) {
            pumin = p
        } else if (p.x === pumin.x && p.y > pumin.y) {
            pumin = p
        }
        if (p.x > pumax.x) {
            pumax = p
        } else if (p.x === pumax.x && p.y > pumax.y) {
            pumax = p
        }
    }

    var T = [pumin, pumax]
    for (var p of points) {
        if (p.x < pumax.x && p.x > pumin.x) {
            T.push(p)
        }
    }

    var UH = upperHull(pumin, pumax, T)
    var lowerPts = []
    for (var p of points) {
        lowerPts.push(new Point(p.x, (-1) * p.y))
    }
    var LH = lowerHull(lowerPts)
    LH.reverse()
    UH = [...UH, ...LH]
    var edges = []
    for (let i = 0; i < UH.length - 1; i++) {
        edges.push([UH[i], UH[i + 1]])
    }

    return edges;
}
// const fs = require('fs');


// function minMaxScaling(value, minValue, maxValue, newMin, newMax) {
//     return (
//       ((value - minValue) / (maxValue - minValue)) * (newMax - newMin) + newMin
//     );
//   }

// function convert(csvFilePath){
//     // var canvas = document.getElementById("canvas");
//     // var ctx = document.getElementById("canvas").getContext("2d");
//     // const rect = canvas.getBoundingClientRect();

//     // var scaleX = canvas.width / rect.width; // relationship bitmap vs. element for x
//     // var scaleY = canvas.height / rect.height;
//     // var radius = rect.height / 10;

//     // setHeight(rect.height);
//     // setScaleYState(scaleY);

//     // const file = event.target.files[0];
//     // const reader = new FileReader();
//     var ptsArr = [];

//     const contents = fs.readFileSync(csvFilePath, 'utf8');
//     var rows = contents.split("\n");
//     var ptsArr = [];
//     const data = rows.map((row) => {
//     //   console.log(row);
//       const values = row.split(",");
//       const pt_x = parseFloat(values[0]);
//       const pt_y = parseFloat(values[1]);
//       ptsArr = [...ptsArr, { x: pt_x, y: pt_y }];
//     });

//     // const minX = Math.min(...ptsArr.map((point) => point.x));
//     // const maxX = Math.max(...ptsArr.map((point) => point.x));
//     // const minY = Math.min(...ptsArr.map((point) => point.y));
//     // const maxY = Math.max(...ptsArr.map((point) => point.y));

//     // const scaledPtsArr = ptsArr.map((point) => ({
//     //   x:
//     //     minMaxScaling(point.x, minX - 5, maxX + 5, 0, 1) *
//     //     (rect.right - rect.left + 1) *
//     //     scaleX,
//     //   y:
//     //     (rect.height -
//     //       minMaxScaling(point.y, minY - 5, maxY + 5, 0, 1) *
//     //         (rect.bottom - rect.top + 1)) *
//     //     scaleY,
//     // }));

//     const scaledNewPts = [];
//     for (var point of ptsArr) {
//       scaledNewPts.push(new Point(point.x, point.y));
//     //   console.log(point);
//     //   ctx.fillStyle = "blue";
//     //   ctx.beginPath();
//     //   ctx.arc(point.x, rect.height * scaleY - point.y, 3, 0, Math.PI * 2);
//     //   ctx.fill();
//     }

//     // console.log("scaled points are", scaledNewPts);
//     return scaledNewPts;
// }



// var ans = KirkPatrickSeidelAlgorithm(convert("/Users/atharvadashora/Downloads/DAA-Assignment1/__test__/random_100000_points.csv"))
// console.log(ans)
module.exports = KirkPatrickSeidelAlgorithm;