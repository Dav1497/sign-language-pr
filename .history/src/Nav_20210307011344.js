import React from "react";
import "./App.css";
import { Link } from "react-router-dom";
import logo from "./images/logo.PNG";

function Nav() {
    return (
        <nav >
            <table>
                <tr>
                    <td>
                        <div className="logo">

                            <img src={logo} alt="logo" />

                        </div>
                    </td>
                </tr>
            </table>
        </nav>
    );
}

export default Nav;
