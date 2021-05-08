import React from "react";
import "./About.css";
import Nav from "./Nav.js";
import Footer from "./Footer.js";
import dimaris from './images/dimaris.jpeg';
import david from './images/davidCarrion.jpg'
import estefania from './images/estefania.jpeg';
import { SERVER_URL, headers } from "./Signup";
import axios from "axios";
import { useState } from "react";
import { Redirect, withRouter } from "react-router-dom";

function About(props) {

    let uid = localStorage.getItem('loggedInUserID');
    const [isObtained, setIsObtained] = useState(false)
    const [user, setUser] = useState(
        {
            email: "",
            name: "",
            password: "",
            user_id: -1,
            picture_url: ""
        }
    )

    if (!isObtained) {
        getLoggedInUser();
    }

    function getLoggedInUser() {
        axios.get(SERVER_URL + "users/" + uid, headers).then(res => {
            setUser({ ...user, ...res.data.user })
        })
        setIsObtained(true)
    }

    if (!localStorage.getItem('loggedInUserID')) {
        return <Redirect to="/"></Redirect>
    }
    else {

        return (

            <div className="" >
                {user && <Nav
                    loggedInUserId={user.user_id}
                    loggedInUserName={user.name} />}
                <div className="c">
                    <table className="t" >
                        <tbody>
                            <tr>
                                <td>
                                    <h2 className="h l">Recurso Educativo</h2>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <br></br>
                                    <div className="">
                                        <img src={dimaris} alt="dimaris" className="i"></img>
                                    </div>

                                </td>
                                <td >
                                    <div className="j">
                                        <p className="p">
                                            Dimaris Pachecho Rodríguez es educadura de lenguaje de
                                            señas y trabaja en el Departamento de Justicia de Puerto
                                            Rico. En su tiempo trabajando allí ha identificado la necesidad
                                            y la falta de conocimiento por parte del personal para así
                                            servir a la comunidad sorda. En su tiempo libre se dedica a
                                            ofrecer clases de seña.</p>
                                    </div>

                                </td>
                            </tr>
                            <tr > <td colSpan="2" > <hr></hr> </td> </tr>

                            <tr>
                                <td>
                                    <h2 className="h l">Desarrolladores</h2>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <br></br>
                                    <div className="">
                                        <img src={david} alt="david" className="i"></img>
                                    </div>

                                </td>
                                <td>
                                    <div className="">
                                        <img src={estefania} alt="estefania" className="i"></img>
                                    </div>
                                </td>

                            </tr>

                            <tr>
                                <td>
                                    <br></br>
                                    <div className="j s">
                                        <p className="p">
                                            David Carrión es estudiante de quinto año en la Universidad de Puerto Rico:
                                            Recinto de Mayagüez. Sabe un poco de lenguaje de señas pero le gustaría
                                            aprender más en el futuro. Sus intereses incluyen dibujar, leer y ver una buena
                                            película.
            </p>
                                    </div>
                                </td>
                                <td>
                                    <br></br>
                                    <div className="j s">
                                        <p className="p">

                                            Estefanía Torres es estudiante de quinto año en la Universidad de Puerto Rico:
                                            Recinto de Mayagüez. Aprendió un poco de lenguaje de señas haciendo
                                            este proyecto y le gustaría aprender más en el futuro. Sus intereses
                                            incluyen visitar restaurantes locales, ir de compras y tomarse una
                                            rica taza de café.
                                    </p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <br></br>
                </div>
                <Footer></Footer>
            </div>

        );
    }
}

export default About;
