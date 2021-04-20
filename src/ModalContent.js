import React, { useReducer, useState } from "react";
import './UserBox.css';
import { storage } from "./firebase";

import { Button, Form, FormGroup, Label, Input } from "reactstrap";

function ModalContent(props) {

    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);

    const handleChange = e => {

        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = () => {

        if (image !== null) {
            const uploadTask = storage.ref(`images/${image.name}`).put(image);
            uploadTask.on(
                "state_changed",
                snapshot => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setProgress(progress);
                },
                error => {
                    console.log(error);
                },
                () => {
                    storage
                        .ref("images")
                        .child(image.name)
                        .getDownloadURL()
                        .then(url => {
                            setUrl(url);
                            props.setMyImageUrl(url);
                        });
                }
            );
        }
    };

    return (
        <div>
            <div className="centro "> <h2>Editar Perfil</h2> </div>
            <Form className="espacio">

                <div className="">
                    <table >
                        <tr>
                            <td className="" >
                                <img className="imageUpload" alt="firebase" src={url || "https://upload.wikimedia.org/wikipedia/commons/4/42/Photo-camera-in-circular-outlined-interface-button.svg"} />
                            </td>
                            <td className="centro">
                                <div className="">
                                    <progress value={progress} max="100" />
                                    <br />
                                    <br />
                                    <label for="selectedFile" class="in botonDone">
                                        Choose File
</label>
                                    <input type="file" id="selectedFile" className="in " onChange={handleChange} />

                                    <br />
                                    <button className="botonDone" onClick={handleUpload}>Upload</button>


                                </div>
                            </td>

                        </tr>

                    </table>
                </div>
                <FormGroup>
                    <br></br>

                    <Label for="exampleFirstName">Nombre</Label>
                    <Input type="firstName" name="firstName" id="firstName" placeholder="with a placeholder" />
                </FormGroup>

                <FormGroup>
                    <Label for="exampleLastName">Apellido</Label>
                    <Input type="lastName" name="lastName" id="exampleLastName" placeholder="with a placeholder" />
                </FormGroup>

                <FormGroup>
                    <Label for="exampleEmail">Correo Electrónico</Label>
                    <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
                </FormGroup>

                <FormGroup>
                    <Label for="examplePassword">Contraseña</Label>
                    <Input type="password" name="password" id="examplePassword" placeholder="with a placeholder" />
                </FormGroup>
                <div className="izquierda"><button className="botonDone">Guardar Cambios </button> </div>
            </Form>


        </div>
    );
}

export default ModalContent;
