import React from "react";
import * as tf from '@tensorflow/tfjs';
import { loadGraphModel } from "@tensorflow/tfjs-converter";
import "./App.css";

tf.setBackend('webgl');

const threshold = 0.75;

async function load_model(modelUrl) {
  // It's possible to load the model locally or from a repo
  // You can choose whatever IP and PORT you want in the "http://127.0.0.1:8080/model.json" just set it before in your https server
  //const model = await loadGraphModel("http://127.0.0.1:8080/model.json");
  const model = await loadGraphModel(modelUrl);
  return model;
}

let classesDir = {
  1: {
    name: 'A',
    id: 1,
  },
  2: {
    name: 'B',
    id: 2,
  },
  3: {
    name: 'C',
    id: 3
  }
}

class App extends React.Component {
  videoRef = React.createRef();
  canvasRef = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      hasUserMedia: false    }
    //this.setBackend();
  }

  async setBackend() {
    tf.setBackend('webgl');
  }

  componentWillUnmount() {

    // tf.removeBackend('webgl');
    const stream = window.stream;
    if (stream?.getVideoTracks) {
      stream.getVideoTracks().map(track => track.stop());
    }
  }

  componentDidMount() {

    console.log(this.props.modelUrl);
    if(tf.getBackend() != 'webgl'){
      this.setBackend();
    }

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
          try{
            if(this.videoRef?.current){
              this.videoRef.current.srcObject = stream;
            }
          }catch(err){
          }

          return new Promise((resolve, reject) => {
            if(this.videoRef.current){
              this.videoRef.current.onloadedmetadata = () => {
                resolve();
              };
            }else{
              reject();
            }

          });
        });

      const modelPromise = load_model(this.props.modelUrl);

      Promise.all([modelPromise, webCamPromise])
        .then(values => {
          console.log(values);
          if(this.videoRef?.current){
            this.detectFrame(this.videoRef.current, values[0]);
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  detectFrame = (video, model) => {
    tf.engine().startScope();
    console.log(model);
    model.executeAsync(this.process_input(video))
    .then(predictions => {
      this.renderPredictions(predictions, video);
      requestAnimationFrame(() => {
        this.detectFrame(video, model);
      });
      tf.engine().endScope();
    });
  };

  process_input(video_frame) {
    const expandedimg = tf.browser.fromPixels(video_frame).cast('int32').expandDims()
    return expandedimg;
  };

  buildDetectedObjects(scores, threshold, boxes, classes, classesDir) {
    const detectionObjects = []
    var video_frame = document.getElementById('frame');

    scores[0].forEach((score, i) => {
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

  renderPredictions = predictions => {
    if (!this.canvasRef.current) return
    const ctx = this.canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Font options.
    const font = "16px sans-serif";
    ctx.font = font;
    ctx.textBaseline = "top";

    //Getting predictions
    const boxes = predictions[3].arraySync();
    const scores = predictions[0].arraySync();
    const classes = predictions[1].dataSync();
    const detections = this.buildDetectedObjects(scores, threshold,
      boxes, classes, classesDir);

    detections.forEach(item => {
      const x = item['bbox'][0];
      const y = item['bbox'][1];
      const width = item['bbox'][2];
      const height = item['bbox'][3];

      if (item["label"] == 'A') {
        ctx.strokeStyle = "#00FFFF";
        ctx.fillStyle = "#00FFFF";
      }
      else if (item["label"] == 'B') {
        ctx.strokeStyle = "red";
        ctx.fillStyle = "red";
      }
      else {
        ctx.strokeStyle = "yellow";
        ctx.fillStyle = "yellow";
      }
      // Draw the bounding box.
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
    });
  };

  render() {
    console.log(this.props.modelUrl);
    return (
      <div key={this.props.rand}>
        <video
          key={'vid' + this.props.modelUrl + this.props.rand}
          style={{ height: '500px', width: "700px" }}
          autoPlay
          playsInline
          muted
          ref={this.videoRef}
          width="700"
          height="500"
          id="frame"
        />
        <canvas
          ref={this.canvasRef}
          width="700"
          height="500"
          style={{ position: 'relative', top: -500 }}
        />
      </div>
    );
  }
}

export default App;
