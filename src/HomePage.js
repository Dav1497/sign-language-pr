import React from "react";
import LevelBox from './LevelBox';
import Nav from './Nav';
import axios from "axios";
import { SERVER_URL, headers } from "./Signup";
import { Redirect, withRouter } from "react-router-dom";

class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            levels: [],
            loggedInUser: null
        }
        this.getLoggedInUser();
        this.getLevels();
    }

    getLoggedInUser() {
        let uid = localStorage.getItem('loggedInUserID');
        axios.get(SERVER_URL+"users/"+uid, headers).then(res=> {
            console.log(res);
            this.setState({
                loggedInUser: res.data.user
            });
        })
    }

    getLevels() {
        const ltr = [];
        axios.get(SERVER_URL + "levels", headers).then(res => {
            console.log(res);
            res.data.levels.map(levels => {
                console.log(levels);
                ltr.push(levels);
            });
            this.setState({levels: Array.from(ltr)})
        });
        
    }

    render() {
        if(!localStorage.getItem('loggedInUserID')){
            return <Redirect to="/"></Redirect>
        }
        return (
            <body>
                <div className="homeMenu">
                    {this.state.loggedInUser && <Nav 
                    loggedInUserId={this.state.loggedInUser.user_id}
                    loggedInUserName={this.state.loggedInUser.name} />}
                </div>
                {this.state.levels && this.state.levels.length>0 && this.state.levels.map(level => (
                    <div>
                        <LevelBox levelName={level.level_name} levelId={level.level_id}></LevelBox>
                        <div style={{ height: "50px" }}><br /></div>
                    </div>
                ))}
            </body>);
    }
}

export default withRouter(HomePage);