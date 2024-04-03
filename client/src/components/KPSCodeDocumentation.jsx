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
import mom_code_1 from "../images/mom_code_1.jpg";
import mom_code_2 from "../images/mom_code_2.jpg";
import mom_code_3 from "../images/mom_code_3.jpg";
import mom_code_4 from "../images/mom_code_4.jpg";
import mom_code_5 from "../images/mom_code_5.jpg";

function KPSCodeDocumentation() {
  const [slideIndex, setSlideIndex] = useState(0);

  const nextSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex + 1) % 9);
  };

  const prevSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex - 1 + 4) % 9);
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
                    <div>
                      <h2 style={{ marginTop: "0px" }}>
                        Function Name: KirkPatrickSeidelAlgorithm
                      </h2>
                    </div>

                    <div>
                      <h3>Purpose:</h3>
                      <div>
                        <p>
                          Calculates the convex hull of a set of points in the
                          plane using the Kirkpatrick-Seidel algorithm.
                        </p>
                        <p>
                          The convex hull is the smallest convex polygon that
                          encloses all the points.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3>Inputs:</h3>
                      <div>
                        <p>
                          <strong>points:</strong> An array of Point objects
                          representing the set of points for which we have to
                          compute the convex hull.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3>Output:</h3>
                      <div>
                        <p>
                          An array of line segments represented as arrays of two
                          Point objects, defining the edges of the convex hull.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3>Algorithm:</h3>
                      <ol>
                        <li>
                          <div>
                            <strong>Find extremes:</strong>
                            <ul>
                              <li>
                                Initialize two points, pumin and pumax, to
                                represent the leftmost and topmost point and the
                                rightmost and topmost point, respectively.
                              </li>
                              <li>
                                Iterate through the points, updating pumin and
                                pumax if a point has a more extreme x or y
                                coordinate.
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li>
                          <div>
                            <strong>Select remaining points:</strong>
                            <ul>
                              <li>
                                Create a new array T containing pumin and pumax.
                              </li>
                              <li>
                                Iterate through the original points again,
                                adding any point that lies strictly between
                                pumin and pumax (excluding the extremes) to T.
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li>
                          <div>
                            <strong>Compute Upper Hull:</strong>
                            <ul>
                              <li>
                                Call the upperHull function on T to compute the
                                upper hull of the points.
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li>
                          <div>
                            <strong>Transform and compute Lower Hull:</strong>
                            <ul>
                              <li>
                                Create a new array lowerPts by mirroring each
                                point in points across the x-axis (negating the
                                y-coordinate).
                              </li>
                              <li>
                                Call a function lowerHull to compute the hull of
                                the mirrored points.
                              </li>
                              <li>
                                Reverse the order of the points in the lower
                                hull.
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li>
                          <div>
                            <strong>Combine hulls:</strong>
                            <ul>
                              <li>
                                Concatenate the upper hull (UH) and the reversed
                                lower hull to form a single list.
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li>
                          <div>
                            <strong>Extract edges:</strong>
                            <ul>
                              <li>
                                Iterate through the combined list, creating line
                                segments (edges) between consecutive points and
                                adding them to an edges array.
                              </li>
                            </ul>
                          </div>
                        </li>
                      </ol>
                    </div>

                    <div>
                      <h3>Dependencies:</h3>
                      <div>
                        <ul>
                          <li>The Point class.</li>
                          <li>
                            The upperHull function, which computes the upper
                            hull of a set of points.
                          </li>
                          <li>
                            The lowerHull function, which computes the hull of a
                            set of points (the mirrored version of upperHull).
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h3>Output Notes:</h3>
                      <div>
                        <p>
                          The returned array represents the edges of the convex
                          hull.
                        </p>
                      </div>
                    </div>
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
                    <div>
                      <h2 style={{ marginTop: "0px" }}>
                        Function Name: lowerHull
                      </h2>
                    </div>

                    <div>
                      <h3>Purpose:</h3>
                      <div>
                        <p>
                          This function calculates the lower hull of a set of
                          points in the plane, but it does so indirectly.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3>Input:</h3>
                      <div>
                        <p>
                          <strong>points:</strong> An array of Point objects
                          representing the set of points.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3>Output:</h3>
                      <div>
                        <p>
                          An array of Point objects representing the points on
                          the upper hull of the mirrored point set (points
                          reflected across the x-axis). Note: This is not
                          directly the lower hull of the original point set.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3>Explanation:</h3>
                      <ol>
                        <li>
                          <div>
                            <strong>Find extremes (same as upperHull):</strong>
                            <ul>
                              <li>
                                The function performs the same steps as the
                                initial part of upperHull to find the
                                leftmost/topmost (pumin) and rightmost/topmost
                                (pumax) points in the input set.
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li>
                          <div>
                            <strong>
                              Select remaining points (same as upperHull):
                            </strong>
                            <ul>
                              <li>
                                Similar to upperHull, it creates a new array T
                                containing the extremes and then adds any point
                                strictly between them (excluding the extremes)
                                to T.
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li>
                          <div>
                            <strong>
                              Compute Upper Hull of Mirrored Points:
                            </strong>
                            <ul>
                              <li>
                                It calls the upperHull function on T to compute
                                the upper hull, but there's a twist.
                              </li>
                              <li>
                                Instead of returning the upper hull directly, it
                                iterates through the points in the upper hull
                                and creates a new array LH by mirroring each
                                point across the x-axis (negating the
                                y-coordinate).
                              </li>
                              <li>
                                In essence, it computes the upper hull of the
                                points reflected across the x-axis.
                              </li>
                            </ul>
                          </div>
                        </li>
                      </ol>
                    </div>

                    <div>
                      <h3>Important Note:</h3>
                      <div>
                        <p>
                          The function calculates the upper hull of the mirrored
                          point set, not the lower hull of the original set.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3>Dependencies:</h3>
                      <div>
                        <ul>
                          <li>The Point class.</li>
                          <li>
                            The upperHull function, which computes the upper
                            hull of a set of points.
                          </li>
                        </ul>
                      </div>
                    </div>
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
                    <div>
                      <h2 style={{ marginTop: "0px" }}>
                        Function Name: upperHull
                      </h2>
                    </div>

                    <div>
                      <h3>Purpose:</h3>
                      <ul>
                        <li>
                          Calculates the upper hull of a set of points in the
                          plane.
                        </li>
                        <li>
                          The upper hull is the set of points that form the
                          upper boundary of the convex hull of the points.
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3>Inputs:</h3>
                      <ul>
                        <li>
                          <strong>pumin:</strong> A Point object representing
                          the upper leftmost point of the set of points.
                        </li>
                        <li>
                          <strong>pumax:</strong> A Point object representing
                          the upper rightmost point of the set of points.
                        </li>
                        <li>
                          <strong>T:</strong> An array of Point objects
                          representing the set of points for which to compute
                          the upper hull.
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3>Output:</h3>
                      <ul>
                        <li>
                          An array of Point objects representing the points on
                          the upper hull, in order from left to right.
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3>Key Steps:</h3>
                      <ol>
                        <li>
                          <strong>Base Case:</strong>
                          <ul>
                            <li>
                              If pumin and pumax are the same point, return an
                              array containing only that point.
                            </li>
                          </ul>
                        </li>
                        <li>
                          <strong>Find a "Bridge" Point:</strong>
                          <ul>
                            <li>
                              Find the median point a in the array T based on
                              its x-coordinate.
                            </li>
                            <li>
                              Find the "bridge" of the upper hull, which is a
                              pair of points that forms a line segment that
                              crosses the median vertical line through a.
                            </li>
                          </ul>
                        </li>
                        <li>
                          <strong>Divide and Conquer:</strong>
                          <ul>
                            <li>
                              Divide the set of points T into two subsets,
                              T_left and T_right, based on their position
                              relative to the bridge and the median.
                            </li>
                            <li>
                              Recursively call upperHull on T_left and T_right
                              to compute the upper hulls of the respective
                              subsets.
                            </li>
                          </ul>
                        </li>
                        <li>
                          <strong>Merge Hulls:</strong>
                          <ul>
                            <li>
                              Concatenate the results of the recursive calls,
                              ensuring the points are in order from left to
                              right.
                            </li>
                            <li>Return the resulting array.</li>
                          </ul>
                        </li>
                      </ol>
                    </div>

                    <div>
                      <h3>Dependencies:</h3>
                      <ul>
                        <li>The Point class.</li>
                        <li>
                          The nthSmallestPoints function, which returns the nth
                          smallest point in an array of points based on its
                          x-coordinate (used to find the median in this case).
                        </li>
                        <li>
                          The upperBridge function, which returns the bridge of
                          the upper hull for a given set of points and a given
                          point.
                        </li>
                      </ul>
                    </div>
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
                    <div>
                      <h2 style={{ marginTop: "0px" }}>
                        Function Name: upperBridge
                      </h2>
                    </div>

                    <div>
                      <h3>Purpose:</h3>
                      <ul>
                        <li>
                          This function finds a pair of points (bridge) that
                          forms a line segment crossing the vertical line
                          through a given point (a) and is part of the upper
                          hull of a set of points (T).
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3>Inputs:</h3>
                      <ul>
                        <li>
                          <strong>T:</strong> An array of Point objects
                          representing the set of points.
                        </li>
                        <li>
                          <strong>a:</strong> A Point object representing the
                          median point.
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3>Output:</h3>
                      <ul>
                        <li>
                          An array containing two Point objects representing the
                          bridge, or the original T array if no bridge is found.
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3>Algorithm:</h3>
                      <ol>
                        <li>
                          <strong>Handle base cases:</strong>
                          <ul>
                            <li>
                              If T has only one or two elements, return the
                              entire set (T).
                            </li>
                          </ul>
                        </li>
                        <li>
                          <strong>Create line segment pairs:</strong>
                          <ul>
                            <li>
                              The function iterates through T and creates pairs
                              of consecutive points as line segments.
                            </li>
                            <li>
                              It sorts each pair by x-coordinate to ensure a
                              consistent order.
                            </li>
                            <li>
                              These line segments become candidates for the
                              bridge.
                            </li>
                          </ul>
                        </li>
                        <li>
                          <strong>Calculate Slope:</strong>
                          <ul>
                            <li>
                              It separates the line segment pairs into three
                              categories:
                            </li>
                            <ul>
                              <li>
                                Infinite slope: If a pair has the same
                                x-coordinate (vertical line), these points are
                                added to a candidates list for further
                                processing.
                              </li>
                              <li>
                                Finite slope: The slopes of non-vertical lines
                                are calculated and stored in a slopes array.
                              </li>
                            </ul>
                          </ul>
                        </li>
                        <li>
                          <strong>Find Median Slope:</strong>
                          <ul>
                            <li>
                              The function calculates the median slope based on
                              the number of slopes:
                            </li>
                            <ul>
                              <li>
                                For even numbers of slopes, the median is the
                                average of the middle two slopes.
                              </li>
                              <li>
                                For odd numbers, the median is the middle slope
                                itself.
                              </li>
                            </ul>
                          </ul>
                        </li>
                        <li>
                          <strong>Classify Line Segments by Slope:</strong>
                          <ul>
                            <li>
                              Line segments (pairs) are classified into three
                              groups based on their slope relative to the median
                              slope.
                            </li>
                          </ul>
                        </li>
                        <li>
                          <strong>Find Maximum Intercept Point Set:</strong>
                          <ul>
                            <li>
                              It calculates the y-intercept for each point in T
                              using the median slope.
                            </li>
                            <li>
                              The function finds the maximum y-intercept
                              (max_intercept).
                            </li>
                            <li>
                              It then creates a max_set containing all points in
                              T whose y-intercepts are very close (within an
                              epsilon value) to the max_intercept.
                            </li>
                          </ul>
                        </li>
                        <li>
                          <strong>Identify Bridge Candidates:</strong>
                          <ul>
                            <li>
                              From the max_set, it finds the points with the
                              leftmost (pk) and rightmost (pm) x-coordinates.
                            </li>
                            <li>
                              If pk.x is less than or equal to a.x and pm.x is
                              greater than a.x, then these two points (pk and
                              pm) form the bridge and are returned.
                            </li>
                          </ul>
                        </li>
                        <li>
                          <strong>
                            Recursive Call with Additional Candidates:
                          </strong>
                          <ul>
                            <li>
                              If the bridge isn't found based on the max_set,
                              the function considers additional candidates:
                            </li>
                            <ul>
                              <li>
                                For points in the small and equal lists, it adds
                                both points in the pair (pi and pj) to the
                                candidates list.
                              </li>
                              <li>
                                For points in the large list, it only adds the
                                second point (pj) in the pair to the candidates
                                list.
                              </li>
                            </ul>
                            <li>
                              The function recursively calls itself with the
                              updated candidates list and the same a point.
                            </li>
                          </ul>
                        </li>
                      </ol>
                    </div>

                    <div>
                      <h3>Dependencies:</h3>
                      <ul>
                        <li>The Point class.</li>
                        <li>
                          The nthSmallestPoints function, which returns the nth
                          smallest point in an array of points based on its
                          x-coordinate (used to find the median in this case).
                        </li>
                      </ul>
                    </div>
                  </p>
                </div>
              </div>
            </div>
          )}
          {slideIndex === 4 && (
            <div className="introPara">
              <div
                className="imgContainerOuter"
                style={{ alignItems: "flex-start" }}
              >
                <div className="imgContainerInner">
                  <img
                    src={mom_code_1}
                    alt="mom_code_1"
                    style={{ maxWidth: "100%" }}
                  />
                </div>
                <div className="textContainer">
                  <p style={{ marginTop: "0" }}>
                    <div>
                      <h2 style={{ marginTop: "0px" }}>
                        Function Name: nthSmallest
                      </h2>
                    </div>

                    <div>
                      <h3>Purpose:</h3>
                      <ul>
                        <li>
                          This function takes an array of elements (list) and an
                          integer (n). It utilizes the select function to
                          determine the index of the nth smallest element in the
                          list. Finally, it returns the element at that index.
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3>Inputs:</h3>
                      <ul>
                        <li>
                          <strong>list:</strong> An array of elements.
                        </li>
                        <li>
                          <strong>n:</strong> An integer representing the
                          desired rank of the element to find.
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3>Output:</h3>
                      <ul>
                        <li>The nth smallest element from the list.</li>
                      </ul>
                    </div>
                  </p>
                </div>
              </div>
            </div>
          )}
          {slideIndex === 5 && (
            <div className="introPara">
              <div
                className="imgContainerOuter"
                style={{ alignItems: "flex-start" }}
              >
                <div className="imgContainerInner">
                  <img
                    src={mom_code_2}
                    alt="mom_code_2"
                    style={{ maxWidth: "100%" }}
                  />
                </div>
                <div className="textContainer">
                  <p style={{ marginTop: "0" }}>
                    <div>
                      <h2 style={{ marginTop: "0px" }}>
                        Function Name: select
                      </h2>
                    </div>

                    <div>
                      <h3>Purpose:</h3>
                      <ul>
                        <li>
                          The select function is a helper function used by
                          nthSmallest to find the index of the nth smallest
                          element in a sublist. It employs a variation of the
                          quickselect algorithm, continuously partitioning the
                          sublist until it locates the desired element.
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3>Inputs:</h3>
                      <ul>
                        <li>
                          <strong>list:</strong> An array of elements.
                        </li>
                        <li>
                          <strong>left:</strong> The left index of the sublist.
                        </li>
                        <li>
                          <strong>right:</strong> The right index of the
                          sublist.
                        </li>
                        <li>
                          <strong>n:</strong>The desired rank of the element to
                          find.
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3>Output:</h3>
                      <ul>
                        <li>
                          The index of the nth smallest element in the sublist.
                        </li>
                      </ul>
                    </div>
                  </p>
                </div>
              </div>
            </div>
          )}
          {slideIndex === 6 && (
            <div className="introPara">
              <div
                className="imgContainerOuter"
                style={{ alignItems: "flex-start" }}
              >
                <div className="imgContainerInner">
                  <img
                    src={mom_code_3}
                    alt="mom_code_3"
                    style={{ maxWidth: "100%" }}
                  />
                </div>
                <div className="textContainer">
                  <p style={{ marginTop: "0" }}>
                    <div>
                      <h2 style={{ marginTop: "0px" }}>Function Name: pivot</h2>
                    </div>

                    <div>
                      <h3>Purpose:</h3>
                      <ul>
                        <li>
                          The pivot function selects a pivot element to
                          facilitate partitioning. It aims to find a "good"
                          pivot to ensure efficient partitioning. It utilizes
                          the median-of-medians algorithm to select an
                          appropriate pivot.
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3>Inputs:</h3>
                      <ul>
                        <li>
                          <strong>list:</strong> An array of elements.
                        </li>
                        <li>
                          <strong>left:</strong> The left index of the sublist.
                        </li>
                        <li>
                          <strong>right:</strong> The right index of the
                          sublist.
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3>Output:</h3>
                      <ul>
                        <li>The index of the selected pivot element.</li>
                      </ul>
                    </div>
                  </p>
                </div>
              </div>
            </div>
          )}
          {slideIndex === 7 && (
            <div className="introPara">
              <div
                className="imgContainerOuter"
                style={{ alignItems: "flex-start" }}
              >
                <div className="imgContainerInner">
                  <img
                    src={mom_code_4}
                    alt="mom_code_4"
                    style={{ maxWidth: "100%" }}
                  />
                </div>
                <div className="textContainer">
                  <p style={{ marginTop: "0" }}>
                    <div>
                      <h2 style={{ marginTop: "0px" }}>
                        Function Name: partition
                      </h2>
                    </div>

                    <div>
                      <h3>Purpose:</h3>
                      <ul>
                        <li>
                          The partition function partitions the sublist around a
                          pivot element. It rearranges the elements such that
                          elements smaller than the pivot are placed to its
                          left, while elements greater than the pivot are placed
                          to its right.
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3>Inputs:</h3>
                      <ul>
                        <li>
                          <strong>list:</strong> An array of elements.
                        </li>
                        <li>
                          <strong>left:</strong> The left index of the sublist.
                        </li>
                        <li>
                          <strong>right:</strong> The right index of the
                          sublist.
                        </li>
                        <li>
                          <strong>pivotIndex:</strong> The index of the pivot
                          element.
                        </li>
                        <li>
                          <strong>n:</strong> The desired rank of the element to
                          find.
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3>Output:</h3>
                      <ul>
                        <li>
                          The index of the nth smallest element in the sublist.
                        </li>
                      </ul>
                    </div>
                  </p>
                </div>
              </div>
            </div>
          )}
          {slideIndex === 8 && (
            <div className="introPara">
              <div
                className="imgContainerOuter"
                style={{ alignItems: "flex-start" }}
              >
                <div className="imgContainerInner">
                  <img
                    src={mom_code_5}
                    alt="mom_code_5"
                    style={{ maxWidth: "100%" }}
                  />
                </div>
                <div className="textContainer">
                  <p style={{ marginTop: "0" }}>
                    <div>
                      <h2 style={{ marginTop: "0px" }}>
                        Function Name: partition5
                      </h2>
                    </div>

                    <div>
                      <h3>Purpose:</h3>
                      <ul>
                        <li>
                          The partition5 function partitions a small sublist of
                          5 elements to assist in pivot selection. It applies a
                          simple sorting algorithm, here we used bubble sort.
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3>Inputs:</h3>
                      <ul>
                        <li>
                          <strong>list:</strong> An array of elements.
                        </li>
                        <li>
                          <strong>left:</strong> The left index of the sublist.
                        </li>
                        <li>
                          <strong>right:</strong> The right index of the
                          sublist.
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3>Output:</h3>
                      <ul>
                        <li>
                          The index of the median element within the sublist.
                        </li>
                      </ul>
                    </div>
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
