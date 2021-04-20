import React from "react";
import './Lesson.css';
import { withRouter } from "react-router-dom";
import axios from "axios";
import { headers, SERVER_URL } from "./Signup";
import Nav from "./Nav";
import Quiz from "./Quiz";

class Lesson extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lesson: "",
      quizzes: [],
      currIndex: -1,
      quizVisible: false,
      loggedInUser: null
    }
  }

  componentDidMount() {
    this.getLoggedInUser();
    const lid = this.props.match.params.lid;
    this.getLessonData(lid);
    this.getLessonQuizzes(lid);
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

  getNextQuiz() {
    if (this.state.currIndex + 1 < this.state.quizzes.length) {
      this.setState({
        currIndex: this.state.currIndex + 1,
        quizVisible: true
      });
    }
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
    if (this.state.quizVisible) {
      const idx = this.state.currIndex;
      return (<div key={'LessQuiz' + this.state.quizzes[idx].quiz_id}>
        {this.state.loggedInUser && <Nav
          loggedInUserId={this.state.loggedInUser.user_id}
          loggedInUserName={this.state.loggedInUser.name} />}
        <Quiz
          key={"my_quiz"+this.state.quizzes[idx].quiz_id}
          quizName={this.state.quizzes[idx].quiz_name}
          quizId={this.state.quizzes[idx].quiz_id}
          xp={this.state.quizzes[idx].quiz_xp}
          question={this.state.quizzes[idx].question}
          modelUrl={this.state.quizzes[idx].model_url}
          imageUrl={this.state.quizzes[idx].img_url}
          getNextQuiz={this.getNextQuiz.bind(this)}
          lessonId={this.state.lesson.lesson_id}
          quitQuiz={this.quitQuiz.bind(this)}
          quizAns={this.state.quizzes[idx].answer}
          userId={this.state.loggedInUser.user_id}
        ></Quiz>
      </div>

      );
    }
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
                <td>
                  <div className="cuadroBlanco">
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
                  </div>
                </td>
                <td className="derecha">
                  <div className="cajaTrans">
                    <button className="proxbtn" onClick={() => {
                      this.getNextQuiz();
                    }
                    }> Próximo </button>
                  </div>
                  <br></br>
                  <div className="cajaAzul">
                    <h1>Max XP: {this.state.lesson.max_xp}</h1>
                    <h2 className="textoAzul">Video</h2>
                    {this.state.quizzes.map(q => (<div className="quizName" key={'quiz_menu'+q.quiz_name} onClick={() => {
                      this.setState({
                        currIndex: this.state.quizzes.indexOf(q),
                        quizVisible: true
                      })
                    }}>Prueba : {q.quiz_name}</div>))}
                  </div>
                  <br>
                  </br>
                  <div className="cajaTrans">
                    <button className="orangebtn" onClick={() => { this.props.history.push('/home') }}> Abandonar Lección  </button>
                  </div>
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
