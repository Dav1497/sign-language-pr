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
        <td>
David Carrion
        </td>
    </tr>
    <tr>
        <td>
Xp = 1
        </td>
    </tr>
</table>
       </div>
    );
}

export default UserBox;
