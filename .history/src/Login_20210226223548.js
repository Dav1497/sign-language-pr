import React, { useReducer, useState } from "react";
import './Login.css';
import { Input, FormGroup, Label, Form, Container, Button, Col} from 'reactstrap';


function Login() {

  return (
    

      <div className="bg">
        
<h1 className="nombre"  style={{fontFamily:"Varela Round"}}>Sign Language Puerto Rico</h1>
<hr className="linea"></hr>
<br></br>
<Container className="caja">

<Form className="form"  >
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
          <div className="text-right">

          
          <Button  color="danger" type="submit"  >Submit</Button>
          </div>
        </Form>
<br>
</br>
      </Container>


      </div>
  
 
  );
}

export default Login;
