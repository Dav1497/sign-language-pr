import React from "react";
import './Lesson.css';
import { withRouter } from "react-router-dom";
import axios from "axios";
import { headers, SERVER_URL } from "./Signup";
import Nav from "./Nav";
// import Quiz from "./Quiz";
import Quiz from 'react-quiz-component';

class Lesson extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lesson: "",
      quizzes: [],
      currIndex: -1,
      quizVisible: false,
      loggedInUser: null,
      quiz: {}
    }
  }

  componentDidMount() {
    this.getLoggedInUser();
    const lid = this.props.match.params.lid;
    this.getLessonData(lid);
    this.getLessonQuizzes(lid);
    this.getCustomQuiz();
  }

  getLessonData(lid) {
    axios.get(SERVER_URL + "lessons/" + lid, headers).then(res => {
      this.setState({
        lesson: res.data.lesson
      });
    })
  }

  getLessonQuizzes(lid) {
    axios.get(SERVER_URL + 'quizzes/lessons/' + lid, headers).then(res => {
      res.data.quizzes.map(q => this.state.quizzes.push(q));
      console.log(this.state.quizzes);
      this.setState({
        currIndex: -1
      });
    });
  }

  getCustomQuiz() {
    axios.get("https://raw.githubusercontent.com/estefaniatc/Models_SignLangPR/main/abc_model/abc_quiz.json").then(res=> {
    console.log(res);
    this.setState({
        quiz: res.data
      });
    })
  }

  getNextQuiz() {
    // if (this.state.currIndex + 1 < this.state.quizzes.length) {
      this.setState({
        // currIndex: this.state.currIndex + 1,
        quizVisible: true
      });
    // }
  }

  quitQuiz() {
    this.setState({
      quizVisible: false,
      currIndex: -1
    });
  }

  getLoggedInUser() {
    let uid = localStorage.getItem('loggedInUserID');
    axios.get(SERVER_URL + "users/" + uid, headers).then(res => {
      this.setState({
        loggedInUser: res.data.user
      });
    })
  }

  render() {
    // if (this.state.quizVisible) {
    //   const idx = this.state.currIndex;
    //   return (<div>
    //     {this.state.loggedInUser && <Nav
    //       loggedInUserId={this.state.loggedInUser.user_id}
    //       loggedInUserName={this.state.loggedInUser.name} />}
    //     <Quiz
    //       quiz={quiz}></Quiz>
    //   </div>

    //   );
    // }
    return (
      <div>
        {this.state.loggedInUser && <Nav
          loggedInUserId={this.state.loggedInUser.user_id}
          loggedInUserName={this.state.loggedInUser.name} />}
        <div className="back">
          <div style={{ height: "20px" }}><br /></div>
          <h1 className="title">Lección: {this.state.lesson.lname}</h1>
          <br />
          <table className="tableau">
            <tbody>
              <tr>
              <td className="derecha" >
                  <div className="detailsBox">
                  <br></br>
                  <div className="cajaAzul">
                    <p style={{fontSize:'30px', color:'black'}}>Detalles</p>
                    <hr/>
                    <p className="textoAzul">
                    Video
                    <br/>
                    Pruebas: 3
                    <br/>
                    Sesiones interactivas: 2
                    </p>
                    {this.state.quizzes.map(q => (<div className="quizName" key={'quiz_menu'+q.quiz_name} onClick={() => {
                      this.setState({
                        currIndex: this.state.quizzes.indexOf(q),
                        quizVisible: true
                      })
                    }}>Prueba : {q.quiz_name}</div>))}
                  </div>
                  <br>
                  </br>
                    <button className="proxbtn" onClick={() => {
                      this.getNextQuiz();
                    }
                    }> Comenzar prueba </button>
                    <button className="orangebtn" onClick={() => { this.props.history.push('/home') }}> Abandonar Lección  </button>
                  <br/>
                  </div>
                </td>
                <td>
                  {this.state.quizVisible && <div className="quizBlanco">
                    <Quiz quiz={this.state.quiz}></Quiz>
                    </div>}
                  {!this.state.quizVisible && <div className="cuadroBlanco">
                    <br></br>
                    <div>
                      <iframe src={this.state.lesson.video_url} width="90%" height="500px"></iframe>
                    </div>
                    <br></br>
                    <h1 className="subtitle">
                      {this.state.lesson.lname}
                    </h1>
                    <p className="parrafo">
                      {this.state.lesson.description}
                    </p>
                    <br />
                  </div>}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    );
  }
}

export default withRouter(Lesson);
