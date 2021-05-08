import React, { useReducer, useState } from "react";
import './UserBox.css';
import { storage } from "./firebase";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import { SERVER_URL, headers } from "./Signup";
import ReactFirebaseFileUpload from "./ReactFirebaseFileUpload.js"
class ModalContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            myImgUrl: props.pic,
            userData: {
                user_id:"",
                picture_url:"",
                name:"",
                email:"",
                password:""
            }
        }
    }

    async componentDidMount() {
        let uid = localStorage.getItem('loggedInUserID');
        axios.get(SERVER_URL + "users/" + uid, headers).then(res => {
            // console.log(res.data.user);
            this.setState({
                userData:{
                    user_id:res.data.user.user_id,
                    picture_url: res.data.user.picture_url,
                    name: res.data.user.name,
                    email: res.data.user.email,
                    password: res.data.user.password
                }
            })
        });
    }

    async updateUser() {
        console.log(this.state.userData)
        const new_obj = {
            name: this.state.userData.name,
            email: this.state.userData.email,
            password: this.state.userData.password,
            picture_url: this.state.myImgUrl,
            user_id: this.state.userData.user_id
        }
       console.log(new_obj.picture_url)
       await axios.put(SERVER_URL + "users/"+ this.state.userData.user_id, new_obj).then(response => {
            console.log(response.data.user);
            this.props.setUser(response.data.user.name);
            this.props.setPic(response.data.user.picture_url);
            this.props.setPassword(response.data.user.password);
            this.props.closeModal();
        });      
    }

    handleCallback = (childData) => {
        this.setState({ myImgUrl: childData });
      };

    render() {
        return (
            <div>
                <div className="centro "> <h2>Editar Perfil</h2> </div>
                <Form className="espacio">
                <ReactFirebaseFileUpload
              parentCallback={this.handleCallback}
              url={this.props.pic}
            />
                    <FormGroup>
                        <br></br>
                        <Label for="name">Nombre</Label>
                        <Input type="name" name="name" id="name" value={this.state.userData.name}
                            onChange={(e) => {
                                let { userData } = this.state;

                                userData.name = e.target.value;

                                this.setState({ userData });
                            }} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail">Correo Electrónico</Label>
                        <Input type="email" name="email" id="exampleEmail" value={this.state.userData.email} 
                         onChange={(e) => {
                            let { userData } = this.state;

                            userData.email = e.target.value;

                            this.setState({ userData });
                        }} />
                    </FormGroup>

                    <FormGroup>
                        <Label for="examplePassword">Contraseña</Label>
                        <Input type="password" name="password" id="examplePassword" autoComplete="off" value={this.state.userData.password}
                            onChange={(e) => {
                                let { userData } = this.state;
    
                                userData.password = e.target.value;
    
                                this.setState({ userData });
                            }} />
                    </FormGroup>

                    <FormGroup>
                        {/* <Label for="url">URL</Label> */}
                        <Input readOnly type="hidden" name="url" id="url" value={this.state.myImgUrl}
                            onChange={(e) => {
                                let { userData } = this.state;
    
                                userData.picture_url = e.target.value;
    
                                this.setState({ userData });
                            }} />
                    </FormGroup>

                    <div className="izquierda">
                        <button onClick={this.updateUser.bind(this)} className="botonesDone">Guardar Cambios </button>
                    </div>
                </Form>
            </div>
        );
    }
}

export default ModalContent;
