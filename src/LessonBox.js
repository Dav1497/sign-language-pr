import React from "react";
import "./LessonBox.css";


function LessonBox(props) {
    console.log(props.lessonImg);


    return(
        <div className="box" onClick={() => {props.onLessonClick(props.lessonName)}}>
            <p className="lessonName">{props.lessonName}</p>
            <div className="pict">
                <img src={props.lessonImg} alt=""></img>
            </div>
            <div className="progressBar">
                <div className="progress"></div>
            </div>
        </div>
        );
        
    }


export default LessonBox;
