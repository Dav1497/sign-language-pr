import React from "react";
import "./Nav.css";
import { Link } from "react-router-dom";
import logo from "./images/logo.PNG";

function Nav() {
    return (
        <nav >
            <div className="bg">
            <table>
                <tr>
                    <td>
                        <div className="logo">

                            <img src={logo} alt="logo" />

                        </div>
                    </td>
                </tr>
            </table>
            </div>
        </nav>
    );
}

export default Nav;
