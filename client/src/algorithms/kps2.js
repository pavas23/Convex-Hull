var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
function flipped(points) {
    return points.map(function (point) { return ({ x: -point.x, y: -point.y }); });
}
function quickselect(ls, index, lo, hi, depth) {
    var _a, _b, _c;
    if (lo === void 0) { lo = 0; }
    if (hi === void 0) { hi = null; }
    if (depth === void 0) { depth = 0; }
    if (hi === null) {
        hi = ls.length - 1;
    }
    if (lo === hi) {
        return ls[lo];
    }
    var pivot = Math.floor(Math.random() * (hi - lo + 1)) + lo;
    _a = [ls[pivot], ls[lo]], ls[lo] = _a[0], ls[pivot] = _a[1];
    var cur = lo;
    for (var run = lo + 1; run <= hi; run++) {
        if (ls[run] < ls[lo]) {
            cur++;
            _b = [ls[run], ls[cur]], ls[cur] = _b[0], ls[run] = _b[1];
        }
    }
    _c = [ls[lo], ls[cur]], ls[cur] = _c[0], ls[lo] = _c[1];
    if (index < cur) {
        return quickselect(ls, index, lo, cur - 1, depth + 1);
    }
    else if (index > cur) {
        return quickselect(ls, index, cur + 1, hi, depth + 1);
    }
    else {
        return ls[cur];
    }
}
function bridge(points, vertical_line) {
    var candidates = new Set();
    if (points.length === 2) {
        var arr = [points[0], points[1]];
        arr.sort(function (a, b) { return a.x - b.x; });
        return arr;
    }
    var pairs = [];
    var modifySet = new Set(points);
    while (modifySet.size >= 2) {
        var pi = modifySet.values().next().value;
        modifySet.delete(pi);
        var pj = modifySet.values().next().value;
        modifySet.delete(pj);
        var arr = [];
        arr = [pi, pj];
        arr.sort(function (a, b) { return a.x - b.x; });
        pairs.push(arr);
    }
    if (modifySet.size === 1) {
        candidates.add(modifySet.values().next().value);
    }
    var slopes = [];
    for (var _i = 0, _a = pairs.slice(); _i < _a.length; _i++) {
        var _b = _a[_i], pi = _b[0], pj = _b[1];
        if (pi.x === pj.x) {
            pairs.splice(pairs.indexOf([pi, pj]), 1);
            candidates.add(pi.y > pj.y ? pi : pj);
        }
        else {
            slopes.push((pi.y - pj.y) / (pi.x - pj.x));
        }
    }
    var medianIndex = Math.floor(slopes.length / 2) - (slopes.length % 2 === 0 ? 1 : 0);
    slopes.sort(function (a, b) { return a - b; });
    // const medianSlope = quickselect(slopes, medianIndex);
    var medianSlope = slopes[Math.ceil(slopes.length / 2)];
    var small = new Set();
    var equal = new Set();
    var large = new Set();
    for (var i = 0; i < slopes.length; i++) {
        if (slopes[i] < medianSlope) {
            small.add(pairs[i]);
        }
        else if (slopes[i] === medianSlope) {
            equal.add(pairs[i]);
        }
        else {
            large.add(pairs[i]);
        }
    }
    var maxSlope = Math.max.apply(Math, points.map(function (point) { return point.y - medianSlope * point.x; }));
    var maxSet = points.filter(function (point) { return point.y - medianSlope * point.x === maxSlope; });
    var left = maxSet.reduce(function (min, p) { return p.x < min.x ? p : min; });
    var right = maxSet.reduce(function (max, p) { return p.x > max.x ? p : max; });
    if (left.x <= vertical_line && right.x > vertical_line) {
        return [left, right];
    }
    if (right.x <= vertical_line) {
        var temp = [];
        large.forEach(function (val) {
            temp.push(val);
        });
        equal.forEach(function (val) {
            temp.push(val);
        });
        for (var _c = 0, temp_1 = temp; _c < temp_1.length; _c++) {
            var pair_1 = temp_1[_c];
            candidates.add(pair_1[0]);
            candidates.add(pair_1[1]);
        }
        for (var _d = 0, small_1 = small; _d < small_1.length; _d++) {
            var pair = small_1[_d];
            candidates.add(pair[0]);
        }
    }
    if (left.x > vertical_line) {
        var temp = [];
        small.forEach(function (val) {
            temp.push(val);
        });
        equal.forEach(function (val) {
            temp.push(val);
        });
        for (var _e = 0, temp_2 = temp; _e < temp_2.length; _e++) {
            var pair_2 = temp_2[_e];
            candidates.add(pair_2[0]);
            candidates.add(pair_2[1]);
        }
        for (var _f = 0, large_1 = large; _f < large_1.length; _f++) {
            var pair_3 = large_1[_f];
            candidates.add(pair_3[0]);
        }
    }
    return bridge(__spreadArray([], candidates, true), vertical_line);
}
function connect(lower, upper, points) {
    if (lower === upper) {
        return [lower];
    }
    var maxLeft = quickselect(points, Math.floor(points.length / 2) - 1);
    var minRight = quickselect(points, Math.floor(points.length / 2));
    var _a = bridge(points, (maxLeft.x + minRight.x) / 2), left = _a[0], right = _a[1];
    var pointsLeft = new Set(__spreadArray([left], points.filter(function (p) { return p.x < left.x; }), true));
    var pointsRight = new Set(__spreadArray([right], points.filter(function (p) { return p.x > right.x; }), true));
    return __spreadArray(__spreadArray([], connect(lower, left, __spreadArray([], pointsLeft, true)), true), connect(right, upper, __spreadArray([], pointsRight, true)), true);
}
function upperHull(points) {
    var lower = points.reduce(function (min, p) { return p.y < min.y ? p : min; });
    lower = __spreadArray([], points.filter(function (point) { return point.x === lower.x; }), true).reduce(function (max, p) { return p.y > max.y ? p : max; });
    var upper = points.reduce(function (max, p) { return p.y > max.y ? p : max; });
    points = __spreadArray([lower, upper], points.filter(function (p) { return lower.x < p.x && p.x < upper.x; }), true);
    return connect(lower, upper, __spreadArray([], points, true));
}
function convexHull(points) {
    var upper = upperHull(points);
    var lower = flipped(upperHull(flipped(points)));
    if (upper[upper.length - 1] === lower[0]) {
        upper.pop();
    }
    if (upper[0] === lower[lower.length - 1]) {
        lower.pop();
    }
    return __spreadArray(__spreadArray([], upper, true), lower, true);
}
// Example Usage:
var points = [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 1 }, { x: 2, y: 0 }];
var convexHullPoints = convexHull(points);
console.log(convexHullPoints);
