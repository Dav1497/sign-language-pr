import React, { useReducer, useState } from "react";
import './Lesson.css';
import { Input, FormGroup, Label, Form, Container, Button, Col, Row } from 'reactstrap';
import video from "./images/video.png";

function Lesson() {

  return (

    <div className="back">
      <h1 className="title">Lección: Abecedario</h1>

      <table className="tableau">
        <tr>
          <td>
            <div className="cuadroBlanco">
              <br></br>

              <img src={video} alt="video" className="video" />
              <br></br>

              <h1 className="subtitle">
                El Abecedario
</h1>

              <p className="parrafo">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sed
                 ligula a nibh tincidunt feugiat. Ut fermentum pharetra dolor eget commodo. 
                 Ut viverra pharetra odio, nec tempor nulla efficitur a. Praesent ut risus et 
                lorem imperdiet tempor ac non diam. Nulla euismod pretium dui. Morbi id congue 
                ligula, quis molestie nisl. 
                Donec a neque quam. Duis turpis nisl, pulvinar in efficitur non, egestas vel dui.
                 Donec eu arcu a mi consectetur porttitor. Donec non nunc ac lacus mattis convallis 
                 eget vel velit. Etiam nec mauris vel urna pharetra accumsan. Maecenas hendrerit tortor 
                 ut nunc mattis aliquam. Duis sed leo convallis, porta augue at, aliquet diam. Integer 
                 accumsan tempor elit vitae mattis. Proin dignissim mi lectus, eu bibendum nisl vehicula 
                 id. Suspendisse ultricies lacinia nulla et ultrices. Proin metus ante, convallis vel 
                 pharetra et, convallis quis ligula. Mauris luctus, arcu a sodales viverra, sapien felis 
                 pretium augue, ut rhoncus enim odio vel nibh. Nulla varius metus nec ligula pharetra, in 
                 efficitur ex eleifend. Etiam eget lacinia leo, ut luctus purus. Donec non lorem et nunc 
                 luctus interdum nec eget lorem. Cras non luctus dolor, ac congue metus. Pellentesque 
                 faucibus lectus quis faucibus elementum. Morbi sagittis velit ut risus consectetur, 
                 eu molestie nibh lobortis. Praesent venenatis, diam vel malesuada fermentum, lacus 
                 lectus pretium magna, eu finibus tortor nisl consequat velit.
</p>

            </div>
          </td>
          <td className="derecha">
<div className="cajaTrans">
  <button color="success" className="proxbtn"> Próximo > </button>
</div>
<br></br>

<div className="cajaAzul">
<h1>
  Max XP: 100
</h1>
<br>
</br>
<h2 className="textoAzul">
Video
</h2>
<h2>
Prueba 1
</h2>
<h2>
Prueba 2
</h2>
<h2>
Prueba 3
</h2>


</div>
<br>
</br>
<div className="cajaTrans">
  <Button  className="orangebtn"> Abandonar Lección  </Button>
</div>
          </td>
        </tr>
      </table>


    </div>


  );
}

export default Lesson;
