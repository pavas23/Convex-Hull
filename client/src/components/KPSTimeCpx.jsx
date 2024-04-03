import React, { useState, useEffect } from "react";
import "../css/Introduction.css";
import { Link } from "react-router-dom";
import kps_tc from "../images/kps_tc.jpg";

function KPSTimeCpx() {
  const [slideIndex, setSlideIndex] = useState(0);

  const nextSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex + 1) % 2);
  };

  const prevSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex - 1 + 2) % 2);
  };

  useEffect(() => {
    // Trigger MathJax typesetting after component is mounted
    window.MathJax.typeset();
  }, []);

  const latexExpression1 =
    "T(n,h) \\space \\leq \\space cn + \\max_{hi}(\\space c\\frac{n}{2}lgh_{1} + c\\frac{n}{2}lg(h-1-h_{1})\\space)";
  const latexExpression2 =
    "T(n,h) \\space = \\space cn + c\\frac{n}{2}.\\max_{hi}\\space lg(\\space h_{1}(h-1-h_{1}) \\space)";
  const latexExpression3 =
    "T(n,h) \\space \\leq \\space cn + c\\frac{n}{2}\\space lg(\\space \\frac{h}{2}.\\frac{h}{2} \\space)";
  const latexExpression4 =
    "T(n,h) \\space = \\space cn + c\\frac{n}{2}2lg\\frac{h}{2}";
  const latexExpression5 = "T(n,h) \\space = cn \\space lgh";
  const latexExpression6 = "T(n,h) \\leq cn \\space lgh";
  const latexExpression7 =
    "T(n,h) \\leq cn \\leq cn \\space lg2 = cn \\space lgh";
  const latexExpression8 =
    "\\begin{equation}\n" +
    "  T(n,h) \\leq \n" +
    "    \\begin{cases}\n" +
    "      cn & \\text{if h = 2}\\\\\n" +
    "      cn + max(\\space T(\\frac{n}{2},h_{l}) + T(\\frac{n}{2},h_{r}) \\space | \\space h_{l} + h_{r} + 1 = h \\space) & \\text{otherwise}\\\\\n" +
    "    \\end{cases}\n" +
    "\\end{equation}";
  const latexExpression9 = "f(n) = f(\\frac{3n}{4}) + O(n)";
  const latexExpression10 = "f(n) = O(n)";
  const latexExpression11 = "O(NlogH_{u})";

  return (
    <div className="intro">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
      />
      <h1 className="title2" style={{ fontSize: "45px", marginBottom: "10px" }}>
        Time Complexiety Analysis: K.P.S. Algorithm
      </h1>
      {/* <div className="carousel"> */}
      {/* <div className="slideBtnContainer" style={{ alignItems: "flex-start" }}>
          <div
            className="changeBtn"
            onClick={prevSlide}
            style={{ width: "fit-content" }}
          >
            <i className="fas fa-chevron-left"></i>
          </div>
        </div> */}
      <div className="slide">
        {slideIndex === 0 && (
          <div className="introPara" style={{ marginTop: "10px" }}>
            UPPER-BRIDGE runs in O(n) worst case time. Recurrence is \[
            {latexExpression9}\] After solving this we will get \[
            {latexExpression10}\] Claim : UPPER-HULL takes \[{latexExpression11}
            \] where, Hu is the number of vertices on the upper hull and N is
            the size of the input.
            <br />
            <br />
            Let T(n,h) be the recurrence relation. Here c is a constant and n ≥
            h {">"} 1. h<sub>l</sub> and h<sub>r</sub> are number of upper hull
            edges in recursive calls for left and right side.
            <br />
            <br />
            \[{latexExpression8}\]
            <br />
            <br />
            Proof : Suppose the two occurences of O(n) in the above recurrence
            are at most cn, where c is a suitably large constant. We will show
            by induction in h that \[{latexExpression6}\] for all n and h ≥ 2
            .For the base case where h = 2, \[{latexExpression7}\] For the
            inductive case,
            <span>\[{latexExpression1}\]</span>
            <span>\[{latexExpression2}\]</span>
            <span>\[{latexExpression3}\]</span>
            <span>\[{latexExpression4}\]</span>
            <span>\[{latexExpression5}\]</span>
          </div>
        )}
      </div>
      {/* <div className="slideContent"></div>
        <div className="slideBtnContainer" style={{ alignItems: "flex-end" }}>
          <div
            className="changeBtn"
            onClick={nextSlide}
            style={{ width: "fit-content" }}
          >
            <i className="fas fa-chevron-right"></i>
          </div>
        </div> */}
      {/* </div> */}
    </div>
  );
}

export default KPSTimeCpx;
