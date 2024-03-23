interface Point {
    x: number;
    y: number;
}

function flipped(points: Point[]): Point[] {
    return points.map(point => ({ x: -point.x, y: -point.y }));
}

function quickselect(ls: Point[], index: number, lo: number = 0, hi: number | null = null, depth: number = 0): Point {
    if (hi === null) {
        hi = ls.length - 1;
    }
    if (lo === hi) {
        return ls[lo];
    }
    const pivot = Math.floor(Math.random() * (hi - lo + 1)) + lo;
    [ls[lo], ls[pivot]] = [ls[pivot], ls[lo]];
    let cur = lo;
    for (let run = lo + 1; run <= hi; run++) {
        if (ls[run] < ls[lo]) {
            cur++;
            [ls[cur], ls[run]] = [ls[run], ls[cur]];
        }
    }
    [ls[cur], ls[lo]] = [ls[lo], ls[cur]];
    if (index < cur) {
        return quickselect(ls, index, lo, cur - 1, depth + 1);
    } else if (index > cur) {
        return quickselect(ls, index, cur + 1, hi, depth + 1);
    } else {
        return ls[cur];
    }
}

function bridge(points: Point[], vertical_line: number): Point[] {
    const candidates = new Set<Point>();
    if (points.length === 2) {
        var arr = [points[0], points[1]];
        arr.sort((a, b) => a.x - b.x);
        return arr;
    }
    const pairs: Point[][] = [];
    const modifySet = new Set(points);
    while (modifySet.size >= 2) {
        const pi = modifySet.values().next().value;
        modifySet.delete(pi);
        const pj = modifySet.values().next().value;
        modifySet.delete(pj);
        var arr :Point[] = [];
        arr = [pi, pj];
        arr.sort((a, b) => a.x - b.x);
        pairs.push(arr);
    }
    if (modifySet.size === 1) {
        candidates.add(modifySet.values().next().value);
    }
    const slopes: number[] = [];
    for (const [pi, pj] of pairs.slice()) {
        if (pi.x === pj.x) {
            pairs.splice(pairs.indexOf([pi, pj]), 1);
            candidates.add(pi.y > pj.y ? pi : pj);
        } else {
            slopes.push((pi.y - pj.y) / (pi.x - pj.x));
        }
    }
    const medianIndex = Math.floor(slopes.length / 2) - (slopes.length % 2 === 0 ? 1 : 0);
    slopes.sort((a,b) => a-b);
    // const medianSlope = quickselect(slopes, medianIndex);
    const medianSlope = slopes[Math.ceil(slopes.length/2)];
    const small: Set<Point[]> = new Set();
    const equal: Set<Point[]> = new Set();
    const large: Set<Point[]> = new Set();
    for (let i = 0; i < slopes.length; i++) {
        if (slopes[i] < medianSlope) {
            small.add(pairs[i]);
        } else if (slopes[i] === medianSlope) {
            equal.add(pairs[i]);
        } else {
            large.add(pairs[i]);
        }
    }
    const maxSlope = Math.max(...points.map(point => point.y - medianSlope * point.x));
    const maxSet = points.filter(point => point.y - medianSlope * point.x === maxSlope);
    const left = maxSet.reduce((min, p) => p.x < min.x ? p : min);
    const right = maxSet.reduce((max, p) => p.x > max.x ? p : max);
    if (left.x <= vertical_line && right.x > vertical_line) {
        return [left, right];
    }
    if (right.x <= vertical_line) {
        var temp:Point[][] = []
        large.forEach(val => {
            temp.push(val)
        })

        equal.forEach(val => {
            temp.push(val)
        })
        for (const pair of temp) {
            candidates.add(pair[0]);
            candidates.add(pair[1]);
        }
        for (var pair of small) {
            candidates.add(pair[0]);
        }
    }
    if (left.x > vertical_line) {
        var temp:Point[][] = []
        small.forEach(val => {
            temp.push(val)
        })

        equal.forEach(val => {
            temp.push(val)
        })
        for (const pair of temp) {
            candidates.add(pair[0]);
            candidates.add(pair[1]);
        }
        for (const pair of large) {
            candidates.add(pair[0]);
        }
    }
    return bridge([...candidates], vertical_line);
}

function connect(lower: Point, upper: Point, points: Point[]): Point[] {
    if (lower === upper) {
        return [lower];
    }
    const maxLeft = quickselect(points, Math.floor(points.length / 2) - 1);
    const minRight = quickselect(points, Math.floor(points.length / 2));
    const [left, right] = bridge(points, (maxLeft.x + minRight.x) / 2);
    const pointsLeft = new Set([left, ...points.filter(p => p.x < left.x)]);
    const pointsRight = new Set([right, ...points.filter(p => p.x > right.x)]);
    return [...connect(lower, left, [...pointsLeft]), ...connect(right, upper, [...pointsRight])];
}

function upperHull(points: Point[]): Point[] {
    let lower = points.reduce((min, p) => p.y < min.y ? p : min);
    lower = [...points.filter(point => point.x === lower.x)].reduce((max, p) => p.y > max.y ? p : max);
    let upper = points.reduce((max, p) => p.y > max.y ? p : max);
    points = [lower, upper, ...points.filter(p => lower.x < p.x && p.x < upper.x)];
    return connect(lower, upper, [...points]);
}

function convexHull(points: Point[]): Point[] {
    const upper = upperHull(points);
    const lower = flipped(upperHull(flipped(points)));
    if (upper[upper.length - 1] === lower[0]) {
        upper.pop();
    }
    if (upper[0] === lower[lower.length - 1]) {
        lower.pop();
    }
    return [...upper, ...lower];
}

// Example Usage:
const points: Point[] = [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 1 }, { x: 2, y: 0 }];
const convexHullPoints = convexHull(points);
console.log(convexHullPoints);
