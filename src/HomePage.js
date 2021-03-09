import React from "react";
import LevelBox from './LevelBox';
import Nav from './Nav';
import axios from "axios";
import { SERVER_URL, headers } from "./Signup";

class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            levels: []
        }
        this.getLevels();
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
        // console.log(this.state.levels);
        this.state.levels?.forEach(level => {
            console.log(level);
        })
        return (
            <body>
                <div className="homeMenu">
                    <Nav />
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

export default HomePage;