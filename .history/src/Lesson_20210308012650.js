import React, { useReducer, useState } from "react";
import './Lesson.css';
import { Input, FormGroup, Label, Form, Container, Button, Col, Row } from 'reactstrap';
import video from "./images/video.png";

function Lesson() {

  return (

    <div className="back">
<h1 className="title">Lección: Abecedario</h1>
     
<table>
  <tr>
    <td>
<div className="cuadroBlanco">
  <br></br>

<img src={video} alt="video" className="video" />
<br></br>

<h1 className="subtitle">
  El Abecedario
</h1>

</div>
    </td>
    <td>

    </td>
  </tr>
</table>


    </div>


  );
}

export default Lesson;