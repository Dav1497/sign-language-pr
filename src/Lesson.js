import React from "react";
import './Lesson.css';
import { withRouter } from "react-router-dom";
import axios from "axios";
import { headers, SERVER_URL } from "./Signup";
import Nav from "./Nav";
import Quiz from 'react-quiz-component';
import App from "./App";

class Lesson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lesson: "",
      models: [],
      quizVisible: false,
      loggedInUser: null,
      quiz: {},
      modelVisible: false,
      modelIdx: -1
    }
  }

  componentDidMount() {
    this.getLoggedInUser();
    const lid = this.props.match.params.lid;
    this.getLessonData(lid);
    this.getLessonModels(lid);
  }

  async getLessonData(lid) {
    await axios.get(SERVER_URL + "lessons/" + lid, headers).then(res => {
      console.log(res);
      this.setState({
        lesson: res.data.lesson,
      });
    })
  }

  async getLessonModels(lid) {
    await axios.get(SERVER_URL + 'models/lessons/' + lid, headers).then(res => {
      console.log(res);
      this.setState({
        models: res.data.models
      })
    });
  }

  async getLessonQuiz() {
    if (this.state.lesson?.quiz_url) {
      await axios.get(this.state.lesson.quiz_url).then(res => {
        console.log(res);
        this.setState({
          quiz: res.data,
          quizVisible: true,
          modelVisible: false
        });
      })
    }
  }

  getLoggedInUser() {
    let uid = localStorage.getItem('loggedInUserID');
    axios.get(SERVER_URL + "users/" + uid, headers).then(res => {
      this.setState({
        loggedInUser: res.data.user
      });
    })
  }

  clickModel(idx) {
    this.setState({
      modelIdx: idx,
      modelVisible: true
    })
  }

  clickVideo(){
    this.setState({
      modelVisible: false,
      quizVisible: false
    })
  }

  render() {
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
                      <p style={{ fontSize: '30px', color: 'black' }}>Detalles</p>
                      <hr />
                      <p className="textoAzul">Video</p>
                      <p className="textoAzul">Prueba</p>
                      {this.state.models.length > 0 && <p className="textoAzul">Sesiones interactivas:</p>}
                      {this.state.models.map((mod, index) =>
                        <div key={'modelo'+ mod.model_id} className="modLink" onClick={()=> {this.clickModel(index)}}>
                          {mod.model_name}
                        </div>
                      )}
                    </div>
                    <br>
                    </br>
                    <button className="proxbtn" onClick={() => {
                      this.getLessonQuiz();
                    }
                    }> Comenzar prueba </button>
                    <button className="orangebtn" onClick={() => { this.props.history.push('/home') }}> Abandonar Lección  </button>
                    <br />
                  </div>
                </td>
                <td>
                  {this.state.quizVisible && this.state.quiz && <div className="quizBlanco">
                    <Quiz quiz={this.state.quiz}></Quiz>
                  </div>}
                  {this.state.modelVisible && <div className="quizBlanco">
                    <App
                    modelUrl={this.state.models[this.state.modelIdx].model_url}
                    model_id={this.state.models[this.state.modelIdx].model_id}
                    boxes={this.state.models[this.state.modelIdx].boxes}
                    classes={this.state.models[this.state.modelIdx].classes}
                    scores={this.state.models[this.state.modelIdx].scores}
                    />
                    </div>}
                  {!this.state.quizVisible && !this.state.modelVisible && <div className="cuadroBlanco">
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
