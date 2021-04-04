import React from "react";
import "./Nav.css";
import { Link } from "react-router-dom";
import logo from "./images/logo.PNG";
import UserBox from './UserBox';

function Nav(props) {
    return (
        <navbar>
            <div className="backg">
                <table className="barra">
                    <tr>
                        <td>
                            {/* <div className="loguito"> */}

                            <img src={logo} alt="logo" className="loguito" />

                            {/* </div> */}
                        </td>
                        <td className="letras">
                            <ul className="nav">

                                <Link to="/dictionary">
                                <li className="listItem">Diccionario</li>
                                </Link>
                                <Link to="/about">
                                <li className="listItem">Sobre Nosotros</li>
                                </Link>
                            </ul>

                        </td>
                        <td className="cajita" style={{textAlign: "right"}}>
                            <UserBox 
                            loggedInUserId={props.loggedInUserId}
                            loggedInUserName={props.loggedInUserName} />
                        </td>
                    </tr>
                </table>
            </div>
        </navbar>
    );
}

export default Nav;
