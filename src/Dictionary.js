import React from "react";
import "./Nav.css";

import Footer from "./Footer";
import Nav from './Nav';
import "./Dictionary.css";

function Dictionary(props) {
    return (
       <div>
<Nav></Nav>
<div className="max">

<input
            type="text"
            id="header-search"
            placeholder="Buscar"
            name="s" 
            className="search"
        />
        </div>

<Footer></Footer>
       </div>
    );
}

export default Dictionary;
