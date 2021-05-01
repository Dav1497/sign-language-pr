import React from "react";
import LevelBox from './LevelBox';
import Nav from './Nav';
import Footer from './Footer';
import axios from "axios";
import { SERVER_URL, headers } from "./Signup";
import { Redirect, withRouter } from "react-router-dom";
import "./HomePage.css";

class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            levels: [],
            loggedInUser: null
        }
    }

    componentDidMount(){
        this.getLoggedInUser();
        this.getLevels();
    }

    getLoggedInUser() {
        let uid = localStorage.getItem('loggedInUserID');
        axios.get(SERVER_URL + "users/" + uid, headers).then(res => {
            this.setState({
                loggedInUser: res.data.user
            });
        })
    }

    getLevels() {
        const ltr = [];
        axios.get(SERVER_URL + "levels", headers).then(res => {
            res.data.levels.map(levels => {
                ltr.push(levels);
            });
            this.setState({ levels: Array.from(ltr) })
        });

    }

    render() {
        if (!localStorage.getItem('loggedInUserID')) {
            return <Redirect to="/"></Redirect>
        }
        return (
            <body>
                <div className="homeMenu">
                    {this.state.loggedInUser && <Nav
                        loggedInUserId={this.state.loggedInUser.user_id}
                        loggedInUserName={this.state.loggedInUser.name} />}
                </div>
                <table className="mytable">
                    <tbody>
                        <tr>
                            <td className="leftCol">
                                <div>
                                    <hr></hr>
                                    <p style={{ color: "#438CFB", fontFamily: "Varela Round", fontSize: "20px" }}>
                                        DATOS CURIOSOS
                                </p>
                                    <div style={{ color: "white", fontSize: "18px", fontFamily: "Varela Round"}}>
                                        El Instituto de Estadísticas del Gobierno de Puerto Rico reportó que para el año 2018, la población de adultos sordos o con problemas auditivos
                                        severos fue estimada en 218,495 personas.
                                        Según el censo, nuestro país contó con 2,601,142 habitantes en ese año,
                                    lo cual significa que 8.4% de la población de Puerto Rico se constituye de personas sordas.
                                    <hr></hr>
                                    Las agencias gubernamentales estatales no están preparadas para atender a personas de la comunidad sorda.
                                    <hr></hr>
                                    </div><br />
                                </div>
                                <div style={{ textAlign: 'left' }}>
                                    {/* https://gurabo.uagm.edu/sites/default/files/uploads/Health-Sciences/Thesis/2018/Elisamuel-Rivera-PHL-2018.pdf */}
                                    <img style={{ width: '100px' }} src='https://drive.google.com/uc?export=view&id=1S3BoN6iaIcI6U-IHHwoFQ9Yg6MdHtCO9' alt="" />
                                </div>

                            </td>
                            <td>
                                <br></br>
                                {this.state.levels && this.state.levels.length > 0 && this.state.levels.map(level => (
                                    <div key={'homeLevel'+level.level_id}>
                                        <LevelBox levelName={level.level_name} levelId={level.level_id}></LevelBox>
                                        <div style={{ height: "50px" }}><br /></div>
                                    </div>
                                ))}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <br></br>

                <Footer></Footer>
            </body>);
    }
}

export default withRouter(HomePage);