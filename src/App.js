import React, { useEffect, useState } from "react";
import * as tf from '@tensorflow/tfjs';
import "./App.css";
import { getModelDict } from "./ModelDirs";
import confetti from "canvas-confetti";
import * as blazeface from '@tensorflow-models/blazeface';
import { SERVER_URL } from "./Signup.js";
import axios from "axios";
import { handlePause } from "video-react/lib/actions/video";

const threshold = 0.75;
let count = 0
tf.setBackend('webgl');
let noseposition = "";
let currModel = {};
let dicArray = [];
let runDetect = {};
let classesDir = {}

async function load_model(modelUrl) {
  // It's possible to load the model locally or from a repo
  // You can choose whatever IP and PORT you want in the "http://127.0.0.1:8080/model.json" just set it before in your https server
  //const model = await loadGraphModel("http://127.0.0.1:8080/model.json");
  const model = await tf.loadGraphModel(modelUrl);
  return model;
}

async function loadNoseModel(video) {
  const nose_model = await blazeface.load()
  const returnTensors = false;
  let pred = await nose_model.estimateFaces(video, returnTensors);
  // console.log(pred);
  if (pred.length > 0) {
    noseposition = pred[0].landmarks[2];
  }
  tf.dispose(pred);
  tf.dispose(nose_model);
}

async function loadTF() {
  await tf.ready();
}

function App(props) {
  loadTF();

  const videoRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  let modelDone = false;
  const comoArr = [];

  const correctAnswer = (ctx) => {
    count++;
    if (count < 2) {
      handlePause();
      var myConfetti = confetti.create(ctx, {
        resize: true
      });
      myConfetti({
        particleCount: 100,
        spread: 160
      });
      setTimeout(() => {resumeInterval();}, 3000);
    }
  }

  const loadDict = async () => {
    classesDir = await getModelDict(props.model_id)
  }

  const handlePause = () => {
    clearInterval(runDetect);
  }

  const resumeInterval = () => {
    runDetect = setInterval(() => {
      if (!videoRef.current || !videoRef.current.onloadedmetadata) {
        clearInterval(runDetect);
      }
      tf.tidy(() => {
          detectFrame(videoRef.current, currModel)
      });
    }, 17);
  }


  loadDict()

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const webCamPromise = navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: {
            facingMode: "user"
          }
        })
        .then(stream => {
          window.stream = stream;
          try {
            if (videoRef?.current) {
              videoRef.current.srcObject = stream;
            }
          } catch (err) {
            console.error(err);
          }

          return new Promise((resolve, reject) => {
            if (videoRef.current) {
              videoRef.current.onloadedmetadata = () => {
                resolve();
              };
            } else {
              reject();
            }

          });
        });

      const modelPromise = load_model(props.modelUrl);

      Promise.all([modelPromise, webCamPromise])
        .then(values => {
          if (videoRef?.current && videoRef.current.onloadedmetadata) {
            if (props.answer == "Diciembre") {
              const noseLocation = loadNoseModel(videoRef.current);
              tf.dispose(noseLocation);
            }
            currModel = values[0];
            runDetect = setInterval(() => {
              if (!videoRef.current || !videoRef.current.onloadedmetadata) {
                clearInterval(runDetect);
              }
              tf.tidy(() => {
                  detectFrame(videoRef.current, values[0])
              });
            }, 17);

          }
        })
        .catch(error => {
          console.error(error);
        });

      return function cleanup() {
        const stream = window.stream;
        if (stream?.getVideoTracks) {
          stream.getVideoTracks().map(track => track.stop());
        }
      }
    }
  })


  const detectFrame = (video, model) => {
    // tf.engine().startScope();
    if (videoRef.current && videoRef.current.onloadedmetadata) {
      const inp = process_input(video);
      const obj = model.executeAsync(inp)
        .then(predictions => {
          requestAnimationFrame(() => { renderPredictions(predictions, video); });
          tf.disposeVariables();
        });
      tf.dispose(obj);
      tf.dispose(inp);
    }
  };

  const process_input = (video_frame) => {
    const expandedimg = tf.browser.fromPixels(video_frame).cast('int32').expandDims()
    return expandedimg;
  };

  const buildDetectedObjects = (scores, threshold, boxes, classes, classesDir) => {
    const detectionObjects = []
    var video_frame = document.getElementById('frame');
    // console.log(scores, boxes, classes);
    scores[0].forEach((score, i) => {
      // console.log(score)
      if (score > threshold || (score > .5 && props.answer == "Rojo" && classesDir[classes[i]].name != "Diciembre")) {
        const bbox = [];
        const minY = boxes[0][i][0] * video_frame.offsetHeight;
        const minX = boxes[0][i][1] * video_frame.offsetWidth;
        const maxY = boxes[0][i][2] * video_frame.offsetHeight;
        const maxX = boxes[0][i][3] * video_frame.offsetWidth;
        bbox[0] = minX;
        bbox[1] = minY;
        bbox[2] = maxX - minX;
        bbox[3] = maxY - minY;
        detectionObjects.push({
          class: classes[i],
          label: classesDir[classes[i]].name,
          score: score.toFixed(4),
          bbox: bbox
        })
      }
    })
    return detectionObjects
  }

  async function activityDone(type) {
    if (!modelDone) {
      const activity = {
        lesson_id: props.lesson_id,
        user_id: props.user_id,
        type: type,
        isCompleted: true,
      }
      try {
        await axios.post(SERVER_URL + 'progress', activity).then(res => {
          console.log(res);
          modelDone = true;
        })
      }
      catch (err) {
        console.log(err)
      }

    }
  }

  const renderPredictions = predictions => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Font options.
    const font = "16px sans-serif";
    ctx.font = font;
    ctx.textBaseline = "top";

    //Getting predictions
    const boxes = predictions[props.boxes].arraySync();
    const scores = predictions[props.scores].arraySync();
    const classes = predictions[props.classes].dataSync();
    const detections = buildDetectedObjects(scores, threshold,
      boxes, classes, classesDir);

    detections.forEach(item => {
      const x = item['bbox'][0];
      const y = item['bbox'][1];
      const width = item['bbox'][2];
      const height = item['bbox'][3];

      ctx.strokeStyle = "#00FFFF";
      ctx.fillStyle = "#00FFFF";

      ctx.lineWidth = 4;
      ctx.strokeRect(x, y, width, height);

      // Draw the label background.
      const textWidth = ctx.measureText(item["label"] + " " + (100 * item["score"]).toFixed(2) + "%").width;
      const textHeight = parseInt(font, 15); // base 10
      ctx.fillRect(x, y, textWidth + 4, textHeight + 4);
    });

    detections.forEach(item => {
      const x = item['bbox'][0];
      const y = item['bbox'][1];

      // Draw the text last to ensure it's on top.
      ctx.fillStyle = "#000000";
      ctx.fillText(item["label"] + " " + (100 * item["score"]).toFixed(2) + "%", x, y);


      if (props.answer == "Como") {
        if (comoArr.length == 2) {
          activityDone("modelo" + props.answer);
          comoArr.pop();
          comoArr.pop();
        }
        if (item["label"] == "Como1" && comoArr.length == 0) {
          comoArr.push(item["label"]);
        } else if (item["label"] == "Como2" && comoArr.length == 1) {
          comoArr.push(item["label"]);
          count = 0;
          correctAnswer(canvasRef.current);
        }
        console.log(comoArr);
      }

      if (props.answer == item["label"]) {
        // console.log(y);
        if(item["label"] == "Diciembre" && dicArray.length < 20) {
          dicArray.push(y);
        } else if (item["label"]=="Diciembre" && dicArray.length >= 20) {
          const first = dicArray[0] - noseposition[1];
          const last = dicArray[dicArray.length-1] -noseposition[1];
          const dif = last - first;
          console.log(first, last, dif);
          if(first < last && dif> 30){
            activityDone("modelo" + props.answer);
            setTimeout(() => { correctAnswer(canvasRef.current) }, 1000);
            setTimeout(() => { count = 0 }, 5000)
          }
          dicArray = [];
        }else {
          activityDone("modelo" + props.answer);
          setTimeout(() => { correctAnswer(canvasRef.current) }, 1000);
          setTimeout(() => { count = 0 }, 5000)
        }
      }
      tf.dispose(item);
    });
    tf.dispose(predictions);
  }



  return (
    <div style={{ height: '550px' }}>
      <video
        key={'vid' + props.model_id}
        style={{ height: '500px', width: "700px" }}
        autoPlay
        playsInline
        muted
        ref={videoRef}
        width="700"
        height="500"
        id="frame"
      />
      <canvas
        ref={canvasRef}
        width="700"
        height="500"
        style={{ position: 'relative', top: -500 }}
      />
    </div>
  );

}

export default App;
