import React from "react";
import './Lesson.css';
import { withRouter } from "react-router-dom";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { headers, SERVER_URL } from "./Signup";
import "./Quiz.css";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";

class Quiz extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      choices: [],
      value: '',
      helperText: '',
      error: false,
      score: [],
      currentScore: this.props.xp,
      rand: 0
    }
  }

  componentDidMount() {
    if (this.props.imageUrl) {
      this.getChoices();
    }
    this.getQuizScore();
    this.setState({
      rand: this.generateRand()
    });
    console.log(this.state.rand);
  }


  getChoices() {
    axios.get(SERVER_URL + "choices/quiz/" + this.props.quizId, headers).then(res => {
      console.log(res);
      this.setState({
        choices: res.data.choices
      });
    });
  }

  getQuizScore() {
    axios.get(SERVER_URL + "scores/userAndQuiz/" + this.props.userId + "/" + this.props.quizId).then(res => {
      console.log(res);
      this.setState({
        score: res.data.scores
      });
    })
  }

  handleRadioChange = (event) => {
    this.setState({
      value: event.target.value,
      helperText: '',
      error: false
    })
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.value === this.props.quizAns) {
      this.setState({
        helperText: '¡Correcto!',
        error: false
      });
      let myScore = {
        user_id: this.props.userId,
        quiz_id: this.props.quizId,
        lesson_id: this.props.lessonId,
        gained_xp: this.state.currentScore
      }
      axios.post(SERVER_URL + 'scores', myScore).then(res => {
        console.log(res);
        this.setState({
          score: res.data.score
        })
      })
    } else if (this.state.value && this.value != this.props.quizAns) {
      if (this.state.currentScore > 0) {
        this.setState({
          helperText: 'Opción incorrecta',
          currentScore: this.state.currentScore - 1,
          error: true
        })
      } else {
        this.setState({
          helperText: 'Opción incorrecta',
          error: true
        })
      }
    } else {
      this.setState({
        helperText: 'Por favor seleccione una opción',
        error: true
      })
    }
  };

  generateRand(){
    const min = 1;
    const max = 100;
    return min+ (Math.random()*(max-min));
  }

  render() {

    console.log(this.state.score);

    return (
      <div className="back" key={'quizz' + this.props.quizId}>
        <div style={{ height: "20px" }}><br /></div>
        <h1 className="title">
          {this.props.quizName}
        </h1>
        <br />
        <table className="tableau">
          <tbody>
            <tr>
              <td>
                <div className="cuadroBlanco">

                  <h1 className="subtitle">
                    {this.props.question}
                  </h1>
                  <div>
                    {this.props.modelUrl && <App key={'mod'+this.props.modelUrl+this.state.rand} rand={this.state.rand} modelUrl={this.props.modelUrl}></App>}
                    {this.props.imageUrl && (<img src={this.props.imageUrl}
                      alt="" style={{ marginTop: '10px' }}></img>)}
                  </div>
                  <br />
                </div>
              </td>
              <td className="derecha">
                <div className="cajaTrans">
                  <button className="proxbtn" onClick={() => {
                    this.props.getNextQuiz()
                  }}> Próximo
                  </button>
                </div>
                <div className="cajaAzul">
                  {!this.state.score?.gained_xp && <div className="helperTxt" style={{ marginBottom: '25px', marginTop: '25xp' }}>Puntuación máxima: {this.props.xp}</div>}
                  {this.state.score?.gained_xp && <div className="helperTxt scoreOfUser">Puntuación obtenida: {this.state.score.gained_xp}/{this.props.xp}</div>}
                  <form onSubmit={this.handleSubmit}>
                    <FormControl component="fieldset" error={this.error} style={{ width: '100%' }} >
                      <RadioGroup aria-label="quiz" name="quiz" value={this.state.value} onChange={this.handleRadioChange} style={{ paddingLeft: '40px' }} >
                        {this.state.choices?.map(choice => (
                          <FormControlLabel key={'mychoice' + choice.choice_text} value={choice.choice_text} control={<Radio />} label={choice.choice_text} ></FormControlLabel>
                        ))}
                      </RadioGroup>
                      <div className="helperTxt">{this.state.helperText}</div>
                      <br />
                      <div className="verificarBtn">
                        <button type="submit" className="yellowBtn">Verificar</button>
                      </div>
                    </FormControl>
                  </form>
                </div>
                <br />
                <div className="cajaTrans">
                  <button className="orangebtn" onClick={() => this.props.quitQuiz()}> Abandonar Prueba  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default withRouter(Quiz);
