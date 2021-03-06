import React, { useReducer, useState } from "react";
import './Welcome.css';
import { Input, FormGroup, Label, Form, Container, Button, Col, Row } from 'reactstrap';
import Login from './Login';
import Signup from './Signup';

function Welcome() {

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
       {/* <Login></Login> */}
      <Signup></Signup>
      </div>
    </div>


  );
}

export default Welcome;
