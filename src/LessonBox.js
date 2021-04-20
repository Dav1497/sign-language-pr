import React from "react";
import "./LessonBox.css";


function LessonBox(props) {
    return(
        <div className="box" onClick={() => {props.onLessonClick(props.lid)}}>
            <p className="lessonName">{props.lessonName}</p>
            <div>
                <img className="pict" src={props.lessonImg} alt=""></img>
            </div>
            <div className="progressBar">
                <div className="progress"></div>
            </div>
        </div>
        );
    }


export default LessonBox;
