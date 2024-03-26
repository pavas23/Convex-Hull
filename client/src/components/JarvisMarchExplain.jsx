import React, { useState } from "react";
import "../css/Introduction.css";
import { Link } from "react-router-dom";

function JarvisMarchExplain() {
  const [slideIndex, setSlideIndex] = useState(0);

  const nextSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex + 1) % 2);
  };

  const prevSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex - 1 + 2) % 2);
  };

  return (
    <div className="intro">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
      />
      <h1 className="title2">Jarvis March Algorithm</h1>
      <div className="buttonRow">
        <Link to="/Jarvis-March-Visualization" class="changeBtn">
          Visualization
        </Link>
        <Link to="/Jarvis-March-Time" class="changeBtn">
          Time Complexiety Analysis
        </Link>
        <Link to="/Jarvis-March-Code-Documentation" class="changeBtn">
          Code Documentation
        </Link>
      </div>
      <div className="carousel">
        
        <div className="slide">
          {slideIndex === 0 && (
            <div className="introPara" style={{textAlign:'center'}}>
              The Jarvis march algorithm, also known as the gift wrapping
              algorithm, finds the convex hull of a set of points in two
              dimensions.
              <br />
              <br />
              <strong style={{fontSize:'larger'}}>Algorithm:</strong>
              <div
                style={{
                  textAlign: "start",
                  marginTop: "20px",
                  fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
                  fontSize:'large'
                }}
              >
                <div>JarvisMarch(points):</div>
                <div style={{ marginLeft: "20px", marginTop: "10px" }}>
                  1. Find the Leftmost Point: Begin by identifying the point
                  with the minimum x-coordinate (furthest left) in your set.
                  This point will be the first corner of the convex hull.
                </div>
                <div style={{ marginLeft: "20px", marginTop: "10px" }}>
                  2. Wrap Around the Points: now iteratively over whole 'points'
                  set find the next corner of the hull until we reach the
                  starting point again, essentially "wrapping" around the set.
                </div>
                <div style={{ marginLeft: "20px", marginTop: "10px" }}>
                  3. Identify the Next Point:
                </div>
                <div style={{ marginLeft: "40px", marginTop: "10px" }}>
                  3.1. At each step, consider the current point on the hull
                  (let's call it p).
                </div>
                <div style={{ marginLeft: "40px", marginTop: "10px" }}>
                  3.2. For all remaining points (i), calculate the orientation
                  formed by p, another point on the current hull (initially the
                  leftmost point), and point i. (To do this we used the
                  determinant to get orientation.).There are two possibilities:
                </div>
                <div style={{ marginLeft: "60px", marginTop: "10px" }}>
                  3.2.1. Counter-clockwise: If the orientation is
                  counter-clockwise, then i is a potential candidate for the
                  next corner.
                </div>
                <div style={{ marginLeft: "60px", marginTop: "10px" }}>
                  3.2.1. Clockwise: If the orientation is clockwise, then i is
                  on the "inside" of the hull and can be ignored.
                </div>
                <div style={{ marginLeft: "40px", marginTop: "10px" }}>
                  3.3 Keep track of the point (q) that creates the largest
                  counter-clockwise orientation with p and the current hull
                  point.
                </div>
                <div style={{ marginLeft: "20px", marginTop: "10px" }}>
                  4. Update the Hull:After considering all remaining points, the
                  point q you identified becomes the next corner of the convex
                  hull. Add q to the hull points.
                </div>
                <div style={{ marginLeft: "20px", marginTop: "10px" }}>
                  5. Set the current point (p) to the newly added corner (q).
                </div>
                <div style={{ marginLeft: "20px", marginTop: "10px" }}>
                  6. Repeat steps 3 and 4 until you reach the very first point
                  you started with (the leftmost point). This means that you've
                  completed wrapping around the entire hull.
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="slideContent"></div>
        {/* <div className="slideBtnContainer" style={{ alignItems: "flex-end" }}>
          <div
            className="changeBtn"
            onClick={nextSlide}
            style={{ width: "fit-content" }}
          > 
            <i className="fas fa-chevron-right"></i>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default JarvisMarchExplain;
