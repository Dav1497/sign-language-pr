import React from "react";
import "./UserBox.css";

import perfil from "./images/user.jpg";

function UserBox(props) {
    return (
        <div>
            <table>
                <tr>
                    <td rowspan="2">
                        <img src={perfil} alt="perfil" className="perfil" />
                    </td>
                    <td className="texto name" colSpan="2">{props.loggedInUserName}</td>
                </tr>
                <tr>
                    <td className="texto derecha">XP :</td>
                    <td className="amarillo">204 </td>
                </tr>
            </table>
        </div>
    );
}

export default UserBox;
