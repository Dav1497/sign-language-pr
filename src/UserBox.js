import React, { useEffect, useState } from "react";
import { storage } from "./firebase";
import "./UserBox.css";

import ModalContent from "./ModalContent.js"

import perfil from "./images/user.jpg";

import { Button, ButtonDropdown, DropdownToggle, DropdownItem, DropdownMenu, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import Modal from 'react-modal';

import axios from "axios";
import { SERVER_URL, headers } from "./Signup";
import { Redirect, withRouter } from "react-router-dom";
import { Link } from "react-router-dom";


let myImgUrl = "https://upload.wikimedia.org/wikipedia/commons/4/42/Photo-camera-in-circular-outlined-interface-button.svg";

function UserBox(props) {

    const [dropdownOpen, setOpen] = useState(false);
    const toggleDrop = () => setOpen(!dropdownOpen);

    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    var setMyImageUrl = function (url) {
        myImgUrl = url;
    };

    // const [pic, setPic] = useState("");

    // let uid = localStorage.getItem('loggedInUserID');
    // axios.get(SERVER_URL + "users/" + uid, headers).then(res => {
    //    setPic(res.data.user.picture_url)
       
    // });

    function logOut() {
        axios.get(SERVER_URL + "logout", headers);
        localStorage.setItem('loggedInUserID', "");
        console.log("logout");
        // this.setState({
        //   loggedInUserData: ""
        // })
        // window.location.reload();
      }

    return (
        
        <div  style={{padding:"10px" }}>

            <table>
                <tr>

                    <td rowSpan="2">
                        <ButtonDropdown className="" isOpen={dropdownOpen} toggle={toggleDrop}>
                            <DropdownToggle className="round " caret>
                                {/* <iframe classname="perfil" src={props.pic}></iframe> */}
                                <img src={props.pic} alt="perfil " className="perfil " />
                            </DropdownToggle>
                            <DropdownMenu className="over">
                                {/* <DropdownItem className="ddi" header>Header</DropdownItem> */}

                                <DropdownItem  className="ddi " onClick={openModal} >Edit</DropdownItem>

                                <Modal
                                    isOpen={modalIsOpen}
                                    ariaHideApp={false}
                                    //   onAfterOpen={afterOpenModal}
                                    onRequestClose={closeModal}
                                    // style={customStyles}
                                    contentLabel="Example Modal"
                                    className="newModal"
                                >
                                     <div className="der"><Button className="" color="danger" onClick={closeModal}>X</Button></div>
                                    <ModalContent pic ={props.pic} setUser={props.setUser} closeModal={closeModal.bind(this)} ></ModalContent>
                                   <br></br>
                                </Modal>
                                <DropdownItem className="ddi" divider />
                                <Link to="/">
                                <DropdownItem className="ddi" onClick={logOut.bind(this)}>Log Out</DropdownItem>
                                </Link>
                            </DropdownMenu>

                        </ButtonDropdown>
                    </td>
                    <td className="texto name" colSpan="2">{props.loggedInUserName}
                   </td>
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
