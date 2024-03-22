import React, { useState } from "react";
import "../css/Introduction.css";

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
        <div className="slideBtnContainer" style={{alignItems:'flex-start'}}>
        <div className="changeBtn" onClick={prevSlide} style={{width : 'fit-content'}}>
          <i className="fas fa-chevron-left"></i>
        </div>
        </div>
        <div className="slide">
          {slideIndex === 0 && (
            <div className="introPara">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatibus est ratione minus et? Hic adipisci voluptas cum
              voluptatem, similique soluta necessitatibus saepe qui, ut veniam
              esse magni nihil nisi. Neque id odio quisquam iste est ipsum
              labore dolorem similique! Maiores aperiam similique voluptatem.
              Culpa, et quae? Voluptate nesciunt esse recusandae quibusdam iste
              nobis repudiandae voluptatibus quaerat error ipsam facilis rem,
              consequatur ut in at magnam? Tempore ex tempora architecto amet
              magni asperiores, animi rerum voluptatem dolorum, dolor harum
              minima molestias! Eaque cum nihil atque officia quos similique
              quisquam hic, error iusto magni, explicabo sint, laboriosam
              quibusdam assumenda consequatur beatae exercitationem?
            </div>
          )}
          {slideIndex === 1 && (
            <div className="introPara">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
              provident dolores beatae laborum voluptate temporibus iusto eos
              quaerat officia doloremque quis quisquam libero velit odit eum
              nostrum id, natus iste? Rem, cumque veniam delectus sunt
              doloremque dolorum totam aperiam perspiciatis aut, porro, esse
              impedit ea quos aspernatur possimus sequi animi deleniti nostrum
              recusandae nobis? Distinctio, maiores perferendis. Quo neque rerum
              fuga facilis cupiditate culpa voluptatum sit? A, itaque. Corporis,
              possimus porro distinctio ex obcaecati ipsa, rerum sed incidunt
              necessitatibus voluptas sapiente fugit dolorem dicta dignissimos
              illo voluptate architecto, delectus minus autem. Veritatis, nulla
              sapiente saepe dolores ratione quaerat magnam ipsam ut ad qui
              omnis. Odit sint, vel aperiam esse sapiente nulla quae voluptate
              voluptates eum tenetur reiciendis minus exercitationem commodi
              suscipit. Quas nobis corrupti aliquid obcaecati consectetur rem.
              Vel qui dolor illo soluta repellat aut laborum facere, voluptatem
              corporis iure consequuntur expedita! Eius, placeat quas error esse
              voluptatibus ipsum nobis!
            </div>
          )}
          {slideIndex === 2 && (
            <div className="introPara">
              <div className="button-container">
                <h3 className="introPara" style={{ fontSize: "30px" }}>
                  Algorithms to Compute Convex Hull:
                </h3>
                <button class="changeBtn">Jarvis March Algorithm</button>
                <button class="changeBtn">
                  Kirkpatrick-Seidel's Algorithm
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="slideContent"></div>
        <div className="slideBtnContainer" style={{alignItems:'flex-end'}}>
        <div className="changeBtn" onClick={nextSlide} style={{width:'fit-content'}}>
          <i className="fas fa-chevron-right"></i>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Introduction;
