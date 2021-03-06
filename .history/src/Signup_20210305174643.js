import React, { useReducer, useState } from "react";
import './Signup.css';
import { Input, FormGroup, Label, Form, Container, Button, Col, Row } from 'reactstrap';



function Signup() {

  return (
<div>

        <Container className="caja" >

          <Form className="form" >
            <br>
            </br>
            <Col>
              <FormGroup inline>
                <Label>Email</Label>
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
                <Label for="examplePassword">Password</Label>
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
                  <Button className="verde" color="success" type="submit"  >Iniciar Sesión</Button>
                </Row>
                <br>
                </br>
                <Row>
                  <Button className="naranja"  >Crear Cuenta</Button>
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
