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
                    <td className="pad enlace">
                        <ul className="lettering enlace">
                            <Link className="enlace" to="/dictionary">
                                <li>Diccionario</li>
                            </Link>
                            <Link className="enlace" to="/about">
                                <li>Sobre Nosotros</li>
                            </Link>
                            <Link className="enlace" to="/home">
                            <li>Lecciones</li>
                            </Link>
                        </ul>
                    </td>

                    <td className="contact">
                        <ul className="lettering contact ">
                            <li>david.carrion@upr.edu</li>
                            <li>estefania.torres1@upr.edu</li>
                        </ul>

                    </td>
                </tr>

            </table>

        </div>
    );
}

export default Nav;
