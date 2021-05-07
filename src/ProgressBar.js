import Progress from 'react-progressbar';
import React from "react";
import { Redirect, withRouter } from "react-router-dom";
import axios from "axios";
import { SERVER_URL, headers } from "./Signup";

class ProgressBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: {
        user_id: '',
        name: '',
        email: '',
        password: '',
        picture_url: '',
        progress: []
      },
      result: 0,
    }
  }

  async componentDidMount() {
    await this.getLoggedInUser();
    await this.getProgress();
    this.calculate();
  }

  async getLoggedInUser() {
    let uid = localStorage.getItem('loggedInUserID');
    await axios.get(SERVER_URL + "users/" + uid, headers).then(res => {
      this.setState({
        loggedInUser: res.data.user
      });
    })
  }

  async getProgress() {
    let lid = this.props.lesson_id;
    let uid = this.state.loggedInUser.user_id

   await  axios.get(SERVER_URL + "progress/lesson/" + lid + "/" + uid, headers).then(res => {
      this.setState({
        current: res.data.progress.length
      });
    })
  }

  calculate(){
  this.setState({
    result:(this.state.current/this.props.total_activities)*100
  })
  }

  render() {
    return (
      <div className="progress">
        <Progress height="21px" completed={this.state.result} />
      </div>
    )
  }
}

export default withRouter(ProgressBar);