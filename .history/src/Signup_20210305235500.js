import React, { useReducer, useState } from "react";
import './Signup.css';
import { Input, FormGroup, Label, Form, Container, Button, Col, Row } from 'reactstrap';
import axios from "axios";

const SERVER_URL = "http://localhost:5000/"

function Signup() {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const handleFirstNameChange = event => {
    setFirstName(event.target.value)
  };

  const handleLastNameChange = event => {
    setLastName(event.target.value)
  };

  const handleEmailChange = event => {
    setEmail(event.target.value)
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value)
  };

  const handleSubmit = event => {
    event.preventDefault();
    const newUser = {
      name : firstName + " " + lastName,
      email : email,
      password : password
    }
    axios.post(SERVER_URL, newUser)
    .then(response => console.log(response))
    .catch(error => console.log('Form submit error', error))
  };

  return (
<div>

        <Container className="caja" >

          <Form className="form" onSubmit={ handleSubmit}>
            <br>
            </br>
            <Col>
              <FormGroup inline>
                <Label>Nombre</Label>
                <Input
                  type="firstName"
                  name="text"
                  id="firstName"
                  placeholder="Nombre"
                  onChange={handleFirstNameChange}
                  value={firstName}

                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup inline>
              <Label>Apellido</Label>
                <Input
                  type="lastName"
                  name="text"

                  id="lastName"
                  placeholder="Apellido"

                  onChange={handleLastNameChange}
                  value={lastName}

                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup inline>
                <Label>Correo Electrónico</Label>
                <Input
                  type="email"
                  name="email"

                  id="exampleEmail"
                  placeholder="email"

                  onChange={handleEmailChange}
                  value={email}

                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup inline>
                <Label for="examplePassword">Contraseña</Label>
                <Input
                  type="password"
                  name="password"

                  id="examplePassword"
                  placeholder="contraseña"

                  onChange={handlePasswordChange}
                  value={password}

                />
              </FormGroup>
            </Col>
            <Col>
              <div className="text-center">


                <Row>
                  <Button className="verde" color="success"   >Iniciar Sesión</Button>
                </Row>
                <br>
                </br>
                <Row>
                  <Button className="naranja" type="submit" >Crear Cuenta</Button>
                </Row>

              </div>
            </Col>
          </Form>
          <br>
          </br>
        </Container>

      </div>



  );
}

export default Signup;