import React from "react";
import "./Nav.css";
import { Link } from "react-router-dom";
import logo from "./images/logo.PNG";

function Nav() {
    return (
        <nav >
            <div className="backg">
            <table>
                <tr>
                    <td>
                        {/* <div className="loguito"> */}

                            <img src={logo} alt="logo" className="loguito" />

                        {/* </div> */}
                    </td>
                    <td className="letras">
Diccionario
                    </td>
                    <td className="letras">
Nosotros
                    </td>
                </tr>
            </table>
            </div>
        </nav>
    );
}

export default Nav;
