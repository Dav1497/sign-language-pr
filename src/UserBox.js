import React from "react";
import "./UserBox.css";

import perfil from "./images/user.jpg";

function UserBox(props) {
    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <td rowSpan="2">
                            <img src={perfil} alt="perfil" className="perfil" />
                        </td>
                        <td className="texto name" colSpan="2">{props.loggedInUserName}</td>
                    </tr>
                    <tr>
                        <td className="texto derecha">XP :</td>
                        <td className="amarillo">204 </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default UserBox;
