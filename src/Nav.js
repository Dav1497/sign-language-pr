import React, {useState} from "react";
import "./Nav.css";
import { Link } from "react-router-dom";
import logo from "./images/logo.PNG";
import UserBox from './UserBox';
import { withRouter } from 'react-router-dom';

import axios from "axios";
import { SERVER_URL, headers } from "./Signup";

function Nav(props) {
   

    const [currentUser, setUser] = useState(props.loggedInUserName);

    const [pic, setPic] = useState("");
    const [password, setPassword] = useState("");

    let uid = localStorage.getItem('loggedInUserID');
    axios.get(SERVER_URL + "users/" + uid, headers).then(res => {
       setPic(res.data.user.picture_url)
       
    });
    
    return (
        <div className="backg">
            <table className="barra">
                <tbody>
                    <tr>
                        <td className="ancho">
                            <img src={logo} alt="logo" className="loguito" onClick={() => { props.history.push('/home') }} />
                        </td>
                        <td className="letras">
                            <ul className="red">
                                <Link to="/dictionary">
                                <li className="listItem ">Diccionario</li>
                                </Link>
                                <Link to="/about">
                                <li className="listItem ">Sobre Nosotros</li>
                                </Link>
                            </ul>
                        </td>
                        <td className="cajita" style={{ textAlign: "right" }}>
                            <UserBox 
                                setUser={setUser}
                                setPic={setPic}
                                setPassword={setPassword}
                                loggedInUserId={props.loggedInUserId}
                                loggedInUserName={props.loggedInUserName}
                                pic={pic} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default withRouter(Nav);
