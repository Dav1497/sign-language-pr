import React, { useReducer, useState } from "react";
import './Lesson.css';
import { Input, FormGroup, Label, Form, Container, Button, Col, Row } from 'reactstrap';
import video from "./images/video.png";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { headers, SERVER_URL } from "./Signup";
import Nav from "./Nav";

class Quiz extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lesson: ""
    }
  }

  componentDidMount() {
    const qid = this.props.match.params.qid;
    console.log(qid);
    this.getQuizData(qid);
  }

  getQuizData(qid) {
    axios.get(SERVER_URL + "quizzes/" + qid, headers).then(res => {
      console.log(res);
      this.setState({
        quiz: res.data.quiz
      });
    })
  }

  render() {
    return (
      <body>
        <Nav></Nav>
        <div className="back">
          {/* <div className="divAzul"/> */}
          <div style={{ height: "20px" }}><br /></div>
          <h1 className="title">{this.state.quiz.lname}: {this.state.quiz.qname}</h1>
          <br />
          <table className="tableau">
            <tr>
              <td>
                <div className="cuadroBlanco">
                  <br></br>
                  <h1 className="subtitle">
                    {this.state.quiz.question}
                  </h1>
                  <div>
                    <iframe src={this.state.quiz.image_url} width="90%" height="500px"></iframe>
                  </div>
                 
                </div>
              </td>
              <td className="derecha">
                <div className="cajaTrans">
                  <button className="proxbtn"> Próximo </button>
                </div>
                <br></br>
                <div className="cajaAzul">
                  <h1>Max XP: {this.state.lesson.max_xp} aqui va la pregunta</h1>
                  <br>
                  </br>
                  <h2 className="textoAzul">Video</h2>
                  <h2>Prueba 1</h2>
                  <h2>Prueba 2</h2>
                  <h2>Prueba 3</h2>
                </div>
                <br>
                </br>
                <div className="cajaTrans">
                  <button className="orangebtn" onClick={()=>{this.props.history.push('/home')}}> Abandonar Lección  </button>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </body>

    );
  }
}

export default withRouter(Quiz);