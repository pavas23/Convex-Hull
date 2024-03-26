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
              <div className="imgContainerOuter" style={{alignItems:'flex-start'}}>
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
                    aperiam ipsam optio temporibus, quidem vitae aliquam
                    voluptas tempore voluptatem odio distinctio eos facilis!
                    Corrupti sed aspernatur ipsam quam voluptatem voluptates
                    possimus assumenda deleniti eaque, nobis accusamus. Ipsum
                    quod quo laudantium quidem enim illum consequatur velit
                    mollitia optio vero, quis, officia voluptatibus id earum!
                    Eum magnam inventore omnis impedit, consequatur fuga
                    aperiam? Quia tenetur iusto ut fuga architecto consequatur
                    hic et maxime cupiditate similique, aspernatur eos soluta
                    modi voluptatem autem ad nam tempore, dolore ex debitis
                    ipsam illum. Natus similique laudantium modi officia alias.
                    Libero corporis beatae deleniti rerum modi tempore
                    laboriosam pariatur eum, quae, quis aut minus voluptate. Ea
                    nobis doloribus eveniet quam, deserunt porro iusto. Nesciunt
                    est praesentium vel laboriosam, debitis mollitia! Corrupti
                    fugit repellendus non quibusdam ratione ipsam explicabo
                    placeat totam quia, animi atque architecto ullam numquam
                    voluptatem illum, expedita possimus harum dicta sapiente!
                  </p>
                </div>
              </div>
            </div>
          )}
          {slideIndex === 1 && (
             <div className="introPara">
             <div className="imgContainerOuter" style={{alignItems:'flex-start'}}>
               <div className="imgContainerInner">
                 <img src={jm2_code} alt="JM1" style={{ maxWidth: "100%" }} />
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
                   aperiam ipsam optio temporibus, quidem vitae aliquam
                   voluptas tempore voluptatem odio distinctio eos facilis!
                   Corrupti sed aspernatur ipsam quam voluptatem voluptates
                   possimus assumenda deleniti eaque, nobis accusamus. Ipsum
                   quod quo laudantium quidem enim illum consequatur velit
                   mollitia optio vero, quis, officia voluptatibus id earum!
                   Eum magnam inventore omnis impedit, consequatur fuga
                   aperiam? Quia tenetur iusto ut fuga architecto consequatur
                   hic et maxime cupiditate similique, aspernatur eos soluta
                   modi voluptatem autem ad nam tempore, dolore ex debitis
                   ipsam illum. Natus similique laudantium modi officia alias.
                   Libero corporis beatae deleniti rerum modi tempore
                   laboriosam pariatur eum, quae, quis aut minus voluptate. Ea
                   nobis doloribus eveniet quam, deserunt porro iusto. Nesciunt
                   est praesentium vel laboriosam, debitis mollitia! Corrupti
                   fugit repellendus non quibusdam ratione ipsam explicabo
                   placeat totam quia, animi atque architecto ullam numquam
                   voluptatem illum, expedita possimus harum dicta sapiente!
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
