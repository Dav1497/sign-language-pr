import React, { useReducer, useState } from "react";
import './Signup.css';
import { Input, FormGroup, Label, Form, Container, Button, Col, Row } from 'reactstrap';
import axios from "axios";



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

  };

  return (
<div>

        <Container className="caja" >

          <Form className="form" onSubmit={ /* your function here */ }>
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
