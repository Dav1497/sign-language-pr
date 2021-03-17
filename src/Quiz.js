import React, { useReducer, useState } from "react";
import './Lesson.css';
import { Input, FormGroup, Label, Form, Container, Button, Col, Row } from 'reactstrap';
import video from "./images/video.png";
import { withRouter } from "react-router-dom";
import Nav from "./Nav";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function Quiz(props) {

    return (
      <body>
        <div className="back">
          {/* <div className="divAzul"/> */}
          <div style={{ height: "20px" }}><br /></div>
          <h1 className="title">
            {props.quizName}
          </h1>
          <br />
          <table className="tableau">
            <tr>
              <td>
                <div className="cuadroBlanco">

                  <h1 className="subtitle">
                    {props.question}
                    {/* subtitle */}
                    {props.xp}
                    {/* aqui va la pregunta */}
                  </h1>
                  <div>
                    {props.modelUrl && <App modelUrl={props.modelUrl}></App>}
                    {props.imgUrl && (<iframe src={props.imgUrl}
                      width="90%" height="500px"></iframe>)}
                  </div>
                  <br></br>
                </div>
              </td>
              <td className="derecha">
                <div className="cajaTrans">
                  <button className="proxbtn" onClick={()=>{
                    props.getNextQuiz()}}> Próximo
                  </button>
                </div>
                <br></br>
                {props.ImgUrl && <div className="cajaAzul">
                  <div>
                    <input type="radio" name="radio"></input>
                    <label className="radiocaja">Four
                    
                    <span className="radiogaga"></span>
                    </label>
                  </div>
                  <div>
                    <input type="radio" name="radio"></input>
                    <label className="radiocaja">Four
                    
                    <span className="radiogaga"></span>
                    </label>
                  </div>
                  <div>
                    <input type="radio" name="radio"></input>
                    <label className="radiocaja">Four
                    
                    <span className="radiogaga"></span>
                    </label>
                  </div>
                  <div>
                    <input type="radio" name="radio"></input>
                    <label className="radiocaja">Four
                    
                    <span className="radiogaga"></span>
                    </label>
                  </div>
                </div>}
                <br>
                </br>
                <div className="cajaTrans">
                  <button className="orangebtn" onClick={() => props.quitQuiz()}> Abandonar Prueba  </button>
                </div>
              </td>
            </tr>
          </table>
        </div>

      </body>

    );
}

export default withRouter(Quiz);
