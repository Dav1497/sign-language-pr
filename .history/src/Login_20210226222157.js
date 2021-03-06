import React, { useReducer, useState } from "react";
import './Login.css';


function Login() {

  return (
    

      <div className="bg">
        
<h1 className="nombre"  style={{fontFamily:"Varela Round"}}>Sign Language Puerto Rico</h1>
<hr className="linea"></hr>

<Form className="form" onSubmit={handleSubmit} >
  <br>
  </br>
  <div>

  <Form className="form" onSubmit={handleSubmit} >
  <br>
  </br>
          <Col>
            <FormGroup inline>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                value={email}
                id="exampleEmail"
                placeholder="email"
                onChange={({ target }) => setEmail(target.value)}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup inline>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                name="password"
                value={password}
                id="examplePassword"
                placeholder="contraseña"
                onChange={({ target }) => setPassword(target.value)}
              />
            </FormGroup>
          </Col>
          <div className="text-right">

          
          <Button  color="danger" type="submit"  >Submit</Button>
          </div>
        </Form>

        </div>


      </div>
  
 
  );
}

export default Login;
