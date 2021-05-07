import React from "react";
import './Lesson.css';
import { withRouter } from "react-router-dom";
import axios from "axios";
import { headers, SERVER_URL } from "./Signup";
import Nav from "./Nav";
import Quiz from 'react-quiz-component-estefiversion';
import App from "./App";
import { storage } from "./firebase";
import { Player, ControlBar } from 'video-react';
import YouTube from 'react-youtube';

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
      modelIdx: -1,
      savedQuiz: false,
      lessonQuestions: {},
      quiz_summary_obj: ""
    }
  }

  componentDidMount() {
    this.getLoggedInUser();
    const lid = this.props.match.params.lid;
    this.getLessonQuestions(lid);
    this.getLessonData(lid);
  }

  async getLessonData(lid) {
    await axios.get(SERVER_URL + "lessons/" + lid, headers).then(res => {
      console.log(res);
      this.setState({
        lesson: res.data.lesson,
        models: res.data.lesson.models
      });
    })
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

  async getLessonQuestions(lid) {
    await axios.get(SERVER_URL+'questions/lesson/'+lid).then(res=> {
      res.data.questions.map(q => {
        const new_ans = []
        q.answers.map(a => {
          new_ans.push(a.answer);
        })
        q.answers = new_ans;
      })
      console.log(res.data.questions);
      this.setState({lessonQuestions: res.data.questions});
      this.getLessonScores(lid);
    })
  }

  async getLoggedInUser() {
    let uid = localStorage.getItem('loggedInUserID');
    await axios.get(SERVER_URL + "users/" + uid, headers).then(res => {
      this.setState({
        loggedInUser: res.data.user
      });
    })
  }

  async getLessonScores(lid) {
    let uid = localStorage.getItem('loggedInUserID');
    const quiz_sum = {
      correctPoints: -1,
      numberOfCorrectAnswers: -1,
      numberOfIncorrectAnswers: -1,
      numberOfQuestions: -1,
      totalPoints: -1,
      userInput: [],
      questions: [],
    }
    await axios.get(SERVER_URL + 'scores/lesson/'+lid+'/'+uid).then(res => {
      if(res.data.scores.length > 0) {
        const my_scores = res.data.scores[0];
        quiz_sum.correctPoints = my_scores.correctPoints;
        quiz_sum.numberOfCorrectAnswers = my_scores.numberOfCorrectAnswers;
        quiz_sum.numberOfIncorrectAnswers = my_scores.numberOfIncorrectAnswers;
        quiz_sum.numberOfQuestions = my_scores.numberOfQuestions;
        quiz_sum.totalPoints = my_scores.totalPoints;
        my_scores.userInput.map(uio => {
          quiz_sum.userInput.push(uio.input);
        })
        quiz_sum.questions = this.state.lessonQuestions;
        console.log(quiz_sum);
        // this.setState({quiz_summary_obj: quiz_sum});
      }
    })
  }

  clickModel(idx) {
    this.setState({
      modelIdx: idx,
      modelVisible: true,
      quizVisible:false
    })
  }

  clickVideo(){
    this.setState({
      modelVisible: false,
      quizVisible: false
    })
  }

  async onCompleteAction(obj)  {
    console.log(obj);
    const my_score = {
      user_id: this.state.loggedInUser.user_id,
      lesson_id: this.state.lesson.lesson_id,
      numberOfQuestions: obj.numberOfQuestions,
      numberOfCorrectAnswers: obj.numberOfCorrectAnswers,
      numberOfIncorrectAnswers: obj.numberOfIncorrectAnswers,
      totalPoints: obj.totalPoints,
      correctPoints: obj.correctPoints
    }
    if(!this.state.savedQuiz && !this.state.quiz_summary_obj && my_score.totalPoints > 0) {
      await axios.post(SERVER_URL+'scores', my_score).then(res => {
        console.log(res);
        this.setState({ savedQuiz: true });
        this.saveUserInputs(res.data.score.score_id, obj.userInput)
      });
    }
    this.activityDone("quiz")
  }

  async saveUserInputs(score_id, user_arr) {
    user_arr.map(ui => {
      const new_ui = {
        score_id: score_id,
        input: ui
      }
      axios.post(SERVER_URL+'userInput', new_ui).then(res=> {
        console.log(res);
      })
    })
  }

  async activityDone(type){
    const activity ={
      lesson_id:this.state.lesson.lesson_id,
      user_id:this.state.loggedInUser?.user_id,
      type: type,
      isCompleted: true,
    }
    console.log(activity);
  await axios.post(SERVER_URL+'progress', activity).then(res=> {
      console.log("done");
      console.log(res);
      console.log("done");
    })
  }

   myCallback (){ 
     console.log('Video has ended');
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
                      <p className="textoAzulA" onClick={() => {this.clickVideo();}}>Video</p>
                      <p className="textoAzulA" onClick={() => {this.getLessonQuiz();}}>Prueba</p>
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
                    {!this.state.quiz_summary_obj && <Quiz quiz={this.state.quiz} onComplete={this.onCompleteAction.bind(this)}></Quiz>}
                    {this.state.quiz_summary_obj && <Quiz quiz={this.state.quiz} onComplete={this.onCompleteAction.bind(this)} quizSummaryObject={this.state.quiz_summary_obj}></Quiz>}
                  </div>}
                  {this.state.modelVisible && <div className="cuadroBlanco" style={{paddingBottom:'20px'}}>
                    <p style={{fontSize:'20px', fontFamily:'Lexend'}}>{this.state.models[this.state.modelIdx].question}</p>
                    <App
                    modelUrl={this.state.models[this.state.modelIdx].model_url}
                    model_id={this.state.models[this.state.modelIdx].model_id}
                    boxes={this.state.models[this.state.modelIdx].boxes}
                    classes={this.state.models[this.state.modelIdx].classes}
                    scores={this.state.models[this.state.modelIdx].scores}
                    answer={this.state.models[this.state.modelIdx].answer}
                    user_id={this.state.loggedInUser.user_id}
                    lesson_id={this.state.lesson.lesson_id}
                    />
                    </div>}
                  {!this.state.quizVisible && !this.state.modelVisible && <div className="cuadroBlanco">
                    <br></br>
                    <div>
                      <YouTube videoId={this.state.lesson.video_url} opts={{width:"90%", height:"500px", playerVars:{rel:0}}} onEnd={this.activityDone("video")}></YouTube>
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
