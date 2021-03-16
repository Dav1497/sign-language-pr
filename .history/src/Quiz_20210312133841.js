import React, { useReducer, useState } from "react";
import './Lesson.css';
import { Input, FormGroup, Label, Form, Container, Button, Col, Row } from 'reactstrap';
import video from "./images/video.png";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { headers, SERVER_URL } from "./Signup";
import Nav from "./Nav";
import 'bootstrap/dist/css/bootstrap.min.css';

class Quiz extends React.Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     quiz: ""
  //   }
  // }

  // componentDidMount() {
  //   const qid = this.props.match.params.qid;
  //   console.log(qid);
  //   this.getQuizData(qid);
  // }

  // getQuizData(qid) {
  //   axios.get(SERVER_URL + "quizzes/" + qid, headers).then(res => {
  //     console.log(res);
  //     this.setState({
  //       quiz: res.data.quiz
  //     });
  //   })
  // }

  render() {
    return (
      <body>
        <Nav></Nav>
        <div className="back">
          {/* <div className="divAzul"/> */}
          <div style={{ height: "20px" }}><br /></div>
          <h1 className="title">
            {/* {this.state.quiz.lname}: {this.state.quiz.qname} */} Titulo
            </h1>
          <br />
          <table className="tableau">
            <tr>
              <td>
                <div className="cuadroBlanco">
                  
                  <h1 className="subtitle">
                    {/* {this.state.quiz.question} */}
                    subtitle 
                    {/* {this.state.lesson.max_xp} */}
                   aqui va la pregunta
                  </h1>
                  <div>
                    <iframe src=""
                    // {this.state.quiz.image_url} 
                    width="90%" height="500px"></iframe>
                  </div>
                 <br></br>
                </div>
              </td>
              <td className="derecha">
                <div className="cajaTrans">
                  <button className="proxbtn"> Próximo </button>
                </div>
                <br></br>
                <div className="cajaAzul">
                <div class="form-check">
   <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="a" checked></input>
   <label class="form-check-label" for="exampleRadios1">
   A
   </label>
</div>
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
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
      </body>

    );
  }
}

export default withRouter(Quiz);
