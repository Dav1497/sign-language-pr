import React from "react";
import "./About.css";
import Nav from "./Nav.js";
import Footer from "./Footer.js";
import dimaris from './images/dimaris.jpeg';
import david from './images/davidCarrion.jpg'
import estefania from './images/estefania.jpeg';
import { SERVER_URL, headers } from "./Signup";
import axios from "axios";
import { useState } from "react"

function About(props) {

    let uid = localStorage.getItem('loggedInUserID');
    const [user, setUser] = useState(
        {
            email: "",
            name: "",
            password: "",
            user_id: -1
        }
    )

    axios.get(SERVER_URL + "users/" + uid, headers).then(res => {
        setUser({...user, ...res.data.user})
    })

    return (

        <div className="" >
           {user && <Nav
                loggedInUserId={user.user_id}
                loggedInUserName={user.name} />}
            <div className="c">
                <table className="t" >
                    {/* style={{backgroundColor:"red"}} */}
                    <tr>
                        <td>
                            <h2 className="h l">Recurso Educativo</h2>
                        </td>
                    </tr>
                    <br></br>
                    <tr>
                        <td>
                            <div className="">
                                <img src={dimaris} alt="dimaris" className="i"></img>
                            </div>

                        </td>
                        <td >
                            <div className="j">
                                <p className="p">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque feugiat mattis
                                    massa lobortis varius. Pellentesque sollicitudin velit a purus commodo euismod.
                                    Proin a sodales lectus, in elementum sapien. Sed et hendrerit sem, et aliquet arcu.
                                    Donec egestas nunc et pellentesque dictum. Fusce a dolor ac nunc mattis bibendum in
                                    id turpis. Maecenas sollicitudin rutrum felis ac lobortis. Nam non quam et erat lobortis
                                    lacinia. Maecenas posuere nisl in nisi rutrum, in bibendum lacus sodales. Donec pulvinar
                                    dignissim maximus. Ut ac nisl nibh. Maecenas tincidunt iaculis felis, et accumsan odio
                                    efficitur placerat. In hac habitasse platea dictumst. Pellentesque in odio finibus,
                                    auctor erat ac, rhoncus nunc. Sed viverra turpis a urna elementum, ut consectetur dolor pulvinar.
            </p>
                            </div>

                        </td>
                    </tr>
                    <tr > <td colspan="2" > <hr></hr> </td> </tr>

                    <tr>
                        <td>
                            <h2 className="h l">Desarrolladores</h2>
                        </td>
                    </tr>
                    <br></br>
                    <tr>
                        <td>
                            <div className="">
                                <img src={david} alt="david" className="i"></img>
                            </div>

                        </td>
                        <td>
                            <div className="">
                                <img src={estefania} alt="estefania" className="i"></img>
                            </div>
                        </td>

                    </tr>
                    <br></br>
                    <tr>
                        <td>
                            <div className="j s">
                                <p className="p">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque feugiat mattis
                                    massa lobortis varius. Pellentesque sollicitudin velit a purus commodo euismod.
                                    Proin a sodales lectus, in elementum sapien. Sed et hendrerit sem, et aliquet arcu.
                                    Donec egestas nunc et pellentesque dictum. Fusce a dolor ac nunc mattis bibendum in
                                    id turpis. Maecenas sollicitudin rutrum felis ac lobortis. Nam non quam et erat lobortis
                                    lacinia. Maecenas posuere nisl in nisi rutrum, in bibendum lacus sodales. Donec pulvinar
                                    dignissim maximus. Ut ac nisl nibh. Maecenas tincidunt iaculis felis, et accumsan odio
                                    efficitur placerat. In hac habitasse platea dictumst. Pellentesque in odio finibus,
                                    auctor erat ac, rhoncus nunc. Sed viverra turpis a urna elementum, ut consectetur dolor pulvinar.
            </p>
                            </div>
                        </td>
                        <td>
                            <div className="j s">
                                <p className="p">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque feugiat mattis
                                    massa lobortis varius. Pellentesque sollicitudin velit a purus commodo euismod.
                                    Proin a sodales lectus, in elementum sapien. Sed et hendrerit sem, et aliquet arcu.
                                    Donec egestas nunc et pellentesque dictum. Fusce a dolor ac nunc mattis bibendum in
                                    id turpis. Maecenas sollicitudin rutrum felis ac lobortis. Nam non quam et erat lobortis
                                    lacinia. Maecenas posuere nisl in nisi rutrum, in bibendum lacus sodales. Donec pulvinar
                                    dignissim maximus. Ut ac nisl nibh. Maecenas tincidunt iaculis felis, et accumsan odio
                                    efficitur placerat. In hac habitasse platea dictumst. Pellentesque in odio finibus,
                                    auctor erat ac, rhoncus nunc. Sed viverra turpis a urna elementum, ut consectetur dolor pulvinar.
            </p>
                            </div>
                        </td>
                    </tr>

                </table>
            </div>
            <Footer></Footer>
        </div>

    );
}

export default About;
