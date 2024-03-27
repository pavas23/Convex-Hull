import React, { useState } from "react";
import "../css/Introduction.css";
import { Link } from "react-router-dom";

function KPSExplain() {
  const [slideIndex, setSlideIndex] = useState(0);

  const nextSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex + 1) % 4);
  };

  const prevSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex - 1 + 4) % 4);
  };

  return (
    <div className="intro">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
      />
      <h1 className="title2">Kirkpatrick-Seidel Algorithm</h1>
      <div className="buttonRow">
        <Link to="/Kirk-Patrik-Seidel-Visualization" class="changeBtn">
          Visualization
        </Link>
        <Link to="/Kirk-Patrik-Seidel-Time" class="changeBtn">
          Time Complexiety Analysis
        </Link>
        <Link to="/Kirk-Patrik-Seidel-Code-Documentation" class="changeBtn">
          Code Documentation
        </Link>
      </div>
      <div className="carousel">
        <div className="slideBtnContainer" style={{ alignItems: "flex-start" }}>
          <div
            className="changeBtn"
            onClick={prevSlide}
            style={{ width: "fit-content" }}
          >
            <i className="fas fa-chevron-left"></i>
          </div>
        </div>
        <div className="slide">
          {slideIndex === 0 && (
            <div className="introPara" style={{ fontSize: "23px" }}>
              The algorithm leverages the "marriage-before-conquest" principle.
              It works in stages: <br />
              <ul>
                <li>
                  <strong>Divide:</strong> It starts by finding a vertical line
                  that splits the set of points roughly in half.
                </li>
                <br />
                <li>
                  <strong>Identify the Bridge:</strong> Next, it locates the
                  edge of the convex hull (the "bridge") that intersects this
                  dividing line.
                </li>
                <br />
                <li>
                  <strong>Reduce the Problem:</strong> Points lying below this
                  "bridge" are no longer relevant for the convex hull and can be
                  discarded.
                </li>
                <br />
                <li>
                  <strong>Conquer Recursively:</strong> Finally, the algorithm
                  applies itself recursively to the two remaining sets of points
                  on either side of the dividing line. This process continues
                  until the convex hull for each sub-problem is found.
                </li>
              </ul>
            </div>
          )}
          {slideIndex === 1 && (
            <div
              style={{
                textAlign: "start",
                marginTop: "20px",
                fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
                fontSize: "large",
              }}
            >
              <div>KPS(points):</div>
              <div style={{ marginLeft: "20px", marginTop: "10px" }}>
                1. Let pumin and pumax be the points with the least and the
                largest x-coordinate. If points have same x-coordinate then take
                the point with largest y-coordinate
              </div>
              <div style={{ marginLeft: "20px", marginTop: "10px" }}>
                2. Find median of x coordinates so as to divide the whole set
                into two halves, points to the left on one side and points to
                the right on the other side.
              </div>
              <div style={{ marginLeft: "20px", marginTop: "10px" }}>
                3. Let T<sub>left</sub> be the set with points to the left and T
                <sub>right</sub> be the set of points to the right.
              </div>
              <div style={{ marginLeft: "20px", marginTop: "10px" }}>
                4. Let T be the set with pumin, pumax and all the points between
                pumin and pumax.
              </div>

              <div style={{ marginLeft: "20px", marginTop: "10px" }}>
                5. UH = <strong>UPPERHULL(pumin, pumax T)</strong>
              </div>
              <div style={{ marginLeft: "20px", marginTop: "10px" }}>
                6. Let plmin and plmax be the points with the least and the
                largest x-coordinate. If points have same x-coordinate then take
                the point with least y-coordinate
              </div>
              <div style={{ marginLeft: "20px", marginTop: "10px" }}>
                7. Use median of x coordinates to divide the whole set into two
                halves, points to the left on one side and points to the right
                on the other side.
              </div>
              <div style={{ marginLeft: "20px", marginTop: "10px" }}>
                8. Let T<sub>left</sub> be the set with points to the left and T
                <sub>right</sub> be the set of points to the right.
              </div>
              <div style={{ marginLeft: "20px", marginTop: "10px" }}>
                9. Let T be the set with plmin, plmax and all the points between
                plmin and plmax.
              </div>
              <div style={{ marginLeft: "20px", marginTop: "10px" }}>
                10. For each point in T, negate the y-coordinate to get its
                reflection about X-axis.
              </div>
              <div style={{ marginLeft: "20px", marginTop: "10px" }}>
                11. Reflect plmin and plmax about X-axis
              </div>
              <div style={{ marginLeft: "20px", marginTop: "10px" }}>
                12. LH = <strong>UPPERHULL(plmin, plmax T)</strong>
              </div>
              <div style={{ marginLeft: "20px", marginTop: "10px" }}>
                13. Reflect each point in LH about X-axis
              </div>
              <div style={{ marginLeft: "20px", marginTop: "10px" }}>
                14. Reverse list LH
              </div>
              <div style={{ marginLeft: "20px", marginTop: "10px" }}>
                15. return UH + LH
              </div>
            </div>
          )}
          {slideIndex === 2 && (
            <div
              style={{
                textAlign: "start",
                marginTop: "20px",
                fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
                fontSize: "large",
              }}
            >
              <div>UPPERHULL(pmin,pmax,T):</div>
              <div style={{ marginLeft: "20px", marginTop: "10px" }}>
                1. Find median of T, let it be some vertical line a.
              </div>
              <div style={{ marginLeft: "20px", marginTop: "10px" }}>
                2. (pl, pr) = <strong>UPPERBRIDGE(T, a)</strong>
              </div>
              <div style={{ marginLeft: "20px", marginTop: "10px" }}>
                3. Let S<sub>left</sub> be all the points in T with x-coordinate
                less than pl
              </div>
              <div style={{ marginLeft: "20px", marginTop: "10px" }}>
                4. Let S<sub>right</sub> be all the points in t with
                x-coordinate more than pr
              </div>
              <div style={{ marginLeft: "20px", marginTop: "10px" }}>
                5. if pumin = pl
              </div>
              <div style={{ marginLeft: "40px", marginTop: "10px" }}>
                5.1. leftList = pumin
              </div>
              <div style={{ marginLeft: "20px", marginTop: "10px" }}>else</div>
              <div style={{ marginLeft: "40px", marginTop: "10px" }}>
                5.2. leftList = UPPERHULL(pumin,pl,S<sub>left</sub>)
              </div>
              <div style={{ marginLeft: "20px", marginTop: "10px" }}>
                6. if pumax = pr
              </div>
              <div style={{ marginLeft: "40px", marginTop: "10px" }}>
                6.1. rightList = pumax
              </div>
              <div style={{ marginLeft: "20px", marginTop: "10px" }}>else</div>
              <div style={{ marginLeft: "40px", marginTop: "10px" }}>
                6.2. rightList = UPPERHULL(pumax,pr,S<sub>right</sub>)
              </div>
              <div style={{ marginLeft: "20px", marginTop: "10px" }}>
                7. return leftList + rightList
              </div>
            </div>
          )}
          {slideIndex === 3 && (
            <div
              style={{
                textAlign: "start",
                marginTop: "20px",
                fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
                fontSize: "large",
              }}
            >
              <div>UPPERBRIDGE(T,a):</div>
              <div style={{ marginLeft: "20px", marginTop: "10px" }}>
                1. In linear time, randomly pair the points of the input set P
                into n/2 distinct line segments. Call this set Q, and name each
                of the n/2 line segments q<sub>i</sub>. Name each endpoint of q
                <sub>i</sub> according to the following convention:{" "}
                <i>
                  q<sub>li</sub>.x ≤ q<sub>ri</sub>.x
                </i>{" "}
                <br />
                That is to say, endpoints are named in ascending order from left
                to right. If the size of n is odd, there may be one point which
                does not have a partner.
              </div>
              <div style={{ marginLeft: "20px", marginTop: "10px" }}>
                2. In linear time, determine the median slope m of all line
                segments in Q
              </div>
              <div style={{ marginLeft: "20px", marginTop: "10px" }}>
                3.Construct a line L whose equation is <i>y = mx + b</i>. This
                line is called the sweep line.
              </div>
              <div style={{ marginLeft: "20px", marginTop: "10px" }}>
                4. Using L, find a point pt such that L is a supporting line for
                P at pt. We will call the point pt the top point. If the slope m
                of the sweep line L is such that two or more points ∈ P lie on
                L, we choose pk to be the point with the smallest x-coordinate
                and pm to be the point with largest x-coordinate.
                <br />
                <br />
                To prune the set of bridge point candidates, do the following:
              </div>
              <div style={{ marginLeft: "40px", marginTop: "10px" }}>
                4.1. If pk.x ≤ a and pm.x {">"} a, then we return pk, pm as upper
                bridge points
              </div>
              <div style={{ marginLeft: "40px", marginTop: "10px" }}>
                4.2. If x-coordinate of pk ≥ M, for every line segment q
                <sub>i</sub> in Q whose slope is ≤ m, remove q<sub>ri</sub>
              </div>
              <div style={{ marginLeft: "40px", marginTop: "10px" }}>
                4.3. If x-coordinate of pm {"<"} M, for every line segment q
                <sub>i</sub> in Q whose slope is ≥ m, remove q<sub>li</sub>
              </div>
            </div>
          )}
        </div>
        <div className="slideContent"></div>
        <div className="slideBtnContainer" style={{ alignItems: "flex-end" }}>
          <div
            className="changeBtn"
            onClick={nextSlide}
            style={{ width: "fit-content" }}
          >
            <i className="fas fa-chevron-right"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KPSExplain;
