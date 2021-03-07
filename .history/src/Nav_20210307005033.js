import React from "react";
import "./App.css";
import {Link} from "react-router-dom";
import escudo from "./fotos/escudo.png";

function Nav() {
  return (
    <nav >
        <div className="bandera">
          <table className="tabla">

          <tr>

            <td>
          <div className="escudo">

          <img src={escudo} alt="escudo"/>

          </div>
          </td >

          <td className="nombre">
          <h1>
  Congregación Mita Inc.
</h1>
          </td>
          </tr>
         
          </table>

        </div>
        
    
      <ul className="nav">
        
          <Link to="/login">
        <li className="listItem">Login</li>
        </Link>
        <Link to="/perfil">
        <li className="listItem">Perfil</li>
        </Link>
      </ul>
      
    </nav>
  );
}

export default Nav;
