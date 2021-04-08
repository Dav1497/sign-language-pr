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


class Quiz extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      choices: [],
      value: '',
      helperText: '',
      error: false,
      score: null
    }
  }

  componentDidMount() {
    if (this.props.imageUrl) {
      this.getChoices();
    }

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
    scorepost = {
      user_id: this.props.user_id,
      quiz_id: this.props.quizId
    }
    axios.post(SERVER_URL+"scores/userAndQuiz", scorepost).then(res => {
      console.log(res);
      this.setState({
        score: res.data.score
      })
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
      })
    } else if (this.state.value && this.value != this.props.quizAns) {
      this.setState({
        helperText: 'Opción incorrecta',
        error: true
      })
    } else {
      this.setState({
        helperText: 'Por favor seleccione una opción',
        error: true
      })
    }
  };

  render() {

    console.log(this.state.choices);

    return (
      <body>
        <div className="back">
          <div style={{ height: "20px" }}><br /></div>
          <h1 className="title">
            {this.props.quizName}
          </h1>
          <br />
          <table className="tableau">
            <tr>
              <td>
                <div className="cuadroBlanco">

                  <h1 className="subtitle">
                    {this.props.question}
                  </h1>
                  <div>
                    {this.props.modelUrl && <App modelUrl={this.props.modelUrl}></App>}
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
                <div className="helperTxt" style={{marginBottom:'25px', marginTop:'25xp'}}>Puntuación máxima: {this.props.xp} XP</div>
                  <form onSubmit={this.handleSubmit}>
                    <FormControl component="fieldset" error={this.error} style={{width:'100%'}} >
                      <RadioGroup aria-label="quiz" name="quiz" value={this.state.value} onChange={this.handleRadioChange} style={{paddingLeft:'40px'}}>
                        {this.state.choices.map(choice => (
                          <FormControlLabel value={choice.choice_text} control={<Radio />} label={choice.choice_text} ></FormControlLabel>
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
                <br/>
                <div className="cajaTrans">
                  <button className="orangebtn" onClick={() => this.props.quitQuiz()}> Abandonar Prueba  </button>
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
