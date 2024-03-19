import kthSmallestElement from "./MedianOfMedians";

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Edge {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
}

class Line {
    constructor(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
    }
}

// l=a is median line and T is point set
function UpperBridge(T,l){
    // array to store indices of candidate points
    var candidates = [];

    if(T.length === 2){
        if(T[0].x < T[1].x){
            candidates.push(0);
            candidates.push(1);
        }else{
            candidates.push(1);
            candidates.push(0);
        }
        return candidates;
    }

    var pairs = [];
    if(T.length%2 !== 0){
        candidates.push(T.length-1);
    }

    // pushing pairs i,j such that pi.x <= pj.x
    for(var i=0;i<T.length-1;i++){
        var pair = [];
        if(T[i].x <= T[i+1].x){
            pair.push(i);
            pair.push(i+1);
        }else{
            pair.push(i+1);
            pair.push(i);
        }
        pairs.push(pair);
    }

    // finding slope for each pair
    var slopes = [];
    for(var pair of pairs){
        if(T[pair[0]].x == T[pair[1]].x){
            if(T[pair[0]].y > T[pair[1]].y){
                candidates.push(pair[0]);
            }else{
                candidates.push(pair[1]);
            }
        }else{
            var slope = (T[pair[1].y]-T[pair[0]].y)/(T[pair[1]].x-T[pair[1]].x);
            slopes.push(slope);
        }
    }

    // finding median slope
    var k = 0;
    k = kthSmallestElement(slope,0,slope.length-1,slope.length/2);

    // dividing points into 3 sets according to their slopes
    var small = [];
    var equal = [];
    var large = [];

    for(var pair of pairs){
        var slope = 0;
        if(T[pair[0]].x !== T[pair[1]].x){
            var slope = (T[pair[1].y]-T[pair[0]].y)/(T[pair[1]].x-T[pair[1]].x);

            if(slope < k){
                small.push(pair);
            }else if(slope == k){
                equal.push(pair);
            }else{
                large.push(pair);
            }
        }
    }

    // we will take points which have maximum y intercept with slope k

    var maxSet = [];
    maxIntercept = Number.MIN_VALUE;
    for(var point of T){
        if((point.y-k*point.x) >= maxIntercept){
            maxIntercept = point.y-k*point.x;
        }
    }

    for(var point of T){
        if((point.y-k*point.x) == maxIntercept){
            maxSet.push(point);
        }
    }

    // pk is point with min x-coordinate among points in max set
    // pm is point with max x-coordinate among points in max set
    var pk = new Point();
    var pm = new Point();
    pk.x = Number.MAX_VALUE;
    pm.x = Number.MIN_VALUE;

    for(var point of maxSet){
        if(point.x > pm.x){
            pm = point;
        }
        if(point.x < pk.x){
            pk = point;
        }
    }

    // determine if h contains the bridge or not
    if(pk.x <= l && pm.x > l){
        return pk, pm;
    }

    // if h contains only points of P to left of or on L
    if(pm.x < l){
        for(var pair of large){
            candidates.push(pair[1]);
        }
        for(var pair of equal){
            candidates.push(pair[1]);
        }
        for(var pair of small){
            candidates.push(pair[0]);
            candidates.push(pair[1]);
        }
    }

    // if h contains only points of P to the right of L
    if(pk.x > l){
        for(var pair of small){
            candidates.push(pair[0]);
        }
        for(var pair of equal){
            candidates.push(pair[0]);
        }
        for(var pair of large){
            candidates.push(pair[0]);
            candidates.push(pair[1]);
        }
    }

    return UpperBridge(candidates,l);
}

function UpperHull(pmin,pmax,T){
    // finding median of these points to get line L in linear time
    var p = kthSmallestElement(T,0,T.length-1,T.length/2);
    
    var T_left, T_right;
    for(var point of T){
        if(point.x < p.x){
            T_left.push(point);
        }else{
            T_right.push(point);
        }
    }

    // finding upper-bridge in linear time
    pl, pr = UpperBridge(T,p.x);

    var T_left = [];
    var T_right = [];

    T_left.push(pl);
    for(var point of points){
        if((point.y-pmin.y)*(pl.x-pmin.x) > (point.x-pmin.x)*(pl.y-pmin.y)){
            T_left.push(point);
        }
    }

    T_right.push(pr);
    for(var point of points){
        if((point.y-pmax.y)*(pl.x-pmax.x) < (point.x-pmax.x)*(pl.y-pmax.y)){
            T_right.push(point);
        }
    }

    // recursive call on left and right halves
    var leftList = UpperHull(pmin,pl,T_left);
    var rightList = UpperHull(pr,pmax,T_right);

    var upperHullAns = []
    upperHullAns.push(leftList);
    upperHullAns.push(rightList);
    return upperHullAns;
}

function KrikPatrikSeidel(points){
    var pu_min = new Point();
    var pu_max = new Point();
    var pl_min = new Point();
    var pl_max = new Point();

    pu_min.x = Number.MAX_VALUE;
    pu_max.x = Number.MIN_VALUE;
    pl_min.x = Number.MAX_VALUE;
    pl_max.x = Number.MIN_VALUE;

    // finding pu_min and pu_max
    for(var point of points){
        if(point.x >= pu_max.x){
            if(point.x == pu_max.x){
                if(point.y > pu_max.y){
                    pu_max = point;
                }else if(point.y < pl_max.y){
                    pl_max = point;
                }
            }else{
                pu_max = point;
                pl_max = point;
            }
        }
        if(point.x < pu_min){
            if(point.x == pu_min.x){
                if(point.y > pu_min.y){
                    pu_min = point;
                }else if(point.y < pl_min.y){
                    pl_min = point;
                }
            }else{
                pu_min = point;
                pl_min = point;
            }
        }
    }

    var setT_UpperHull = [];
    setT_UpperHull.push(pu_min);
    setT_UpperHull.push(pu_max);

    for(var point of points){
        if(point.x > pu_min.x && point.x < pu_max.x){
            setT_UpperHull.push(point)
        }
    }

    // call upper-hull function
    UpperHull(pu_min,pu_max,setT_UpperHull);

    var setT_LowerHull = [];
    setT_LowerHull.push(pl_min);
    setT_LowerHull.push(pl_max);

    for(var point in points){
        if(point.x > pl_min.x && point.x < pl_max.x){
            setT_LowerHull.push(point);
        }
    }

    // call lower-hull function
    LowerHull(pl_min,pl_max,setT_LowerHull);


}

module.exports = KrikPatrikSeidel;