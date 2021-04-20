import React from "react";
import "./Nav.css";
import { Link } from "react-router-dom";
import logo from "./images/logo.PNG";
import UserBox from './UserBox';
import { withRouter } from 'react-router-dom';

function Nav(props) {
    return (
        <div className="backg">
            <table className="barra">
                <tbody>
                    <tr>
                        <td>
                            <img src={logo} alt="logo" className="loguito" onClick={() => { props.history.push('/home') }} />
                        </td>
                        <td className="letras">
                            <ul className="nav">
                                <li className="listItem">Diccionario</li>
                                <li className="listItem">Sobre Nosotros</li>
                            </ul>
                        </td>
                        <td className="cajita" style={{ textAlign: "right" }}>
                            <UserBox
                                loggedInUserId={props.loggedInUserId}
                                loggedInUserName={props.loggedInUserName} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default withRouter(Nav);
