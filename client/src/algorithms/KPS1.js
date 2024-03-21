"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point;
}());
function UpperBridge(T, l) {
    if (T.length === 0)
        return [];
    if (T.length === 1)
        return [];
    var candidates = [];
    if (T.length === 2) {
        var finalBridgePoints = [];
        if (T[0].x < T[1].x) {
            finalBridgePoints.push(T[0]);
            finalBridgePoints.push(T[1]);
        }
        else {
            finalBridgePoints.push(T[1]);
            finalBridgePoints.push(T[0]);
        }
        return finalBridgePoints;
    }
    var pairs = [];
    if (T.length % 2 !== 0) {
        candidates.push(T[T.length - 1]);
    }
    for (var i = 0; i < T.length - 1; i += 2) {
        var pair = [];
        if (T[i].x <= T[i + 1].x) {
            pair.push(T[i]);
            pair.push(T[i + 1]);
        }
        else {
            pair.push(T[i + 1]);
            pair.push(T[i]);
        }
        pairs.push(pair);
    }
    var slopes = [];
    for (var _i = 0, pairs_1 = pairs; _i < pairs_1.length; _i++) {
        var pair = pairs_1[_i];
        if (pair[0].x == pair[1].x) {
            if (pair[0].y > pair[1].y) {
                candidates.push(pair[0]);
            }
            else {
                candidates.push(pair[1]);
            }
        }
        else {
            var slope = ((pair[1].y - pair[0].y) * 1.0) / ((pair[1].x - pair[0].x) * 1.0);
            slopes.push(slope);
        }
    }
    if (slopes.length === 0) {
        return UpperBridge(candidates, l);
    }
    var k = 0;
    slopes.sort(function (a, b) { return a - b; });
    k = slopes[Math.ceil(slopes.length / 2) - 1 + 0];
    // k = kthSmallestElementSlope(slopes, 0, slopes.length - 1, slopes.length / 2);
    var small = [];
    var equal = [];
    var large = [];
    var EPSILON = 1e-9;
    for (var _a = 0, pairs_2 = pairs; _a < pairs_2.length; _a++) {
        var pair = pairs_2[_a];
        if (pair[0].x !== pair[1].x) {
            var slope = (pair[1].y - pair[0].y) / (pair[1].x - pair[0].x);
            if (slope < k) {
                small.push(pair);
            }
            else if (Math.abs(slope - k) < EPSILON) {
                equal.push(pair);
            }
            else {
                large.push(pair);
            }
        }
    }
    var maxSet = [];
    var maxIntercept = Number.MIN_SAFE_INTEGER;
    for (var _b = 0, T_1 = T; _b < T_1.length; _b++) {
        var point = T_1[_b];
        if ((point.y - k * point.x) >= maxIntercept) {
            maxIntercept = point.y - k * point.x;
        }
    }
    for (var i = 0; i < T.length; i++) {
        var point = T[i];
        if (Math.abs((point.y - k * point.x) - maxIntercept) < EPSILON) {
            var temp_2 = [point, i];
            maxSet.push(temp_2);
        }
    }
    var pk = new Point(Number.MAX_VALUE, -1);
    var pm = new Point(Number.MIN_SAFE_INTEGER, -1);
    var pkIndex, pmIndex;
    pkIndex = 0;
    pmIndex = 0;
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
    if (pk.x <= l && pm.x > l) {
        var ans = [];
        ans.push(T[pkIndex]);
        ans.push(T[pmIndex]);
        return ans;
    }
    if (pm.x <= l) {
        for (var _c = 0, large_1 = large; _c < large_1.length; _c++) {
            var pair = large_1[_c];
            candidates.push(pair[1]);
        }
        for (var _d = 0, equal_1 = equal; _d < equal_1.length; _d++) {
            var pair = equal_1[_d];
            candidates.push(pair[1]);
        }
        for (var _e = 0, small_1 = small; _e < small_1.length; _e++) {
            var pair = small_1[_e];
            candidates.push(pair[0]);
            candidates.push(pair[1]);
        }
    }
    if (pk.x > l) {
        for (var _f = 0, small_2 = small; _f < small_2.length; _f++) {
            var pair = small_2[_f];
            candidates.push(pair[0]);
        }
        for (var _g = 0, equal_2 = equal; _g < equal_2.length; _g++) {
            var pair = equal_2[_g];
            candidates.push(pair[0]);
        }
        for (var _h = 0, large_2 = large; _h < large_2.length; _h++) {
            var pair = large_2[_h];
            candidates.push(pair[0]);
            candidates.push(pair[1]);
        }
    }
    return UpperBridge(candidates, l);
}
function UpperHull(pmin, pmax, T) {
    // finding median of these points to get line L in linear time
    var p;
    T.sort(function (a, b) { return a.x - b.x; });
    p = T[Math.ceil(T.length / 2) - 1 + 0];
    // var p = kthSmallestElement(T, 0, T.length - 1, T.length / 2);
    var T_left = [];
    var T_right = [];
    for (var _i = 0, T_2 = T; _i < T_2.length; _i++) {
        var point = T_2[_i];
        if (point.x < p.x) {
            T_left.push(point);
        }
        else {
            T_right.push(point);
        }
    }
    var pl, pr;
    // finding upper-bridge in linear time
    var upperAns = UpperBridge(T, p.x);
    if (upperAns.length !== 0) {
        pl = upperAns[0];
        pr = upperAns[1];
    }
    else {
        return T;
    }
    console.log("pl", pl);
    console.log("pr", pr);
    var T_left_new = [];
    var T_right_new = [];
    // left set of points
    T_left_new.push(pl);
    // right set of points
    T_right_new.push(pr);
    var test_distance;
    var sl;
    var intercept;
    // if slope is inf
    if (pmin.x === pl.x) {
        for (var _a = 0, T_left_1 = T_left; _a < T_left_1.length; _a++) {
            var point = T_left_1[_a];
            if (point.x < pl.x) {
                T_left_new.push(point);
            }
        }
    }
    else {
        sl = (pl.y - pmin.y) / (pl.x - pmin.x);
        intercept = pl.y - sl * pl.x;
        var test_x = pl.x - 1;
        var test_y = pl.y;
        test_distance = test_y - (sl * test_x) - intercept;
        console.log("td", test_distance);
        for (var _b = 0, T_left_2 = T_left; _b < T_left_2.length; _b++) {
            var point = T_left_2[_b];
            var newDistance = point.y - (sl * point.x) - intercept;
            console.log("point nd", point, newDistance);
            if (newDistance * test_distance > 0) {
                T_left_new.push(point);
            }
        }
    }
    // if slope is inf
    if (pmax.x === pr.x) {
        for (var _c = 0, T_right_1 = T_right; _c < T_right_1.length; _c++) {
            var point = T_right_1[_c];
            if (point.x > pr.x) {
                T_right_new.push(point);
            }
        }
    }
    else {
        sl = (pr.y - pmax.y) / (pr.x - pmax.x);
        intercept = pr.y - sl * pr.x;
        var test_x = pr.x + 1;
        var test_y = pr.y;
        test_distance = test_y - (sl * test_x) - intercept;
        console.log("upper td", test_distance);
        for (var _d = 0, T_right_2 = T_right; _d < T_right_2.length; _d++) {
            var point = T_right_2[_d];
            var newDistance = point.y - (sl * point.x) - intercept;
            console.log(" right upper point nd", point, newDistance);
            if (newDistance * test_distance > 0) {
                T_right_new.push(point);
            }
        }
    }
    console.log("upper hull_tleftnew", T_left_new);
    console.log("upper hull_trightnew", T_right_new);
    // recursive call on left and right halves
    var leftList = (T_left.length >= 2) ? UpperHull(pmin, pl, T_left_new) : [T_left_new[0]];
    var rightList = (T_right.length >= 2) ? UpperHull(pr, pmax, T_right_new) : [T_right_new[0]];
    console.log("left list is", leftList);
    console.log("right list is", rightList);
    var upperHullAns = __spreadArray(__spreadArray([], leftList, true), rightList, true);
    return upperHullAns;
}
function LowerBridge(T, l) {
    if (T.length === 0)
        return [];
    if (T.length === 1)
        return [];
    // array to store indices of candidate points
    var candidates = [];
    // base case when only two points are there
    if (T.length === 2) {
        var finalBridgePoints = [];
        if (T[0].x < T[1].x) {
            finalBridgePoints.push(T[0]);
            finalBridgePoints.push(T[1]);
        }
        else {
            finalBridgePoints.push(T[1]);
            finalBridgePoints.push(T[0]);
        }
        return finalBridgePoints;
    }
    // if number of points is odd
    var pairs = [];
    if (T.length % 2 !== 0) {
        candidates.push(T[T.length - 1]);
    }
    // pushing pairs i,j such that pi.x <= pj.x
    for (var i_1 = 0; i_1 < T.length - 1; i_1 += 2) {
        var pair_1 = [];
        if (T[i_1].x <= T[i_1 + 1].x) {
            pair_1.push(T[i_1]);
            pair_1.push(T[i_1 + 1]);
        }
        else {
            pair_1.push(T[i_1 + 1]);
            pair_1.push(T[i_1]);
        }
        pairs.push(pair_1);
    }
    // finding slope for each pair
    var slopes = [];
    for (var _i = 0, pairs_3 = pairs; _i < pairs_3.length; _i++) {
        var pair_2 = pairs_3[_i];
        if (pair_2[0].x == pair_2[1].x) {
            if (pair_2[0].y > pair_2[1].y) {
                candidates.push(pair_2[1]);
            }
            else {
                candidates.push(pair_2[0]);
            }
        }
        else {
            var slope = ((pair_2[1].y - pair_2[0].y) * 1.0) / ((pair_2[1].x - pair_2[0].x) * 1.0);
            slopes.push(slope);
        }
    }
    if (slopes.length === 0) {
        return LowerBridge(candidates, l);
    }
    // finding median slope
    var k = 0;
    slopes.sort(function (a, b) { return a - b; });
    k = slopes[Math.ceil(slopes.length / 2) - 1 + 0];
    // dividing points into 3 sets according to their slopes
    var small = [];
    var equal = [];
    var large = [];
    var EPSILON = 1e-9;
    for (var _a = 0, pairs_4 = pairs; _a < pairs_4.length; _a++) {
        var pair_3 = pairs_4[_a];
        if (pair_3[0].x !== pair_3[1].x) {
            var slope = (pair_3[1].y - pair_3[0].y) / (pair_3[1].x - pair_3[0].x);
            if (slope < k) {
                small.push(pair_3);
            }
            else if (Math.abs(slope - k) < EPSILON) {
                equal.push(pair_3);
            }
            else {
                large.push(pair_3);
            }
        }
    }
    // we will take points which have minimum y intercept with slope k
    var minSet = [];
    var minIntercept = Number.MAX_VALUE;
    for (var _b = 0, T_3 = T; _b < T_3.length; _b++) {
        var point = T_3[_b];
        if ((point.y - k * point.x) <= minIntercept) {
            minIntercept = point.y - k * point.x;
        }
    }
    for (var i = 0; i < T.length; i++) {
        var point = T[i];
        if (Math.abs((point.y - k * point.x) - minIntercept) < EPSILON) {
            var temp = [point, i];
            minSet.push(temp);
        }
    }
    // pk is point with min x-coordinate among points in max set
    // pm is point with max x-coordinate among points in max set
    var pk = { x: Number.MAX_VALUE, y: 0 };
    var pm = { x: Number.MIN_SAFE_INTEGER, y: 0 };
    var pkIndex, pmIndex;
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
        var ans = [];
        ans.push(T[pkIndex]);
        ans.push(T[pmIndex]);
        return ans;
    }
    // if h contains only points of P to left of or on L
    if (pm.x <= l) {
        for (var _c = 0, large_3 = large; _c < large_3.length; _c++) {
            var pair = large_3[_c];
            candidates.push(pair[0]);
            candidates.push(pair[1]);
        }
        for (var _d = 0, equal_3 = equal; _d < equal_3.length; _d++) {
            var pair = equal_3[_d];
            candidates.push(pair[1]);
        }
        for (var _e = 0, small_3 = small; _e < small_3.length; _e++) {
            var pair = small_3[_e];
            candidates.push(pair[1]);
        }
    }
    // if h contains only points of P to the right of L
    if (pk.x > l) {
        for (var _f = 0, small_4 = small; _f < small_4.length; _f++) {
            var pair = small_4[_f];
            candidates.push(pair[0]);
            candidates.push(pair[1]);
        }
        for (var _g = 0, equal_4 = equal; _g < equal_4.length; _g++) {
            var pair = equal_4[_g];
            candidates.push(pair[0]);
        }
        for (var _h = 0, large_4 = large; _h < large_4.length; _h++) {
            var pair = large_4[_h];
            candidates.push(pair[0]);
        }
    }
    return LowerBridge(candidates, l);
}
function LowerHull(pmin, pmax, T) {
    // finding median of these points to get line L in linear time
    var p;
    T.sort(function (a, b) { return a.x - b.x; });
    p = T[Math.ceil(T.length / 2) - 1 + 0];
    // var p = kthSmallestElement(T, 0, T.length - 1, T.length / 2);
    var T_left = [];
    var T_right = [];
    for (var _i = 0, T_4 = T; _i < T_4.length; _i++) {
        var point = T_4[_i];
        if (point.x < p.x) {
            T_left.push(point);
        }
        else {
            T_right.push(point);
        }
    }
    var pl, pr;
    // finding lower-bridge in linear time
    var lowerAns = LowerBridge(T, p.x);
    if (lowerAns.length !== 0) {
        pl = lowerAns[0];
        pr = lowerAns[1];
    }
    else {
        return T;
    }
    console.log("lower bridge", pl, pr);
    var T_left_new = [];
    var T_right_new = [];
    T_left_new.push(pl);
    T_right_new.push(pr);
    var test_distance;
    var sl;
    var intercept;
    // if slope is inf
    if (pmin.x === pl.x) {
        for (var _a = 0, T_left_3 = T_left; _a < T_left_3.length; _a++) {
            var point = T_left_3[_a];
            if (point.x < pl.x) {
                T_left_new.push(point);
            }
        }
    }
    else {
        sl = (pl.y - pmin.y) / (pl.x - pmin.x);
        intercept = pl.y - sl * pl.x;
        var test_x = pl.x - 1;
        var test_y = pl.y;
        test_distance = test_y - (sl * test_x) - intercept;
        console.log("lower td", test_distance);
        for (var _b = 0, T_left_4 = T_left; _b < T_left_4.length; _b++) {
            var point = T_left_4[_b];
            var newDistance = point.y - (sl * point.x) - intercept;
            console.log("lower point nd", point, newDistance);
            if (newDistance * test_distance > 0) {
                T_left_new.push(point);
            }
        }
    }
    // if slope is inf
    if (pmax.x === pr.x) {
        for (var _c = 0, T_right_3 = T_right; _c < T_right_3.length; _c++) {
            var point = T_right_3[_c];
            if (point.x > pr.x) {
                T_right_new.push(point);
            }
        }
    }
    else {
        sl = (pr.y - pmax.y) / (pr.x - pmax.x);
        intercept = pr.y - sl * pr.x;
        var test_x = pr.x + 1;
        var test_y = pr.y;
        test_distance = test_y - (sl * test_x) - intercept;
        console.log("lower td", test_distance);
        for (var _d = 0, T_right_4 = T_right; _d < T_right_4.length; _d++) {
            var point = T_right_4[_d];
            var newDistance = point.y - (sl * point.x) - intercept;
            console.log(" right lower point nd", point, newDistance);
            if (newDistance * test_distance > 0) {
                T_right_new.push(point);
            }
        }
    }
    console.log("lower hull_tleftnew", T_left_new);
    console.log("lower hull_trightnew", T_right_new);
    // recursive call on left and right halves
    var rightList = (T_right.length >= 2) ? LowerHull(pmax, pr, T_right_new) : [T_right_new[0]];
    var leftList = (T_left.length >= 2) ? LowerHull(pl, pmin, T_left_new) : [T_left_new[0]];
    var lowerHullAns = __spreadArray(__spreadArray([], rightList, true), leftList, true);
    return lowerHullAns;
}
function KPS(points) {
    console.log("point are", points);
    // Convert points to Point class
    var pu_min = new Point(Number.MAX_VALUE, Number.MIN_SAFE_INTEGER);
    var pu_max = new Point(Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);
    var pl_min = new Point(Number.MAX_VALUE, Number.MAX_VALUE);
    var pl_max = new Point(Number.MIN_SAFE_INTEGER, Number.MAX_VALUE);
    // Finding pu_min and pu_max
    for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
        var point = points_1[_i];
        if (point.x >= pu_max.x) {
            if (point.x == pu_max.x) {
                if (point.y > pu_max.y) {
                    pu_max = point;
                }
                else if (point.y < pl_max.y) {
                    pl_max = point;
                }
            }
            else {
                pu_max = point;
                pl_max = point;
            }
        }
        if (point.x <= pu_min.x) {
            if (point.x == pu_min.x) {
                if (point.y > pu_min.y) {
                    pu_min = point;
                }
                else if (point.y < pl_min.y) {
                    pl_min = point;
                }
            }
            else {
                pu_min = point;
                pl_min = point;
            }
        }
    }
    var setT_UpperHull = [];
    setT_UpperHull.push(pu_min);
    setT_UpperHull.push(pu_max);
    for (var _a = 0, points_2 = points; _a < points_2.length; _a++) {
        var point = points_2[_a];
        if (point.x > pu_min.x && point.x < pu_max.x) {
            setT_UpperHull.push(point);
        }
    }
    var setT_LowerHull = [];
    setT_LowerHull.push(pl_min);
    setT_LowerHull.push(pl_max);
    for (var _b = 0, points_3 = points; _b < points_3.length; _b++) {
        var point = points_3[_b];
        if (point.x > pl_min.x && point.x < pl_max.x) {
            setT_LowerHull.push(point);
        }
    }
    // Call upper-hull function
    var upperHullAns = UpperHull(pu_min, pu_max, setT_UpperHull);
    console.log("upper hull ans", upperHullAns);
    // // Call lower-hull function
    console.log(pl_min);
    console.log(pl_max);
    var lowerHullAns = LowerHull(pl_min, pl_max, setT_LowerHull);
    console.log("lower hull ans", lowerHullAns);
    // // Join two lists in clockwise order
    var convexHull = [];
    convexHull.push(pu_min);
    for (var _c = 0, upperHullAns_1 = upperHullAns; _c < upperHullAns_1.length; _c++) {
        var point = upperHullAns_1[_c];
        convexHull.push(point);
    }
    convexHull.push(pu_max);
    convexHull.push(pl_max);
    for (var _d = 0, lowerHullAns_1 = lowerHullAns; _d < lowerHullAns_1.length; _d++) {
        var point = lowerHullAns_1[_d];
        convexHull.push(point);
    }
    convexHull.push(pl_min);
    console.log("convex hull points are", convexHull);
    var edges = [];
    for (var i = 0; i < convexHull.length - 1; i++) {
        var edge = [convexHull[i], convexHull[i + 1]];
        edges.push(edge);
    }
    // console.log(edges);
    return edges;
}
// Define an array of points
var temp = [
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
var points = [];
for (var _i = 0, temp_1 = temp; _i < temp_1.length; _i++) {
    var point = temp_1[_i];
    points.push(new Point(point[0], point[1]));
}
var p;
points.sort(function (a, b) { return a.x - b.x; });
p = points[Math.ceil(points.length / 2) - 1 + 0];
console.log(p.x);
var convexHull = KPS(points);
// console.log(convexHull);
// export {KPS};
