import React from "react";
import "./UserBox.css";

import perfil from "./images/user.jpg";

function UserBox() {
    return (
       <div>
<table>
    <tr>
        <td rowspan="2">
        <img src={perfil} alt="perfil" className="perfil" />
        </td>
        <td className="texto name">
David Carrion
        </td>
    </tr>
    <tr>
        <td className="texto">
Xp :
        </td>
        <td className="texto">
        204
        </td>
    </tr>
</table>
       </div>
    );
}

export default UserBox;
