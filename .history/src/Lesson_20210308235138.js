import React, { useReducer, useState } from "react";
import './Lesson.css';
import { Input, FormGroup, Label, Form, Container, Button, Col, Row } from 'reactstrap';
import video from "./images/video.png";

function Lesson() {

  return (

    <div className="back">
      <h1 className="title">Lección: {this.props.title}</h1>

      <table className="tableau">
        <tr>
          <td>
            <div className="cuadroBlanco">
              <br></br>
              <div>

                <iframe src={this.props.video} width="90%" height="400px"></iframe>

              </div>

             <br></br>

              <h1 className="subtitle">
                {this.props.title}
              </h1>

              <p className="parrafo">
                {this.props.description}
              </p>

            </div>
          </td>
          <td className="derecha">
            <div className="cajaTrans">
              <button className="proxbtn"> Próximo > </button>
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
              <button className="orangebtn"> Abandonar Lección  </button>
            </div>
          </td>
        </tr>
      </table>


    </div>


  );
}

export default Lesson;
