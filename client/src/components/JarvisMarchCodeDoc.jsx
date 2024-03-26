import React, { useState } from "react";
import "../css/Introduction.css";
import { Link } from "react-router-dom";

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
              quibusdam assumenda consequatur beatae exercitationem? Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Hic nulla accusamus
              maxime nisi rerum magni laborum quaerat quos voluptate, voluptatum
              omnis quam ipsam est adipisci autem quae eaque ut temporibus nam
              fugit error odit iusto minus? Beatae labore ipsam saepe ad quas
              alias vitae neque eius incidunt ut dolorem itaque officia sit id
              ducimus, aliquam totam vero eaque necessitatibus quod eos
              molestias dicta amet quibusdam! Nobis consequuntur ullam illo
              cupiditate impedit culpa libero ea, labore doloribus at officiis
              laudantium aliquam necessitatibus aliquid? Minus quo odit officiis
              rem voluptatem error id inventore ad beatae quia laborum eligendi,
              impedit iure, consequatur quod doloremque quaerat sunt. Pariatur
              repellat nobis facilis illum, mollitia itaque numquam, libero
              porro ipsum veritatis nam voluptatem quia suscipit dolores at
              aspernatur neque cum corrupti? Aut eius non ipsum tempora.
              Reiciendis consequuntur ea beatae a, labore optio, omnis
              exercitationem, recusandae dicta facilis aut tempore sint corporis
              esse aspernatur velit porro quia! Quasi non veritatis praesentium
              molestiae commodi suscipit quae ut quia libero at veniam iste
              perspiciatis fuga adipisci illo itaque minima harum debitis,
              cumque a nemo dolores? Deserunt architecto, qui enim quaerat unde
              sint harum reiciendis, nesciunt at nobis illo saepe perferendis
              dolorem alias perspiciatis! Recusandae fugit facere enim atque
              sapiente laboriosam, eaque doloribus aliquid est vero accusantium
              delectus quia temporibus sunt laudantium blanditiis ratione magni,
              amet magnam similique esse a? Optio consequuntur ducimus adipisci
              ea? Assumenda minima tempora reprehenderit soluta quisquam quis
              corrupti, vitae consectetur numquam optio dolor dolores ea ducimus
              voluptate fugit dolore illo dolorem rem, blanditiis rerum suscipit
              eum velit. Doloribus dolore non assumenda numquam, asperiores
              impedit, provident reprehenderit nemo tempora nostrum nisi minus
              obcaecati dignissimos maiores perspiciatis atque recusandae quam
              rem! Necessitatibus iure ipsa laudantium quasi, eius minus earum
              accusamus assumenda doloremque dolor vitae voluptatum cum debitis
              sed ab neque eaque doloribus fugit natus, cumque culpa, autem
              beatae mollitia? Et sapiente dolores maxime at tempora minima
              eveniet fugit vel dicta suscipit debitis consectetur autem
              nesciunt quo enim perspiciatis commodi necessitatibus nulla
              aliquid reprehenderit quasi, accusantium doloremque laborum?
              Veniam modi maxime incidunt adipisci et, optio ullam minima magnam
              reprehenderit labore magni, accusamus aliquid soluta beatae odio
              minus, asperiores id officia ut sapiente debitis voluptatum?
              Atque, odio. Minima ullam quam nulla magni dolorum odit
              consequatur laborum, officiis fuga accusantium et excepturi vel
              facere maxime assumenda modi saepe esse ducimus aut veritatis?
              Accusantium soluta quae corporis ipsam? Fugiat, laborum tempore
              non consectetur debitis incidunt corporis aliquid cupiditate rem
              sit! Nihil cumque possimus sed quo consectetur facere modi culpa
              vitae ab mollitia accusamus dolore inventore, quae sapiente
              aliquid ex? Praesentium, similique. Asperiores distinctio nostrum
              totam impedit harum rem, quo sunt mollitia expedita? Quia,
              corrupti placeat id laboriosam, aut sit eius velit amet distinctio
              fuga exercitationem animi quasi similique facere modi. Unde quos,
              dolorem at harum temporibus error fugit omnis. Officiis similique
              explicabo fuga nobis consequatur? Ut quibusdam autem sit fugiat.
              Id voluptatum asperiores aspernatur iusto. Officiis iste iusto
              nemo molestiae dignissimos facilis hic laboriosam voluptatum minus
              magni fugiat ipsum doloremque, quisquam, illum ex alias doloribus,
              eveniet libero. Voluptate repellat corporis nostrum aut cum veniam
              quasi recusandae incidunt similique quae. Neque debitis distinctio
              laborum eaque modi iure praesentium ex excepturi rem itaque!
              Perferendis dolore consectetur culpa deleniti, blanditiis quisquam
              exercitationem atque voluptatem in tenetur vel officiis doloremque
              molestiae illum eligendi! Amet dolor voluptate eaque eligendi,
              itaque modi id quaerat repellendus delectus cum veritatis eum
              nulla suscipit quibusdam fuga repudiandae est! Commodi placeat a
              dolorum impedit, fugiat animi ut. Magni quos beatae rem nihil
              nostrum. Consequuntur, consequatur facilis. Soluta quasi
              consequuntur quas cupiditate similique, dignissimos aliquid ut
              vero amet, maxime, nisi est distinctio labore illo suscipit error
              et cumque optio. Non, quisquam! Dolorum maiores odit corrupti
              suscipit perspiciatis laboriosam molestiae, perferendis itaque.
              Repellendus iure libero quas ad recusandae eaque officia, sed
              dolorum minima natus optio labore hic ab. Minus doloremque
              voluptatibus porro, sint consectetur sapiente, velit, alias magnam
              consequuntur rem voluptatum! Provident reprehenderit fugit error
              quibusdam delectus! Tenetur possimus distinctio nisi quibusdam qui
              dolorem minus expedita ex est architecto sint voluptas, modi omnis
              officiis deserunt soluta non et fugiat officia harum? Adipisci
              explicabo veniam voluptatum, autem impedit aspernatur odio!
              Exercitationem, nam ratione provident quisquam qui quo a sit
              temporibus officia iste non soluta, voluptatibus repudiandae
              assumenda id incidunt ullam vel doloribus possimus nostrum.
              Voluptatibus minima soluta ea voluptate dolorum nisi distinctio ut
              dolores, molestias modi voluptas quo fugit minus laudantium
              delectus hic dolorem incidunt architecto deserunt explicabo. Sunt
              eum quidem aspernatur est explicabo hic deleniti aliquam eveniet
              fugiat provident quia temporibus recusandae incidunt consequuntur
              nemo, non mollitia nihil deserunt ad facere maiores quae suscipit
              dolorem doloribus. Qui quisquam nobis totam esse. Eum laboriosam
              velit, id facilis assumenda unde officiis repudiandae molestias
              ipsum ipsam soluta libero excepturi atque quibusdam, alias
              possimus eaque iure! Quidem alias voluptate quod et impedit
              ratione sequi accusantium a! Ullam, optio? Et voluptatum minima
              suscipit quam enim earum ipsum nostrum atque libero, cupiditate
              incidunt numquam modi dolorum repellendus beatae nobis accusamus
              reiciendis possimus deserunt adipisci aliquam officiis hic
              similique unde! Dolor consequuntur illo commodi beatae fugit
              adipisci quos impedit est veniam blanditiis quod optio libero
              laudantium magni cupiditate deleniti quis, quia distinctio et
              quidem nihil ea! Nihil tempora dolorum placeat suscipit id nulla
              consectetur mollitia, distinctio veritatis, amet accusantium atque
              a, hic quam aut. Unde odio velit consequatur libero aspernatur
              beatae! Laborum rerum sit dolor ullam tempore nostrum beatae
              molestias dignissimos tempora accusamus vero est repudiandae modi
              laudantium, ipsam a perspiciatis doloribus? Pariatur illum
              voluptas a laudantium nesciunt vel.
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
              voluptatibus ipsum nobis! Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Facere officia rerum eveniet incidunt,
              voluptatibus cupiditate nihil quibusdam ea provident quisquam
              ipsum natus libero eius fugiat nesciunt modi eligendi reiciendis
              unde fuga deleniti? Eveniet numquam corporis totam in voluptate
              velit iusto nisi doloribus. Aut, obcaecati possimus. Neque quidem
              praesentium tenetur provident error earum nihil magni eum
              molestias sequi, deleniti iure rerum officiis adipisci at! Et,
              voluptatibus ea? Voluptatem ea esse, obcaecati aut doloremque,
              quidem in hic maiores expedita libero repellendus porro ipsa
              ratione vel earum reprehenderit! Nulla accusamus mollitia eaque
              blanditiis sequi beatae, eum laborum tempora quisquam vitae fugiat
              ab neque minima quidem quis omnis at provident deserunt ut
              cupiditate enim, tempore consequuntur in. Sequi quidem illum amet
              dignissimos quas? Fugiat at dolores provident dolore obcaecati
              repellat labore voluptas a optio nesciunt, inventore minus rerum
              adipisci reprehenderit ratione ab delectus autem mollitia officiis
              officia praesentium deleniti. Nisi accusantium cupiditate cum
              exercitationem explicabo molestias quam. Harum blanditiis fugit
              reprehenderit iste veritatis deleniti soluta in odio, omnis ipsa
              eius optio doloremque alias delectus distinctio dicta amet
              consequatur! Officiis mollitia excepturi totam laboriosam sed
              inventore esse, quaerat explicabo consequuntur saepe temporibus?
              Dolore amet voluptate ab, eius quas inventore blanditiis maxime
              necessitatibus dolorum veniam? Labore ea quasi tempore quos non
              dicta at veritatis, praesentium, provident rem pariatur alias,
              recusandae natus repellat. Fuga quam maxime sunt eius temporibus
              tenetur doloremque corporis, distinctio voluptate natus. Dolores
              omnis voluptates incidunt explicabo, reprehenderit corrupti
              repellendus. Esse nesciunt quo optio nobis nihil facere sit
              nostrum impedit error, ratione accusamus consequuntur quis eaque
              necessitatibus suscipit at corporis non, in obcaecati?
              Reprehenderit dolore, ad quisquam, est expedita debitis modi
              veniam corporis earum, commodi qui vero accusamus optio dolor
              error? Quas laudantium itaque voluptatem hic ad odit ab sed
              pariatur modi repellat doloribus, quae excepturi repudiandae porro
              animi minima, beatae accusantium dolore! Minima eveniet sint
              debitis veritatis dolorum, repellat aliquam quod laborum autem
              voluptates omnis quo numquam labore pariatur facere porro
              laboriosam. Officia id ut possimus, fuga soluta necessitatibus
              tempora corrupti, itaque quos rerum dolorem expedita ea eveniet
              cupiditate consequuntur sed magnam iusto! Voluptatum iste earum
              odio quam tempora optio labore alias magni omnis corrupti eius
              quia porro rerum, impedit deleniti, voluptates esse quisquam autem
              minus hic modi? Ipsum architecto odio, explicabo sunt vero sed
              modi pariatur perferendis iste animi et dolorem delectus itaque
              tempore molestiae mollitia dolorum alias sequi. Iste, possimus.
              Libero nesciunt asperiores autem tenetur molestiae eveniet ullam
              officiis accusamus eum assumenda, error voluptas, iusto fuga
              doloribus repellat nemo aliquam quod odit omnis officia!
              Accusantium, sint aliquam. Eius maiores facere itaque consequuntur
              magnam placeat, culpa obcaecati nemo laboriosam harum dolor, vero,
              ad enim laudantium corrupti. Beatae natus laudantium consequuntur
              obcaecati totam corporis aliquid ipsam cum ea cupiditate, saepe,
              nemo praesentium molestias quo id? Saepe accusantium sint
              assumenda officia laboriosam numquam soluta facilis tempora, amet
              blanditiis beatae esse, quis non vitae, est illo quod vel eligendi
              dolorem facere eaque minus quibusdam quo quas! Vel, consectetur.
              Excepturi magnam, quos sint pariatur laboriosam vitae recusandae
              veniam nam perspiciatis repellat praesentium exercitationem. Nisi
              aliquam autem vero neque animi dolore eum, maiores dolor impedit
              veritatis voluptas soluta eius nesciunt provident exercitationem
              molestias odio consequuntur minus pariatur cum itaque. Nam quod
              aspernatur placeat magni cum ducimus laboriosam iusto aliquid
              cumque corporis quos, voluptas rerum, dicta at dolores, dolorem
              aut iste autem ab! Soluta, aut quasi? Molestias asperiores ducimus
              dicta aspernatur perspiciatis, exercitationem recusandae nam,
              eaque, quia possimus aliquam excepturi nemo. Cum facere facilis
              suscipit. Sunt, excepturi! Necessitatibus amet, molestias quia
              veritatis eaque numquam eligendi ipsa qui laudantium dignissimos
              autem reprehenderit eveniet adipisci recusandae dolorum animi,
              accusantium placeat beatae consectetur? Voluptate natus nostrum,
              qui excepturi dolores cumque soluta adipisci alias doloribus ipsum
              nisi minus laudantium tempora laboriosam vero sit hic corporis
              reprehenderit delectus est. Quisquam accusantium eligendi placeat,
              at nesciunt officia, odio pariatur iure praesentium, doloribus
              iste ducimus saepe esse officiis repudiandae modi? Blanditiis
              recusandae soluta asperiores tempora, a qui voluptas accusamus
              magnam praesentium atque vero, cumque architecto, nam quibusdam
              saepe illum nemo. Quas eius accusamus pariatur laudantium earum
              voluptate nesciunt dignissimos impedit reprehenderit voluptates.
              Adipisci asperiores quisquam fugiat rem accusamus sunt, voluptatum
              dicta sequi eligendi, exercitationem cupiditate hic iure neque
              facilis nemo. Maxime libero fuga impedit rerum, eius asperiores
              veniam soluta doloremque quo, consequuntur reprehenderit
              perspiciatis. Cumque ut eum nihil, saepe praesentium, consequuntur
              non, officia enim doloribus obcaecati assumenda voluptatibus eius.
              Molestiae, illum nostrum. Illo vitae modi unde ut adipisci
              quisquam rem esse suscipit laborum pariatur quas consequatur nemo
              error, officiis in sit expedita nulla maxime provident? Possimus
              reiciendis fugit iusto quibusdam doloremque? Dolores sequi quam
              alias, porro error esse, nam fuga facilis officia enim tenetur,
              voluptatibus deleniti animi dolore soluta magni libero. Sequi quam
              sint temporibus, molestiae commodi exercitationem quos odit quo
              velit iusto necessitatibus vero deserunt architecto possimus qui
              at reiciendis impedit laudantium assumenda dolorem porro cumque
              excepturi sed. Necessitatibus omnis ipsum similique quae quo quas
              vero, quia beatae nemo minus. Hic eos fugiat necessitatibus,
              molestias modi quae repellendus! Nesciunt magni vero ad eaque iure
              commodi quis deleniti amet architecto dolores, aut placeat
              doloribus repellendus molestiae, ab similique accusamus optio odit
              ducimus sed in nostrum fugiat? Et quaerat fugiat mollitia
              aspernatur ipsa corrupti reiciendis blanditiis iste a, corporis
              nesciunt unde vitae possimus quis voluptatum minima laudantium cum
              explicabo quod enim officia libero perspiciatis atque omnis? Quae
              voluptatum hic sequi eius reiciendis necessitatibus, assumenda
              quas qui excepturi dolor id asperiores! Facilis, vel! Architecto
              et modi, ullam aspernatur tempore mollitia molestias laborum
              impedit at quibusdam quas quisquam?
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
