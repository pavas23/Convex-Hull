import React, { useState } from "react";
import "../css/Introduction.css";
import jm1 from "../images/jm1.jpg";
import jm2 from "../images/jm2.jpg";

function JarvisMarchTimeCpx() {
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
      <h1
        className="title2"
        style={{ fontSize: "45px", marginTop: "10px !important" }}
      >
        Time Complexiety Analysis: Jarvis March Algorithm
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
              <div className="imgContainerOuter">
                <div className="imgContainerInner">
                  <img src={jm1} alt="JM1" />
                </div>
                <div className="textContainer">
                  <p style={{ marginTop: "0" }}>
                    First we find the left most point in O(n).
                  </p>
                </div>
              </div>
              <div
                className="imgContainerOuter"
                style={{ borderTop: "1px solid black", paddingTop: "20px" }}
              >
                <div className="imgContainerInner">
                  <img src={jm2} alt="JM1" />
                </div>
                <div className="textContainer">
                  <p style={{ marginTop: "0" }}>
                    Next we start from this point and try to find the next point
                    on the hull.
                  </p>
                </div>
              </div>
            </div>
          )}
          {slideIndex === 1 && (
            <div className="introPara" style={{ textAlign: "start" }}>
              The inner loop checks every point in the set S, and the outer loop
              repeats for each point on the hull. Hence the total run time is
              <i> O(nh)</i>
              <br />
              <br />
              In the worst case, all the n points are on the hull, so we get{" "}
              <i>
                {" "}
                O( n<sup>2</sup> )
              </i>
              <br />
              <br />
              Since the run time depends on the size of the output, so Jarvis's
              march is an output sensitive algorithm.
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

export default JarvisMarchTimeCpx;