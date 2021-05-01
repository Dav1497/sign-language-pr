import React, { useEffect } from "react";
import * as tf from '@tensorflow/tfjs';
import { loadGraphModel } from "@tensorflow/tfjs-converter";
import "./App.css";
import { getModelDict } from "./ModelDirs";
import confetti from "canvas-confetti";

const threshold = 0.75;
let count = 0

async function load_model(modelUrl) {
  // It's possible to load the model locally or from a repo
  // You can choose whatever IP and PORT you want in the "http://127.0.0.1:8080/model.json" just set it before in your https server
  //const model = await loadGraphModel("http://127.0.0.1:8080/model.json");
  const model = await tf.loadGraphModel(modelUrl);
  return model;
}

let classesDir = {}

function App(props) {

  const videoRef = React.useRef(null);
  const canvasRef = React.useRef(null);

  const correctAnswer = (ctx) => {
    count++;
    if (count < 3) {
      var myConfetti = confetti.create(ctx, {
        resize: true
      });
      myConfetti({
        particleCount: 100,
        spread: 160
      });
    }
  }

  const loadDict = async () => {
    classesDir = await getModelDict(props.model_id)
  }

  tf.setBackend('webgl');

  loadDict()

  console.log(classesDir);

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
        console.log(values);
        if (videoRef?.current && videoRef.current.onloadedmetadata) {
          detectFrame(videoRef.current, values[0]);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }


  const detectFrame = (video, model) => {
    model.executeAsync(process_input(video))
      .then(predictions => {
        renderPredictions(predictions, video);
        requestAnimationFrame(() => {
          detectFrame(video, model);
        });
      });
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
      if (score > threshold) {
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

      console.log(props.answer);
      if (props.answer == item["label"]) {
        setTimeout(() => { correctAnswer(canvasRef.current) }, 2000);
        setTimeout(() => { count = 0 }, 5000)
      }
    });

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
