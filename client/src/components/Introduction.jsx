import React, { useState } from "react";
import "../css/Introduction.css";
import { Link } from "react-router-dom";

function Introduction() {
  const [slideIndex, setSlideIndex] = useState(0);

  const nextSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex + 1) % 3);
  };

  const prevSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex - 1 + 3) % 3);
  };

  return (
    <div className="intro">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
      />
      <h1 className="title2">What is Convex Hull?</h1>
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
            <div className="introPara" style={{ fontSize: "larger" }}>
              The convex hull of a set of points in space is essentially the
              smallest "shape" that wraps around all those points, with no
              corners bending inwards. Here's a breakdown:
              <div
                className="listContainer"
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  marginTop: "20px",
                }}
              >
                <span
                  style={{
                    marginRight: "5px",
                    fontWeight: "bolder",
                    flex: "0 0 12%",
                    // alignContent: "center",
                  }}
                >
                  Convex:
                </span>
                <span
                  style={{ paddingLeft: "10px", borderLeft: "1px solid black" }}
                >
                  A shape is convex if, for any two points within the shape, the
                  entire line segment connecting those points also lies entirely
                  inside the shape. Imagine a rubber band stretched taut around
                  the points - a convex shape would be the outline formed by the
                  rubber band.
                </span>
              </div>
              <div
                className="listContainer"
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  marginTop: "20px",
                }}
              >
                <span
                  style={{
                    marginRight: "5px",
                    fontWeight: "bolder",
                    flex: "0 0 12%",
                  }}
                >
                  Hull:
                </span>
                <span
                  style={{ paddingLeft: "10px", borderLeft: "1px solid black" }}
                >
                  The hull refers to the boundary or "shell" that encloses
                  something. In this case, it's the outline of the shape that
                  contains all the points.
                </span>
              </div>
              <div style={{ marginTop: "20px" }}>
                Here are a few analogies to understand Convex Hulls:
              </div>
              <div
                className="listContainer"
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  marginTop: "20px",
                }}
              >
                <span
                  style={{
                    marginRight: "5px",
                    fontWeight: "bolder",

                    fontSize: "20px",
                    flex: "0 0 12%",
                  }}
                >
                  Rubber Band Analogy
                </span>
                <span
                  style={{ paddingLeft: "10px", borderLeft: "1px solid black" }}
                >
                  Imagine you have a set of points like nails sticking out of a
                  flat surface. If you take a rubber band and stretch it around
                  all the nails, letting it go, it will form a tight shape
                  around the outermost points. This shape enclosed by the rubber
                  band is the convex hull.
                </span>
              </div>
              <div
                className="listContainer"
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  marginTop: "20px",
                }}
              >
                <span
                  style={{
                    marginRight: "5px",
                    fontWeight: "bolder",
                    fontSize: "20px",
                    flex: "0 0 12%",
                  }}
                >
                  Tree Fence Analogy
                </span>
                <span
                  style={{ paddingLeft: "10px", borderLeft: "1px solid black" }}
                >
                  Imagine having a forest with lots of trees, to make the
                  smallest fencing such that all the trees are either inside it
                  or on it would require such a boundary. The shape you get then
                  would be a convex hull
                </span>
              </div>
            </div>
          )}
          {slideIndex === 1 && (
            <div className="introPara" style={{ fontSize: "larger" }}>
              <div
                style={{
                  width: "100%",
                  textAlign: "center",
                  fontWeight: "bolder",
                  fontSize: "larger",
                }}
              >
                Formal Definitions of Convex Hull:
              </div>
              <div
                className="listContainer"
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  marginTop: "20px",
                }}
              >
                <span
                  style={{
                    marginRight: "5px",
                    fontWeight: "bolder",
                    flex: "0 0 15%",
                    // borderRight: "1px solid black",
                    // alignContent: "center",
                  }}
                >
                  Intersection of Half-Spaces
                </span>
                <span
                  style={{ paddingLeft: "10px", borderLeft: "1px solid black" }}
                >
                  Imagine a flat plane in 2D space. A half-space is simply one
                  side of that plane (including the plane itself). The convex
                  hull can be defined as the intersection of all half-spaces
                  that contain all the points in your set. In simpler terms,
                  it's the region where every point from your set falls on one
                  side (or directly on) a line that separates it from the
                  "outside."
                </span>
              </div>
              <div
                className="listContainer"
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  marginTop: "20px",
                }}
              >
                <span
                  style={{
                    marginRight: "5px",
                    fontWeight: "bolder",
                    flex: "0 0 15%",
                  }}
                >
                  Convex Combinations
                </span>
                <span
                  style={{ paddingLeft: "10px", borderLeft: "1px solid black" }}
                >
                  A convex combination of points is a new point created by
                  taking a weighted average of their positions. The weights must
                  all be non-negative numbers that add up to 1. The convex hull
                  can be defined as the set of all possible convex combinations
                  of points from your original set. Essentially, it's the
                  collection of points that can be created by "mixing" the
                  original points together in various proportions.
                </span>
              </div>
              <div
                style={{
                  width: "100%",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "larger",
                  marginTop: "20px",
                }}
              >
                Properties of Convex Hull:
              </div>
              <div
                className="listContainer"
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  marginTop: "20px",
                }}
              >
                <span
                  style={{
                    marginRight: "5px",
                    fontWeight: "bolder",
                    flex: "0 0 15%",
                  }}
                >
                  Unique:
                </span>
                <span
                  style={{ paddingLeft: "10px", borderLeft: "1px solid black" }}
                >
                  There exists only one convex hull for a given set of points.
                </span>
              </div>
              <div
                className="listContainer"
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  marginTop: "20px",
                }}
              >
                <span
                  style={{
                    marginRight: "5px",
                    fontWeight: "bolder",
                    flex: "0 0 15%",

                    // alignContent: "center",
                  }}
                >
                  Closed Shape:
                </span>
                <span
                  style={{ paddingLeft: "10px", borderLeft: "1px solid black" }}
                >
                  The convex hull itself is a closed shape, meaning it includes
                  all its boundary points and the interior region.
                </span>
              </div>
              <div
                className="listContainer"
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  marginTop: "20px",
                }}
              >
                <span
                  style={{
                    marginRight: "5px",
                    fontWeight: "bolder",
                    flex: "0 0 15%",

                    // alignContent: "center",
                  }}
                >
                  Extreme Points:
                </span>
                <span
                  style={{ paddingLeft: "10px", borderLeft: "1px solid black" }}
                >
                  The points that form the corners or vertices of the convex
                  hull are called extreme points. These are the points that
                  define the "shape" of the hull.
                </span>
              </div>
              <div
                style={{
                  width: "100%",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "larger",
                  marginTop: "20px",
                }}
              >
                Applications of Convex Hull:
              </div>
              <div style={{ marginTop: "20px" }}>
                Convex hulls are a fundamental concept in computational geometry
                and have numerous applications across various fields
              </div>
              <div
                className="listContainer"
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  marginTop: "20px",
                }}
              >
                <span
                  style={{
                    marginRight: "5px",
                    fontWeight: "bolder",
                    flex: "0 0 15%",
                    // borderRight: "1px solid black",
                    // alignContent: "center",
                  }}
                >
                  Computer Graphics
                </span>
                <span
                  style={{ paddingLeft: "10px", borderLeft: "1px solid black" }}
                >
                  Used for collision detection between objects, shape analysis,
                  and image segmentation.
                </span>
              </div>
              <div
                className="listContainer"
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  marginTop: "20px",
                }}
              >
                <span
                  style={{
                    marginRight: "5px",
                    fontWeight: "bolder",
                    flex: "0 0 15%",
                    // borderRight: "1px solid black",
                    // alignContent: "center",
                  }}
                >
                  Robotics
                </span>
                <span
                  style={{ paddingLeft: "10px", borderLeft: "1px solid black" }}
                >
                  Helps robots navigate by defining the boundaries of obstacles
                  or their workspace.
                </span>
              </div>
              <div
                className="listContainer"
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  marginTop: "20px",
                }}
              >
                <span
                  style={{
                    marginRight: "5px",
                    fontWeight: "bolder",
                    flex: "0 0 15%",
                    // borderRight: "1px solid black",
                    // alignContent: "center",
                  }}
                >
                  Data Visualization
                </span>
                <span
                  style={{ paddingLeft: "10px", borderLeft: "1px solid black" }}
                >
                  Useful for visualizing the distribution of data points in a
                  scatter plot, highlighting the overall shape of the data.
                </span>
              </div>
              <div
                className="listContainer"
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  marginTop: "20px",
                }}
              >
                <span
                  style={{
                    marginRight: "5px",
                    fontWeight: "bolder",
                    flex: "0 0 15%",
                    // borderRight: "1px solid black",
                    // alignContent: "center",
                  }}
                >
                  Pattern Recognition
                </span>
                <span
                  style={{ paddingLeft: "10px", borderLeft: "1px solid black" }}
                >
                  Can be used to identify and classify objects based on their
                  overall shape.
                </span>
              </div>
            </div>
          )}
          {slideIndex === 2 && (
            <div className="introPara">
              <div className="button-container">
                <h3
                  className="introPara"
                  style={{ fontSize: "30px", textAlign: "center" }}
                >
                  Algorithms to Compute Convex Hull:
                </h3>
                <Link to="/Jarvis-March" class="changeBtn">
                  Jarvis March Algorithm
                </Link>
                <Link to="/Kirk-Patrick-Seidel" class="changeBtn">
                  Kirkpatrick-Seidel Algorithm
                </Link>
                <h3
                  className="introPara"
                  style={{ fontSize: "30px", textAlign: "center" }}
                >
                  Comparative Analysis of Algorithms:
                </h3>
                <Link to="/Comparative-Analysis" class="changeBtn">
                  Compare Execution Time
                </Link>
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

export default Introduction;