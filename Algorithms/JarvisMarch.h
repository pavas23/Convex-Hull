#include <bits/stdc++.h>
using namespace std;

/**
 * x and y coordinates
*/
struct Point{
	int x, y;
};

/**
 * if edge is not included flag is 0
 * if temporary changed flag is 1
 * otherwise if included in final hull flag is 2
*/
struct Edge{
    Point p1, p2;
    int flag;
};

/**
 * To find orientation of ordered triplet (p, q, r).
 * The function returns following values
 * 0 --> p, q and r are collinear
 * 1 --> Clockwise
 * 2 --> Counterclockwise
*/
int orientation(Point p, Point q, Point r){
	int val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
	if (val == 0) return 0; // collinear
	return (val > 0)? 1: 2; // clock or counterclock wise
}

/**
 * function to find convex hull for a given set of points
*/
vector<Edge> convexHull(vector<Point>& points)
{	
    int n = points.size();
	// checking base case
    if(n < 2) return {};
    if(n == 2){
        vector<Edge> edges;
        Edge edge;
        edge.p1 = points[0];
        edge.p2 = points[1];
        edge.flag = true;
        edges.push_back(edge);
        return edges;
    }

    vector<Edge> edges;

	// Find the leftmost point
	int l = 0;
	for (int i = 1; i < n; i++)
		if (points[i].x < points[l].x)
			l = i;

	// Start from leftmost point, keep moving counterclockwise
	// until reach the start point again. This loop runs O(h)
	// times where h is number of points in result or output.
	int p = l, q;
	do{
		// Search for a point 'q' such that orientation(p, q,
		// x) is counterclockwise for all points 'x'. The idea
		// is to keep track of last visited most counterclock-
		// wise point in q. If any point 'i' is more counterclock-
		// wise than q, then update q.
		q = (p+1)%n;
		for (int i = 0; i < n; i++){
            Edge edge;
            edge.p1 = points[p];
            edge.p2 = points[i];
            edge.flag = 0;
            if (orientation(points[p], points[i], points[q]) == 2){
                q = i;
                edge.flag = 1;
            }
			edges.push_back(edge);
		}

        /**
        * As we are including the edge p-q and setting p as q for next iteration
        */
        Edge edge;
        edge.p1 = points[p];
        edge.p2 = points[q];
        edge.flag = 2;
        edges.push_back(edge);
		p = q;
	} while (p != l);

    return edges;
}