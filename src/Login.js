import React, { useState } from "react";
import './Login.css';
import { Input, FormGroup, Label, Form, Container, Button, Col, Row } from 'reactstrap';
import { useHistory } from "react-router";
import axios from "axios";
import { SERVER_URL, headers } from "./Signup";



function Login(props) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  let history = useHistory();

  const handleEmailChange = event => {
    setEmail(event.target.value)
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value)
  };

  const handleSubmit = event => {
    event.preventDefault();
    const lgUser = {
      email : email,
      password : password
    }

    axios.post(SERVER_URL + "login", lgUser, headers)
    .then(response => {
      console.log(response);
      localStorage.setItem('loggedInUserID', response.data.user.user_id);
      history.push('/home');
    })
    .catch(error => console.log('Form submit error', error))
  };

  return (
<div>

        <Container className="caja" >

          <Form className="form" onSubmit={ handleSubmit} >
            <br>
            </br>
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
                  <Button className="verde" color="success" type="submit"  >Iniciar Sesión</Button>
                </Row>
                <br>
                </br>
                <Row>
                  <Button className="naranja"  onClick={()=>{props.goToRegister()}}>Crear Cuenta</Button>
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

export default Login;
