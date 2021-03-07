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
<ul className="nav">
        
        <Link to="/login">
      <li className="listItem">Diccionario</li>
      </Link>
      <Link to="/perfil">
      <li className="listItem">Sobre Nosotros</li>
      </Link>
    </ul>

                    </td>
                </tr>
            </table>
            </div>
        </nav>
    );
}

export default Nav;
