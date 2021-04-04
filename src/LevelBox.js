import React from "react";
import LessonBox from "./LessonBox";
import "./LevelBox.css";
import axios from "axios";
import { headers, SERVER_URL } from "./Signup";
import { withRouter } from "react-router-dom";

class LevelBox extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            lessons: []
        }
        this.getLessons();
    }

    getLessons(){
        let ltr = []
        axios.get(SERVER_URL + "lessons/level/" + this.props.levelId, headers).then(res => {
            console.log(res);
            res.data.lessons.map(l=>{
                ltr.push(l);
            })
            this.setState({lessons : Array.from(ltr)});
        });
    
    }

    onLessonClick(cLesson){
        console.log(cLesson);
        console.log(this.props);
        this.props.history.push('/lesson/'+cLesson);  
    }

    render(){
        return (
            <div className="square">
                <div style={{ display: "flex", flexDirection: "row", textAlign: "center" }}>
                    <div className="left"></div>
                    <p className="levelText">{this.props.levelName}</p>
                    <div className="right"></div>
                </div>
                <div style={{ display: "flex", flexDirection: "row", textAlign: "center",  overflowX: "scroll"  }}>
                    {/* <ul className="nav1"> */}
                        {this.state.lessons.map(lesson => (
                            <div className="listItem1">
                                <LessonBox
                                    lid={lesson.lesson_id}
                                    lessonName={lesson.lname}
                                    description={lesson.description}
                                    levelId={lesson.level_id}
                                    videoUrl={lesson.video_url}
                                    maxXp={lesson.max_xp}
                                    lessonImg={lesson.lesson_img}
                                    onLessonClick={this.onLessonClick.bind(this)}
                                ></LessonBox>
                            </div>
                        ))}
                        <div style={{minWidth:"50px"}}><br/></div>
                    {/* </ul> */}
                </div>
            </div>
        );
    }
    
}

export default withRouter(LevelBox);