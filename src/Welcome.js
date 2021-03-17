import React, { useReducer, useState } from "react";
import './Welcome.css';
import { Input, FormGroup, Label, Form, Container, Button, Col, Row } from 'reactstrap';
import Login from './Login';
import Signup from './Signup';

class Welcome extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isLoginVisible: true
    }
  }

  goToRegister(){
    this.setState({
      isLoginVisible: false
    })
  }

  goToLogin(){
    this.setState({
      isLoginVisible: true
    })
  }

  render() {
    return (
      <div className="bg">

        <div className="behind">

          <div className="ellipse4">
          </div>

          <div className="ellipse3">
          </div>

          <div className="ellipse2">
          </div>

          <div className="ellipse1">

          </div>

          <div className="logo">

          </div>

        </div>

        <div className="front">
          <h1 className="nombre" style={{ fontFamily: "Varela Round" }}>Sign Language Puerto Rico</h1>
          <hr className="linea"></hr>
        </div>

        <br></br>
        <br></br>

        <div className="contenedor">
          {this.state.isLoginVisible && (<Login goToRegister={this.goToRegister.bind(this)}></Login>)}
          {!this.state.isLoginVisible && (<Signup goToLogin={this.goToLogin.bind(this)}></Signup>)}
        </div>
      </div>

    );
  }
}

export default Welcome;
