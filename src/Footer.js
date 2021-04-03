import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import logo from "./images/logo.PNG";


function Nav(props) {
    return (
    <div className="fondo">

<table className="bottomTable">
    <tr className="fila">
        <td className="celda">
    {/* <img src={logo} alt="logo" className="pr" /> */}
    </td>

    <td className="listado">
        <div className="lh">
        <h1 className="slpr">Sign Language Puerto Rico</h1>
        <hr className="">
        </hr>
        </div>
        <ul className="lettering">
            <li>Diccionario</li>
            <li>Sobre Nosotros</li>
        </ul>
    </td >
    <td className="listado lettering" 
    // style={{backgroundColor:"red", width:"25%"}}
    >
        Other Stuff
    </td>
</tr>

</table>

    </div>
        );
}

export default Nav;
