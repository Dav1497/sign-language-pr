import React, { useState } from "react";
import './Signup.css';
import { Input, FormGroup, Label, Form, Container, Button, Col, Row } from 'reactstrap';
import axios from "axios";
import { useHistory } from "react-router";

export const SERVER_URL = "https://signlanguagepr-backend.herokuapp.com/"
export const headers = {
  'Access-Control-Allow-Origin': '*'
}

function Signup(props) {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  let history = useHistory();

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
      name: firstName + " " + lastName,
      email: email,
      password: password,
      picture_url: "https://drive.google.com/uc?export=view&id=1aJ8YYrGbfFupaeHQJePX9wUVl01-Eml6"
    }

    axios.post(SERVER_URL + "users", newUser, headers)
      .then(response => {
        console.log(response)
        localStorage.setItem('loggedInUserID', response.data.user.user_id);
        history.push('/home');
      })
      .catch(error => console.log('Form submit error', error))
  };

  return (
    <div>

      <Container className="caja" >

        <Form className="form" onSubmit={handleSubmit}>
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
                <Button className="verde naranja" >Crear Cuenta</Button>
              </Row>
              <br>
              </br>
              <Row>
                ¿Ya tienes cuenta? <a href="#" onClick={() => { props.goToLogin() }}>Iniciar Sesión</a>
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
