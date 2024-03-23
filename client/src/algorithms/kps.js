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
exports.KPS = void 0;
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point;
}());
var Pair = /** @class */ (function () {
    function Pair(pi, pj) {
        this.pi = pi;
        this.pj = pj;
    }
    return Pair;
}());
function Gcd(a, b) {
    if (a === 0) {
        return b;
    }
    else {
        return Gcd(b % a, a);
    }
}
function getMedian(arr) {
    arr.sort(function (a, b) { return a.x - b.x; });
    return arr[Math.ceil(arr.length / 2) - 1];
}
function upperBridge(T, a) {
    var candidates = new Set();
    console.log("T", T);
    if (T.length === 2) {
        T.sort(function (a, b) { return a.x - b.x; });
        return T;
    }
    var pairs = [];
    if (T.length % 2 == 0) {
        for (var i = 0; i < T.length - 1; i += 2) {
            var pair = [T[i], T[i + 1]];
            pair.sort(function (a, b) { return a.x - b.x; });
            var temp_2 = new Pair(pair[0], pair[1]);
            pairs.push(temp_2);
        }
    }
    else {
        candidates.add(T[0]);
        for (var i = 1; i < T.length - 1; i += 2) {
            var pair = [T[i], T[i + 1]];
            pair.sort(function (a, b) { return a.x - b.x; });
            var temp_3 = new Pair(pair[0], pair[1]);
            pairs.push(temp_3);
        }
    }
    console.log("pairs", pairs);
    var slopes = [];
    for (var _i = 0, pairs_1 = pairs; _i < pairs_1.length; _i++) {
        var pair = pairs_1[_i];
        if (pair.pi.x === pair.pj.x) {
            if (pair.pi.y > pair.pj.y) {
                candidates.add(pair.pi);
            }
            else {
                candidates.add(pair.pj);
            }
        }
        else {
            var dy = pair.pi.y - pair.pj.y;
            var dx = pair.pi.x - pair.pj.x;
            // var g = Gcd(Math.abs(dy), Math.abs(dx));
            if (dy * dx < 0) {
                dy = Math.abs(dy) * (-1);
                dx = Math.abs(dx);
            }
            else {
                dy = Math.abs(dy);
                dx = Math.abs(dx);
            }
            // dy = dy/g;
            // dx = dx/g;
            slopes.push([dy, dx]);
        }
    }
    slopes.sort(function (a, b) { return a[0] * b[1] - a[1] * b[0]; });
    console.log("slopes", slopes);
    var median_slope = [];
    if (slopes.length % 2 == 0) {
        var s1 = slopes[Math.ceil(slopes.length / 2) - 1];
        var s2 = slopes[Math.ceil(slopes.length / 2)];
        median_slope = [s1[0] * s2[1] + s1[1] * s2[0], 2 * s1[1] * s2[1]];
    }
    else {
        median_slope = slopes[Math.ceil(slopes.length / 2) - 1];
    }
    console.log('median slope', median_slope);
    var small = [];
    var equal = [];
    var large = [];
    for (var _a = 0, pairs_2 = pairs; _a < pairs_2.length; _a++) {
        var pair = pairs_2[_a];
        if (pair.pi.x === pair.pj.x) {
        }
        else {
            var dy = pair.pi.y - pair.pj.y;
            var dx = pair.pi.x - pair.pj.x;
            // var g = Gcd(Math.abs(dy), Math.abs(dx));
            if (dy * dx < 0) {
                dy = Math.abs(dy) * (-1);
                dx = Math.abs(dx);
            }
            else {
                dy = Math.abs(dy);
                dx = Math.abs(dx);
            }
            // dy = dy/g;
            // dx = dx/g;
            if (dy * median_slope[1] < dx * median_slope[0]) {
                small.push(pair);
            }
            else if (dy * median_slope[1] === dx * median_slope[0]) {
                equal.push(pair);
            }
            else if (dy * median_slope[1] > dx * median_slope[0]) {
                large.push(pair);
            }
        }
    }
    console.log("small", small, "large", large, "equal", equal);
    var maxSet = [];
    var maxIntercept = Number.MIN_SAFE_INTEGER;
    for (var _b = 0, T_1 = T; _b < T_1.length; _b++) {
        var point = T_1[_b];
        var intercept = point.y * median_slope[1] - point.x * median_slope[0];
        maxIntercept = Math.max(maxIntercept, intercept);
    }
    console.log("maxintercept", maxIntercept);
    for (var _c = 0, T_2 = T; _c < T_2.length; _c++) {
        var point = T_2[_c];
        var intercept = point.y * median_slope[1] - point.x * median_slope[0];
        if (intercept === maxIntercept) {
            maxSet.push(point);
        }
    }
    console.log("maxset", maxSet);
    var pk = maxSet[0];
    var pm = maxSet[0];
    for (var _d = 0, maxSet_1 = maxSet; _d < maxSet_1.length; _d++) {
        var point = maxSet_1[_d];
        if (point.x < pk.x) {
            pk = point;
        }
        if (point.x > pm.x) {
            pm = point;
        }
    }
    console.log("pk", pk, "pm", pm);
    if (pk.x <= a.x && pm.x > a.x) {
        return [pk, pm];
    }
    if (pm.x <= a.x) {
        for (var _e = 0, large_1 = large; _e < large_1.length; _e++) {
            var pair = large_1[_e];
            candidates.add(pair.pj);
        }
        for (var _f = 0, equal_1 = equal; _f < equal_1.length; _f++) {
            var pair = equal_1[_f];
            candidates.add(pair.pj);
        }
        for (var _g = 0, small_1 = small; _g < small_1.length; _g++) {
            var pair = small_1[_g];
            candidates.add(pair.pj);
            candidates.add(pair.pi);
        }
    }
    if (pk.x > a.x) {
        for (var _h = 0, small_2 = small; _h < small_2.length; _h++) {
            var pair = small_2[_h];
            candidates.add(pair.pi);
        }
        for (var _j = 0, equal_2 = equal; _j < equal_2.length; _j++) {
            var pair = equal_2[_j];
            candidates.add(pair.pi);
        }
        for (var _k = 0, large_2 = large; _k < large_2.length; _k++) {
            var pair = large_2[_k];
            candidates.add(pair.pj);
            candidates.add(pair.pi);
        }
    }
    var arr = [];
    candidates.forEach(function (value) {
        arr.push(value);
    });
    arr.sort(function (a, b) { return a.x - b.x; });
    return upperBridge(arr, a);
}
function UpperHull(pu_min, pu_max, T) {
    var a = getMedian(__spreadArray([], T, true));
    console.log("a", a);
    var T_left = [];
    var T_right = [];
    for (var _i = 0, T_3 = T; _i < T_3.length; _i++) {
        var point = T_3[_i];
        if (point.x <= a.x) {
            T_left.push(point);
        }
        if (point.x > a.x) {
            T_right.push(point);
        }
    }
    console.log("tleft", T_left, "tright", T_right);
    var bridge = upperBridge(T, a);
    var pl = bridge[0];
    var pr = bridge[1];
    var T_new_left = [];
    var T_new_right = [];
    for (var _a = 0, T_left_1 = T_left; _a < T_left_1.length; _a++) {
        var point = T_left_1[_a];
        if (point.x < pl.x) {
            T_new_left.push(point);
        }
    }
    for (var _b = 0, T_right_1 = T_right; _b < T_right_1.length; _b++) {
        var point = T_right_1[_b];
        if (point.x > pr.x) {
            T_new_right.push(point);
        }
    }
    T_new_left.push(pl);
    T_new_right.push(pr);
    console.log("pl", pl, "pr", pr);
    console.log("tnewleft", T_new_left, "tnewright", T_new_right);
    var leftList = (pu_min.x === pl.x && pu_min.y === pl.y) ? [pu_min] : UpperHull(pu_min, pl, T_new_left);
    var rightList = (pu_max.x === pr.x && pu_max.y === pr.y) ? [pu_max] : UpperHull(pr, pu_max, T_new_right);
    console.log("leftlist", leftList, "rightlist", rightList);
    var final = __spreadArray(__spreadArray([], leftList, true), rightList, true);
    return final;
}
function KPS(points) {
    var pu_min = new Point(Number.MAX_VALUE, Number.MIN_SAFE_INTEGER);
    var pu_max = new Point(Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);
    var pl_min = new Point(Number.MAX_VALUE, Number.MAX_VALUE);
    var pl_max = new Point(Number.MIN_SAFE_INTEGER, Number.MAX_VALUE);
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
    var upperHullAns = UpperHull(pu_min, pu_max, setT_UpperHull);
    console.log("upper hull ans", upperHullAns);
    // // Call lower-hull function
    console.log("pu-pl", pu_min, pu_max, pl_min, pl_max);
    // const lowerHullAns = LowerHull(pl_min, pl_max, setT_LowerHull);
    // console.log("lower hull ans", lowerHullAns);
    var convexHull = [];
    for (var _c = 0, upperHullAns_1 = upperHullAns; _c < upperHullAns_1.length; _c++) {
        var point = upperHullAns_1[_c];
        convexHull.push(point);
    }
    // for (let point of lowerHullAns) convexHull.push(point);
    var edges = [];
    for (var i = 0; i < convexHull.length - 1; i++) {
        var edge = [convexHull[i], convexHull[i + 1]];
        edges.push(edge);
    }
    console.log("edges", edges);
    return edges;
}
exports.KPS = KPS;
// var temp = [[20,44],
//     [-2,-20],
//     [12,28],
//     [10,32],
//     [46,48],
//     [30,-44],
//     [8,50]]
var temp = [[415.55555555555554, 40.3125],
    [597.7777777777777, 61.64583333333333],
    [692.8888888888888, 265.6458333333333],
    [641.3333333333333, 508.3125],
    [433.3333333333333, 508.3125],
    [271.55555555555554, 469.6458333333333],
    [211.1111111111111, 250.97916666666666],
    [244.88888888888889, 65.64583333333333],
];
// var temp  = [[300, 320.85416666666663],[366.66666666666663,119.52083333333333],[540,316.85416666666663]]
// {x: 415.55555555555554, y: 40.3125}
// {x: 597.7777777777777, y: 61.64583333333333}
// {x: 692.8888888888888, y: 265.6458333333333}
// {x: 641.3333333333333, y: 508.3125}
// {x: 433.3333333333333, y: 508.3125}
// {x: 271.55555555555554, y: 469.6458333333333}
// {x: 211.1111111111111, y: 250.97916666666666}
// {x: 244.88888888888889, y: 65.64583333333333}
var Pts = [];
for (var _i = 0, temp_1 = temp; _i < temp_1.length; _i++) {
    var t = temp_1[_i];
    Pts.push(new Point(t[0], t[1]));
}
Pts.sort(function (a, b) { return a.x - b.x; });
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
console.log(KPS(Pts));
