import React, { useState } from "react";
import "../css/Introduction.css";
import { Link } from "react-router-dom";
import kps_code_1_1 from "../images/kps_code_1_1.png";
import kps_code_1_2 from "../images/kps_code_1_2.jpg";
import kps_code_2_1 from "../images/kps_code_2_1.jpg";
import kps_code_2_2 from "../images/kps_code_2_2.jpg";
import kps_code_3_1 from "../images/kps_code_3_1.jpg";
import kps_code_3_2 from "../images/kps_code_3_2.jpg";
import kps_code_4_1 from "../images/kps_code_4_1.jpg";
import kps_code_4_2 from "../images/kps_code_4_2.jpg";
import kps_code_4_3 from "../images/kps_code_4_3.jpg";
import kps_code_4_4 from "../images/kps_code_4_4.jpg";

function KPSCodeDocumentation() {
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
      <h1 className="title2" style={{ fontSize: "50px" }}>
        Code Documentation: K.P.S Algorithm
      </h1>
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
            <div className="introPara">
              <div
                className="imgContainerOuter"
                style={{ alignItems: "flex-start" }}
              >
                <div className="imgContainerInner">
                  <img
                    src={kps_code_1_1}
                    alt="JM1"
                    style={{ maxWidth: "100%" }}
                  />
                  <img
                    src={kps_code_1_2}
                    alt="JM1"
                    style={{ maxWidth: "100%" }}
                  />
                </div>
                <div className="textContainer">
                  <p style={{ marginTop: "0" }}>
                    <p>Purpose:
                      <ul>
                        <li>Calculates the convex hull of a set of points in the plane using the Kirkpatrick-Seidel algorithm.</li>
                        <li>The convex hull is the smallest convex polygon that encloses all the points.</li>
                      </ul>
                    </p>
                    <p>
                      Inputs:
                      <ul>
                        <li>points: An array of Point objects representing the set of points for which to compute the convex hull.</li>
                      </ul>
                    </p>
                     <p>
                      Outputs:
                        <ul>
                          <li>
                          An array of line segments represented as arrays of two Point objects, defining the edges of the convex hull in a counter-clockwise order.
                          </li>
                        </ul>
                    </p>
                    <p>
                      Algorithm:
                      <ul>1. Find Extremes:
                      <ul>
                        <li>
                        Initialize two points, pumin and pumax, to represent the leftmost and topmost point and the rightmost and topmost point, respectively.
                        </li>
                        <li>
                          Iterate through the points, updating pumin and pumax if a point has a more extreme x or y coordinate.

                        </li>
                      </ul>
                      </ul>
                      <ul>2. Select remaining points:
                        <ul>
                        <li>
                        Create a new array T containing pumin and pumax.
                        </li>
                        <li>
                        Iterate through the original points again, adding any point that lies strictly between pumin and pumax (excluding the extremes) to T.
                        </li>
                      </ul>
                      </ul>
                      <ul>3. Compute Upper Hull:

                        <ul>
                        <li>
                        Call the upperHull function on T to compute the upper hull of the points.

                        </li>
                      </ul>
                      </ul>
                      <ul>4. Transform and compute Lower Hull:


                        <ul>
                        <li>
                        Create a new array lowerPts by mirroring each point in points across the x-axis (negating the y-coordinate).

                        </li>
                        <li>
                        Call a function lowerHull to compute the hull of the mirrored points.
                        </li>
                        <li>
                        Reverse the order of the points in the lower hull.

                        </li>
                      </ul>
                      </ul>
                      <ul>5. Combine hulls:
                        <ul>
                        <li>
                        Call the upperHull function on T to compute the upper hull of the points.

                        </li>
                      </ul>
                      </ul>
                      <ul>6. Extract Edges:
                        <ul>
                        <li>
                        Concatenate the upper hull (UH) and the reversed lower hull to form a single list.
                        </li>
                      </ul>
                      </ul>
                        
                    </p>
                  </p>
                </div>
              </div>
            </div>
          )}
          {slideIndex === 1 && (
            <div className="introPara">
              <div
                className="imgContainerOuter"
                style={{ alignItems: "flex-start" }}
              >
                <div className="imgContainerInner">
                  <img
                    src={kps_code_2_1}
                    alt="JM1"
                    style={{ maxWidth: "100%" }}
                  />
                  <img
                    src={kps_code_2_2}
                    alt="JM1"
                    style={{ maxWidth: "100%" }}
                  />
                </div>
                <div className="textContainer">
                  <p style={{ marginTop: "0" }}>
                  <p>Purpose:
                      <ul>
                        <li>This function calculates the lower hull of a set of points in the plane, but it does so indirectly.</li>
                      </ul>
                    </p>
                    <p>
                      Inputs:
                      <ul>
                        <li>points: An array of Point objects representing the set of points.</li>
                      </ul>
                    </p>
                     <p>
                      Outputs:
                        <ul>
                          <li>
                          An array of Point objects representing the points on the upper hull of the mirrored point set (points reflected across the x-axis). Note: This is not directly the lower hull of the original point set.
                          </li>
                        </ul>
                    </p>
                    <p>
                      Algorithm:
                      <ul>1. Find Extremes:
                      <ul>
                        <li>
                        The function performs the same steps as the initial part of upperHull to find the leftmost/bottommost (pumin) and rightmost/topmost (pumax) points in the input set.
                      
                        </li>
                      </ul>
                      </ul>
                      <ul>2. Select remaining points
                        <ul>
                        <li>
                        Similar to upperHull, it creates a new array T containing the extremes and then adds any point strictly between them (excluding the extremes) to T.
                        </li>
                      </ul>
                      </ul>
                      <ul>3. Compute Upper Hull of Mirrored Points:
                        <ul>
                        <li>
                        It calls the upperHull function (assumed to be defined elsewhere) on T to compute the upper hull, but there's a twist.
                        </li>
                        <li>
                        Instead of returning the upper hull directly, it iterates through the points in the upper hull and creates a new array LH by mirroring each point across the x-axis (negating the y-coordinate).

                        </li>
                        <li>
                        In essence, it computes the upper hull of the points reflected across the x-axis.
                        </li>
                      </ul>
                      </ul>
                      <p>Important Note:
                        <ul>
                          <li>
                            The function calculates the upper hull of the mirrored point set, not the lower hull of the original set.
                          </li>
                        </ul>
                      </p>
                        
                    </p>
                  </p>
                </div>
              </div>
            </div>
          )}
          {slideIndex === 2 && (
            <div className="introPara">
              <div
                className="imgContainerOuter"
                style={{ alignItems: "flex-start" }}
              >
                <div className="imgContainerInner">
                  <img
                    src={kps_code_3_1}
                    alt="JM1"
                    style={{ maxWidth: "100%" }}
                  />
                  <img
                    src={kps_code_3_2}
                    alt="JM1"
                    style={{ maxWidth: "100%" }}
                  />
                </div>
                <div className="textContainer">
                  <p style={{ marginTop: "0" }}>
                    <p>Purpose:
                      <ul>
                        <li>
                        Calculates the upper hull of a set of points in the plane.
                        </li>
                        <li>
                        The upper hull is the set of points that form the upper boundary of the convex hull of the points.

                        </li>
                      </ul>
                    </p>
                    <p>
                      Inputs:
                      <ul>
                        <li>pumin: A Point object representing the upper leftmost point of the set of points.</li>
                        <li>pumax: A Point object representing the upper rightmost point of the set of points.</li>
                        <li>T: An array of Point objects representing the set of points for which to compute the upper hull.</li>
                      </ul>
                    </p>
                    <p>
                      Output:
                      <ul>
                        <li>An array of Point objects representing the points on the upper hull, in order from left to right.</li>
                      </ul>
                    </p>

                    <p>
                      Algorithm:
                      <ul>1. Base Case:
                      <ul>
                        <li>
                        If pumin and pumax are the same point, return an array containing only that point.
                      
                        </li>
                      </ul>
                      </ul>
                      <ul>2. Find a "Bridge" Point:
                        <ul>
                        <li>
                        Find the median point a in the array T based on its x-coordinate.
                        </li>
                        <li>
                        Find the "bridge" of the upper hull, which is a pair of points that forms a line segment that crosses the median vertical line through a.
                        </li>
                      </ul>
                      </ul>
                      <ul>3. Divide and Conquer:
                        <ul>
                        <li>
                        Divide the set of points T into two subsets, T_left and T_right, based on their position relative to the bridge and the median.
                        </li>
                        
                        <li>
                        Recursively call upperHull on T_left and T_right to compute the upper hulls of the respective subsets.
                        </li>
                      </ul>
                      </ul>
                      <ul>4. Merge Hulls:
                        <ul>
                        <li>
                        Concatenate the results of the recursive calls, ensuring the points are in order from left to right.
                        </li>
                        <li>
                        Return the resulting array.
                        </li>
                      </ul>
                      </ul>
                      </p>
                  </p>
                </div>
              </div>
            </div>
          )}
          {slideIndex === 3 && (
            <div className="introPara">
              <div
                className="imgContainerOuter"
                style={{ alignItems: "flex-start" }}
              >
                <div className="imgContainerInner">
                  <img
                    src={kps_code_4_1}
                    alt="JM1"
                    style={{ maxWidth: "100%" }}
                  />
                  <img
                    src={kps_code_4_2}
                    alt="JM1"
                    style={{ maxWidth: "100%" }}
                  />
                  <img
                    src={kps_code_4_3}
                    alt="JM1"
                    style={{ maxWidth: "100%" }}
                  />
                  <img
                    src={kps_code_4_4}
                    alt="JM1"
                    style={{ maxWidth: "100%" }}
                  />
                </div>
                <div className="textContainer">
                  <p style={{ marginTop: "0" }}>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis debitis minus nisi tenetur. Sed excepturi placeat rerum, iure expedita reiciendis odit amet eveniet incidunt, cum libero atque vitae dicta cupiditate!
                  </p>
                </div>
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

export default KPSCodeDocumentation;
