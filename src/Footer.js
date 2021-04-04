import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import logo from "./images/logo.PNG";


function Nav(props) {
    return (
    <div className="fondo">

<table className="bottomTable">
    <tr className="fila">
     

    <td className="listado">
        <div className="lh">
        <h1 className="slpr">Sign Language Puerto Rico</h1>
        <hr className="hl">
        </hr>
        </div>
      
    </td >
    <td className=" lettering izq ">
       <div className="">
    <h3 className=""> Contacto</h3>
    </div>
    </td>
</tr>
<tr>
    <td className="pad">
    <ul className="lettering">
            <li>Diccionario</li>
            <li>Sobre Nosotros</li>
        </ul>
    </td>
  
    <td className="contact">
    <ul className="lettering contact">
            <li>david.carrion@upr.edu</li>
            <li>estefania.torres@upr.edu</li>
        </ul>
   
    </td>
</tr>

</table>

    </div>
        );
}

export default Nav;
