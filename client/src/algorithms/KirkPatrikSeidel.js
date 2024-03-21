const kthSmallestElement = require("./MedianOfMedians");
const kthSmallestElementSlope = require("./MedianOfMediansSlope")

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

// l = a is median line and T is point set
function UpperBridge(T, l) {

    if (T.length === 0) return []
    if (T.length === 1) return [T[0], T[0]]

    // array to store indices of candidate points
    var candidates = [];

    // base case when only two points are there
    if (T.length === 2) {
        var finalBridgePoints = [];
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
    var pairs = [];
    if (T.length % 2 !== 0) {
        candidates.push(T.length - 1);
    }

    // pushing pairs i,j such that pi.x <= pj.x
    for (var i = 0; i < T.length - 1; i += 2) {
        var pair = [];
        if (T[i].x <= T[i + 1].x) {
            pair.push(i);
            pair.push(i + 1);
        } else {
            pair.push(i + 1);
            pair.push(i);
        }
        pairs.push(pair);
    }

    // finding slope for each pair
    var slopes = [];
    for (var pair of pairs) {
        if (T[pair[0]].x == T[pair[1]].x) {
            if (T[pair[0]].y > T[pair[1]].y) {
                candidates.push(pair[0]);
            } else {
                candidates.push(pair[1]);
            }
        } else {
            var slope = ((T[pair[1]].y - T[pair[0]].y) * 1.0) / ((T[pair[1]].x - T[pair[0]].x) * 1.0);
            slopes.push(slope);
        }
    }

    if (slopes.length === 0) {
        var finalCandidates = [];
        for (var candidateIndex of candidates) {
            finalCandidates.push(T[candidateIndex]);
        }

        return UpperBridge(finalCandidates, l);
    }

    // finding median slope
    var k = 0;
    k = kthSmallestElementSlope(slopes, 0, slopes.length - 1, slopes.length / 2);

    // dividing points into 3 sets according to their slopes
    var small = [];
    var equal = [];
    var large = [];

    const EPSILON = 1e-9;
    for (var pair of pairs) {
        var slope = 0;
        if (T[pair[0]].x !== T[pair[1]].x) {
            var slope = (T[pair[1]].y - T[pair[0]].y) / (T[pair[1]].x - T[pair[0]].x);
            if (slope < k) {
                small.push(pair);
            } else if (Math.abs(slope - k) < EPSILON) {
                equal.push(pair);
            } else {
                large.push(pair);
            }
        }
    }

    // we will take points which have maximum y intercept with slope k
    var maxSet = [];
    var maxIntercept = Number.MIN_SAFE_INTEGER;
    for (var point of T) {
        if ((point.y - k * point.x) >= maxIntercept) {
            maxIntercept = point.y - k * point.x;
        }
    }

    for (var i = 0; i < T.length; i++) {
        var point = T[i];
        if ((point.y - k * point.x) === maxIntercept) {
            var temp = [point, i];
            maxSet.push(temp);
        }
    }

    // pk is point with min x-coordinate among points in max set
    // pm is point with max x-coordinate among points in max set
    var pk = new Point();
    var pm = new Point();
    pk.x = Number.MAX_VALUE;
    pm.x = Number.MIN_SAFE_INTEGER;
    var pkIndex, pmIndex;

    for (var i = 0; i < maxSet.length; i++) {
        if (maxSet[i][0].x > pm.x) {
            pm = maxSet[i][0];
            pmIndex = maxSet[i][1];
        }
        if (maxSet[i][0].x < pk.x) {
            pk = maxSet[i][0];
            pkIndex = maxSet[i][1];
        }
    }

    // determine if h contains the bridge or not
    if (pk.x <= l && pm.x > l) {
        var ans = [];
        ans.push(T[pkIndex]);
        ans.push(T[pmIndex]);
        return ans;
    }

    // if h contains only points of P to left of or on L
    if (pm.x <= l) {
        for (var pair of large) {
            candidates.push(pair[1]);
        }
        for (var pair of equal) {
            candidates.push(pair[1]);
        }
        for (var pair of small) {
            candidates.push(pair[0]);
            candidates.push(pair[1]);
        }
    }

    // if h contains only points of P to the right of L
    if (pk.x > l) {
        for (var pair of small) {
            candidates.push(pair[0]);
        }
        for (var pair of equal) {
            candidates.push(pair[0]);
        }
        for (var pair of large) {
            candidates.push(pair[0]);
            candidates.push(pair[1]);
        }
    }

    // returning final points whose indices are stored in candidates
    var finalCandidates = [];
    for (var candidateIndex of candidates) {
        finalCandidates.push(T[candidateIndex]);
    }

    return UpperBridge(finalCandidates, l);
}

function UpperHull(pmin, pmax, T) {
    // finding median of these points to get line L in linear time
    var p = kthSmallestElement(T, 0, T.length - 1, T.length / 2);

    var T_left = [];
    var T_right = [];
    for (var point of T) {
        if (point.x < p.x) {
            T_left.push(point);
        } else {
            T_right.push(point);
        }
    }

    var pl, pr;
    // finding upper-bridge in linear time
    var upperAns = UpperBridge(T, p.x);
    pl = upperAns[0];
    pr = upperAns[1];

    var T_left = [];
    var T_right = [];

    // left set of points
    T_left.push(pl);
    for (var point of T) {
        if ((point.y - pmin.y) * (pl.x - pmin.x) > (point.x - pmin.x) * (pl.y - pmin.y)) {
            T_left.push(point);
        }
    }

    // right set of points
    T_right.push(pr);
    for (var point of T) {
        if ((point.y - pmax.y) * (pl.x - pmax.x) < (point.x - pmax.x) * (pl.y - pmax.y)) {
            T_right.push(point);
        }
    }

    // recursive call on left and right halves
    var leftList = (T_left.length >= 2) ? UpperHull(pmin, pl, T_left) : [T_left[0]];
    var rightList = (T_right.length >= 2) ? UpperHull(pr, pmax, T_right) : [T_right[0]];

    var upperHullAns = [...leftList, ...rightList]
    return upperHullAns;
}

function LowerBridge(T, l) {
    if (T.length === 0) return []
    if (T.length === 1) return [T[0], T[0]]

    // array to store indices of candidate points
    var candidates = [];

    // base case when only two points are there
    if (T.length === 2) {
        var finalBridgePoints = [];
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
    var pairs = [];
    if (T.length % 2 !== 0) {
        candidates.push(T.length - 1);
    }

    // pushing pairs i,j such that pi.x <= pj.x
    for (var i = 0; i < T.length - 1; i += 2) {
        var pair = [];
        if (T[i].x <= T[i + 1].x) {
            pair.push(i);
            pair.push(i + 1);
        } else {
            pair.push(i + 1);
            pair.push(i);
        }
        pairs.push(pair);
    }

    // finding slope for each pair
    var slopes = [];
    for (var pair of pairs) {
        if (T[pair[0]].x == T[pair[1]].x) {
            if (T[pair[0]].y > T[pair[1]].y) {
                candidates.push(pair[0]);
            } else {
                candidates.push(pair[1]);
            }
        } else {
            var slope = ((T[pair[1]].y - T[pair[0]].y)) / ((T[pair[1]].x - T[pair[0]].x));
            slopes.push(slope);
        }
    }

    if (slopes.length === 0) {
        var finalCandidates = [];
        for (var candidateIndex of candidates) {
            finalCandidates.push(T[candidateIndex]);
        }
        return LowerBridge(finalCandidates, l);
    }

    // finding median slope
    var k = 0;
    k = kthSmallestElementSlope(slopes, 0, slopes.length - 1, slopes.length / 2);

    // dividing points into 3 sets according to their slopes
    var small = [];
    var equal = [];
    var large = [];

    const EPSILON = 1e-9;
    for (var pair of pairs) {
        var slope = 0;
        if (T[pair[0]].x !== T[pair[1]].x) {
            var slope = (T[pair[1]].y - T[pair[0]].y) / (T[pair[1]].x - T[pair[0]].x);
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
    var minSet = [];
    var minIntercept = Number.MAX_VALUE;
    for (var point of T) {
        if ((point.y - k * point.x) <= minIntercept) {
            minIntercept = point.y - k * point.x;
        }
    }

    for (var i = 0; i < T.length; i++) {
        var point = T[i];
        if ((point.y - k * point.x) == minIntercept) {
            var temp = [point, i];
            minSet.push(temp);
        }
    }

    // pk is point with min x-coordinate among points in max set
    // pm is point with max x-coordinate among points in max set
    var pk = new Point();
    var pm = new Point();
    pk.x = Number.MAX_VALUE;
    pm.x = Number.MIN_SAFE_INTEGER;
    var pkIndex, pmIndex;

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
        var ans = [];
        ans.push(T[pkIndex]);
        ans.push(T[pmIndex]);
        return ans;
    }

    // if h contains only points of P to left of or on L
    if (pm.x <= l) {
        for (var pair of large) {
            candidates.push(pair[1]);
        }
        for (var pair of equal) {
            candidates.push(pair[1]);
        }
        for (var pair of small) {
            candidates.push(pair[0]);
            candidates.push(pair[1]);
        }
    }

    // if h contains only points of P to the right of L
    if (pk.x > l) {
        for (var pair of small) {
            candidates.push(pair[0]);
        }
        for (var pair of equal) {
            candidates.push(pair[0]);
        }
        for (var pair of large) {
            candidates.push(pair[0]);
            candidates.push(pair[1]);
        }
    }

    var finalCandidates = [];
    for (var candidateIndex of candidates) {
        finalCandidates.push(T[candidateIndex]);
    }

    return LowerBridge(finalCandidates, l);
}

function LowerHull(pmin, pmax, T) {
    // finding median of these points to get line L in linear time
    var p = kthSmallestElement(T, 0, T.length - 1, T.length / 2);

    var T_left = [];
    var T_right = [];
    for (var point of T) {
        if (point.x < p.x) {
            T_left.push(point);
        } else {
            T_right.push(point);
        }
    }

    var pl, pr;
    // finding lower-bridge in linear time
    var upperAns = LowerBridge(T, p.x);
    pl = upperAns[0];
    pr = upperAns[1];

    var T_left = [];
    var T_right = [];

    T_left.push(pl);
    for (var point of T) {
        if (((point.y - pl.y) * (pmin.x - pl.x)) > (point.x - pl.x) * (pmin.y - pl.y)) {
            T_left.push(point);
        }
    }

    T_right.push(pr);
    for (var point of T) {
        if ((pmax.y - pr.y) * (point.x - pr.x) > (point.y - pr.y) * (pmax.x - pr.x)) {
            T_right.push(point);
        }
    }

    // recursive call on left and right halves
    var rightList = (T_right.length >= 2) ? LowerHull(pmax, pr, T_right) : [T_right[0]];
    var leftList = (T_left.length >= 2) ? LowerHull(pl, pmin, T_left) : [T_left[0]];

    var lowerHullAns = [...rightList, ...leftList]
    return lowerHullAns;
}

function KPS(points) {
    console.log(points);
    // converting points to point class

    var pu_min = new Point();
    var pu_max = new Point();
    var pl_min = new Point();
    var pl_max = new Point();

    pu_min.x = Number.MAX_VALUE;
    pu_min.y = Number.MIN_SAFE_INTEGER;
    pu_max.x = Number.MIN_SAFE_INTEGER;
    pu_max.y = Number.MIN_SAFE_INTEGER;
    pl_min.x = Number.MAX_VALUE;
    pl_min.y = Number.MAX_VALUE;
    pl_max.x = Number.MIN_SAFE_INTEGER;
    pl_max.y = Number.MAX_VALUE;

    // finding pu_min and pu_max
    for (var point of points) {
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

    var setT_UpperHull = [];
    setT_UpperHull.push(pu_min);
    setT_UpperHull.push(pu_max);

    for (var point of points) {
        if (point.x > pu_min.x && point.x < pu_max.x) {
            setT_UpperHull.push(point)
        }
    }

    var setT_LowerHull = [];
    setT_LowerHull.push(pl_min);
    setT_LowerHull.push(pl_max);

    for (var point of points) {
        if (point.x > pl_min.x && point.x < pl_max.x) {
            setT_LowerHull.push(point);
        }
    }

    // call upper-hull function
    var upperHullAns = UpperHull(pu_min, pu_max, setT_UpperHull);
    console.log("upper hull ans",upperHullAns);

    // call lower-hull function
    var lowerHullAns = LowerHull(pl_min, pl_max, setT_LowerHull);
    console.log("lower hull ans",lowerHullAns);

    // joining two lists in clockwise order
    var convexHull = [];
    for (var point of upperHullAns) convexHull.push(point);
    for (var point of lowerHullAns) convexHull.push(point);

    console.log("convex  hull points are",convexHull);

    var edges = [];
    for (var i = 0; i < convexHull.length - 1; i++) {
        var edge = [];
        edge.push(convexHull[i]);
        edge.push(convexHull[i + 1]);
        edges.push(edge);
    }

    console.log(edges);
    return edges;
}

// Define an array of points
// const temp = [
//     [0, 3],
//     [2, 2],
//     [1, 1],
//     [2, 1],
//     [3, 0],
//     [0, 0],
//     [3, 3]
// ];

// var points = [];
// for (var point of temp) {
//     points.push(new Point(point[0], point[1]));
// }
// var convexHull = KPS(points);
// console.log(convexHull);

module.exports = KPS;