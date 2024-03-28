//if edge is not included flag is 0
// if temporary changed flag is 1
// otherwise if included in final hull flag is 2
class Edge {
    constructor(p1, p2, flag) {
        this.p1 = p1;
        this.p2 = p2;
        this.flag = flag;
    }
}

// To find orientation of ordered triplet (p, q, r).
// 0 if p, q and r are collinear
// 1 if clockwise
// 2 if counterclockwise
function orientation(p, q, r) {
    const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
    if (val === 0) return 0; // collinear
    return (val > 0) ? 1 : 2; // clock or counterclockwise
}

// function to find convex hull for a given set of points
function computeConvexHull(points) {
    const n = points.length;
    // checking base case
    if (n < 2) return [];
    if (n === 2) {
        return [new Edge(points[0], points[1], 2)];
    }

    const edges = [];

    // Find the leftmost point
    let l = 0;
    for (let i = 1; i < n; i++) {
        if (points[i].x < points[l].x) {
            l = i;
        }
    }

    // Start from leftmost point, keep moving counterclockwise
    // until reach the start point again.
    let p = l, q;
    do {
        // If any point 'i' is more counterclock-wise than q, then update q.
        q = (p + 1) % n;
        for (let i = 0; i < n; i++) {
            const edge = new Edge(points[p], points[i], 0);
            if (orientation(points[p], points[i], points[q]) === 2) {
                q = i;
                edge.flag = 1;
            }
            edges.push(edge);
        }

        // As we are including the edge p-q and setting p as q for next iteration
        edges.push(new Edge(points[p], points[q], 2));
        p = q;
    } while (p !== l);

    return edges;
}

module.exports = computeConvexHull;