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
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Voluptates atque quae id! Voluptas eum facilis ipsum eaque
                    impedit minus eius, excepturi dolorum consequuntur
                    perspiciatis unde ab ut debitis autem natus! Ipsam, debitis
                    quas magnam quisquam, sunt voluptates expedita ab iusto
                    doloribus, alias et harum deserunt a vero sed! Dolor eos
                    alias ut! Necessitatibus vel quas exercitationem eius
                    voluptatem ipsum deleniti, fuga officia earum impedit nemo
                    repellat corporis commodi natus iusto dolorem officiis
                    beatae error dolores unde id animi excepturi totam? Tempore
                    natus tempora corrupti nobis. Dolores autem sint ducimus
                    vitae consequatur cum aut voluptas quaerat repellat
                    excepturi recusandae provident ipsum illo unde similique
                    optio, error voluptates. Deserunt, quas suscipit maiores
                    iste nobis cumque veritatis ipsum accusantium error beatae
                    eligendi nam, blanditiis iusto voluptas rerum laboriosam
                    veniam cupiditate. Fuga nulla amet provident reiciendis
                    neque, architecto iste velit error possimus hic minima sunt
                    fugit maiores est sint sapiente libero quod tempora ad
                    soluta porro? Quos necessitatibus deserunt quas dolore id
                    debitis et ipsa quisquam! Ducimus eum quam temporibus nam
                    nobis, adipisci nesciunt quas omnis voluptatum animi,
                    deleniti sequi possimus perferendis aperiam rerum! Dolor
                    officia adipisci officiis sit consequuntur minus quia odio
                    voluptatibus voluptatum et, eaque temporibus minima
                    aspernatur facere. Fuga aliquam dicta reprehenderit magni
                    dolorem repellendus rerum voluptatem quos. Accusamus et
                    fugit autem vitae delectus nemo aut recusandae animi
                    accusantium ex vero voluptatibus officia pariatur, iusto
                    eius quasi, hic rerum! Maxime veritatis odit repudiandae
                    sequi ad. Inventore odit adipisci ducimus facere
                    perspiciatis qui vel nam asperiores quae quibusdam, ea
                    accusantium amet sit. Autem ab itaque eos exercitationem
                    eius delectus neque mollitia voluptatem fugit aperiam sed
                    quam beatae, eligendi totam illum similique necessitatibus
                    ducimus iure cum quae quos fuga illo libero. Facere quae
                    aliquid, debitis impedit totam dolores iste deleniti iure
                    explicabo nobis, in qui deserunt! Dolorem error nobis
                    accusantium possimus, ea ducimus alias et aliquam quae
                    facilis ipsum magnam voluptatem sapiente perferendis,
                    exercitationem omnis. Ad nesciunt adipisci nulla sequi
                    aliquid quod sed sint rerum earum accusantium minima iure
                    voluptatum blanditiis, molestiae vel consequuntur veniam nam
                    eos porro neque quis laborum animi. Architecto eius aperiam
                    doloribus nam qui cum ex ducimus quos, placeat ut incidunt
                    enim corrupti assumenda molestiae maiores laboriosam
                    voluptatem laborum adipisci sequi quidem! Ratione harum sunt
                    dolorem tempore dicta temporibus, quod delectus ipsa
                    laboriosam exercitationem quibusdam facilis perspiciatis
                    fuga quo assumenda atque sapiente minima, expedita
                    doloremque molestiae. Vitae possimus hic recusandae
                    similique quod quia doloremque odit? Voluptatum magni
                    architecto officiis, corrupti debitis necessitatibus
                    laboriosam iste quidem maiores non optio mollitia at
                    aspernatur cupiditate delectus similique! Repellendus
                    possimus quis aliquam, sint doloribus quibusdam nemo,
                    temporibus dolorem incidunt dignissimos expedita modi magnam
                    molestias velit rem tenetur blanditiis. Optio exercitationem
                    perferendis ipsa voluptate minus, praesentium molestias
                    quidem, enim cum error totam dicta eum natus laborum! Sed
                    vero nesciunt inventore minima nisi aut, ducimus praesentium
                    illum, alias accusamus, quo corrupti? Dolores esse debitis
                    iste sed quidem maiores aliquam nisi fugiat laborum nulla
                    labore facilis nesciunt id asperiores architecto officia eum
                    placeat, vitae error excepturi voluptates possimus fugit.
                    Expedita, saepe neque! Quos incidunt possimus iure?
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
