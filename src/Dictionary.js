import React from "react";
import "./Nav.css";
import Footer from "./Footer";
import Nav from './Nav';
import axios from "axios";
import "./Dictionary.css";
import dictionaryData from './dictionary.json'
import { useState } from "react"
import Modal from 'react-modal';
import { SERVER_URL, headers } from "./Signup";
import { Redirect, withRouter } from "react-router-dom";

function Dictionary(props) {

    let uid = localStorage.getItem('loggedInUserID');
    const [isObtained, setIsObtained] = useState(false)
    const [user, setUser] = useState(
        {
            email: "",
            name: "",
            password: "",
            user_id: -1,
            picture_url: ""
        }
    )

    if(!isObtained){
        getLoggedInUser();
    }
   
    // axios.get(SERVER_URL + "users/" + uid, headers).then(res => {
    //     setUser({...user, ...res.data.user})
    // })

    const [searchTerm, setSearchTerm] = useState('')
    const [currentTerm, setCurrentTerm] = useState('')
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function getLoggedInUser() {
        axios.get(SERVER_URL + "users/" + uid, headers).then(res => {
            setUser({...user, ...res.data.user})
        })
        setIsObtained(true)
    }

    if (!localStorage.getItem('loggedInUserID')) {
        return <Redirect to="/"></Redirect>
    }
    else{

    return (
        <div>
          
            {user && <Nav
                loggedInUserId={user.user_id}
                loggedInUserName={user.name} />}
            <div className="max">

                <input
                    type="text"
                    id="header-search"
                    placeholder="Buscar"
                    name="s"
                    className="search"
                    onChange={event => { setSearchTerm(event.target.value) }}
                />
                <div className="mainDiv">
                    {dictionaryData.filter((val) => {
                        if (searchTerm == "") {
                            return val
                        } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                            return val
                        }
                    }).sort(function (a, b) {
                        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                        return 0;
                    }).map((val, key) => {
                        return (

                            <div className="words" key={key}>

                                <button className="word" onClick={() => {
                                    
                                    setCurrentTerm(val);
                                    openModal();
                                }}>{val.name}</button>
                                <Modal
                                    isOpen={modalIsOpen}
                                    //   onAfterOpen={afterOpenModal}
                                    onRequestClose={closeModal}
                                    // style={customStyles}
                                    contentLabel="Example Modal"
                                    className="imgModal"
                                >
                                    <div className="imgDiv">
                                        {/* <button className=""  onClick={closeModal}>X</button> */}
                                        <img src={currentTerm.image} alt="" className="img" />
                                    </div>

                                    <br></br>
                                </Modal>

                            </div>
                        );
                    })}
                </div>
            </div>

            <Footer></Footer>
        </div>
    );
}
}
export default Dictionary;
