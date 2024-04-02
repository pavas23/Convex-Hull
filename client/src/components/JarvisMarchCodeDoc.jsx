import React, { useState } from "react";
import "../css/Introduction.css";
import { Link } from "react-router-dom";
import jm1_code from "../images/jm1_code.jpg";
import jm2_code from "../images/jm2_code.jpg";

function JarvisMarchCodeDocumentation() {
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
      <h1 className="title2" style={{ fontSize: "50px" }}>
        Code Documentation: Jarvis March Algorithm
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
                  <img src={jm1_code} alt="JM1" style={{ maxWidth: "100%" }} />
                </div>
                <div className="textContainer">
                  <p style={{ marginTop: "0" }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Deleniti rem, nostrum esse dolores consequuntur velit amet
                    sed. Hic cupiditate aliquid debitis aspernatur quibusdam,
                    repellendus nostrum laboriosam modi sint ut cumque corporis,
                    optio animi quod tempore enim! A sint expedita sunt soluta
                    modi reiciendis at atque ducimus, voluptatem vero? Minus
                    voluptate nihil nemo totam nesciunt cum perspiciatis beatae
                    nostrum voluptates soluta necessitatibus consectetur ab
                    aperiam ipsam optio temporibus, quidem vitae aliquam !
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
                  <img src={jm2_code} alt="JM1" style={{ maxWidth: "100%" }} />
                </div>
                <div className="textContainer">
                  <p style={{ marginTop: "0" }}>
                    <h3 style={{ marginTop: "0px" }}>
                      {" "}
                      Function: orientation(p, q, r)
                    </h3>
                    <p>
                      This function determines the orientation of three points,
                      denoted as <code>p</code>, <code>q</code>, and{" "}
                      <code>r</code>, in a two-dimensional plane.
                    </p>
                    <h4>Parameters:</h4>
                    <ul>
                      <li>
                        <code>p</code>: The first point object having the
                        coordinates <code>x</code> and <code>y</code> in a
                        two-dimensional plane.
                      </li>
                      <li>
                        <code>q</code>: The second point object having the
                        coordinates <code>x</code> and <code>y</code> in a
                        two-dimensional plane.
                      </li>
                      <li>
                        <code>r</code>: The third point object having the
                        coordinates <code>x</code> and <code>y</code> in a
                        two-dimensional plane.
                      </li>
                    </ul>
                    <h4>Return Value:</h4>
                    <p>
                      <ul>
                        <li>
                          <strong>0</strong>: If the points <code>p</code>,{" "}
                          <code>q</code>, and <code>r</code> are collinear, the
                          function would return 0 which implies that they lie on
                          the same straight line.
                          <br />
                        </li>
                        <li>
                          <strong>1</strong>: If the points <code>p</code>,{" "}
                          <code>q</code>, and <code>r</code> form a clockwise
                          orientation, the three points form a right turn.
                          <br />
                        </li>
                        <li>
                          <strong>2</strong>: If the points <code>p</code>,{" "}
                          <code>q</code>, and <code>r</code> form a
                          counterclockwise orientation, i.e., they form a left
                          turn.
                        </li>
                      </ul>
                    </p>

                    <h4>Description:</h4>
                    <p>
                      The orientation of three points in a two-dimensional plane
                      can be determined using the cross-product method. This
                      method involves calculating the cross-product of two
                      vectors formed by the line segments connecting the points.
                      <p>Consider two vectors:</p>
                      <ul>
                        <li>
                          Vector v1 formed by the line segment from p to q.
                        </li>
                        <li>
                          Vector v2 formed by the line segment from q to r.
                        </li>
                      </ul>
                      <p>
                        The cross-product of v1 and v2 can be computed as (v1_x
                        * v2_y) - (v1_y * v2_x).
                      </p>
                      <p>
                        The sign of the result of the cross-product determines
                        the orientation:
                      </p>
                      <ul>
                        <li>
                          If the result is positive, it indicates a clockwise
                          orientation, suggesting that the points p, q, and r
                          form a right turn.
                        </li>
                        <li>
                          If the result is negative, it indicates a
                          counterclockwise orientation, suggesting that the
                          points form a left turn.
                        </li>
                      </ul>
                    </p>
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

export default JarvisMarchCodeDocumentation;
