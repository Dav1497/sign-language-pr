import React, { useEffect, useState } from "react";
import { storage } from "./firebase";
import "./UserBox.css";

import ModalContent from "./ModalContent.js"

import perfil from "./images/user.jpg";

import { Button, ButtonDropdown, DropdownToggle, DropdownItem, DropdownMenu, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import Modal from 'react-modal';

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
        console.log(myImgUrl);
    };


    return (
        <div>

            <table>
                <tr>

                    <td rowspan="2">

                        <ButtonDropdown isOpen={dropdownOpen} toggle={toggleDrop}>
                            <DropdownToggle className="round" caret>
                                <img src={perfil} alt="perfil" className="perfil" />
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem className="ddi" header>Header</DropdownItem>

                                <DropdownItem className="ddi" onClick={openModal} >Edit</DropdownItem>

                                <Modal
                                    isOpen={modalIsOpen}
                                    //   onAfterOpen={afterOpenModal}
                                    onRequestClose={closeModal}
                                    // style={customStyles}
                                    contentLabel="Example Modal"
                                    className="newModal"
                                >
                                     <div className="der"><Button className="" color="danger" onClick={closeModal}>X</Button></div>
                                    <ModalContent setMyImageUrl={setMyImageUrl} ></ModalContent>
                                   <br></br>
                                </Modal>
                                <DropdownItem className="ddi" divider />
                                <DropdownItem className="ddi">Log Out</DropdownItem>
                            </DropdownMenu>

                        </ButtonDropdown>
                    </td>
                    <td className="texto name" colSpan="2">{props.loggedInUserName}</td>
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
