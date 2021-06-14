import React, { useState } from "react";
import { render } from "react-dom";
import { storage } from "./firebase";
import { Button } from 'reactstrap';
import './UserBox.css';

import axios from "axios";
import { SERVER_URL, headers } from "./Signup";


class ReactFirebaseFileUpload extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      image: null,
      url: props.url,
      progress: 0
    }
    console.log(this.state.url)
  }

  setImage(image) {
    this.setState({
      image: image
    });
  }

  setUrl(url) {
    this.setState({
      url: url
    });
  }

  setProgress(progress) {
    this.setState({
      progress: progress
    });
  }

  handleChange = e => {
    if (e.target.files[0]) {
      this.setImage(e.target.files[0]);
    }
  };

  handleUpload = () => {
    try {
      const uploadTask = storage.ref(`images/${this.state.image.name}`).put(this.state.image);
      uploadTask.on(
        "state_changed",
        snapshot => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          this.setProgress(progress);
        },
        error => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(this.state.image.name)
            .getDownloadURL()
            .then(url => {
              this.setUrl(url);
              this.call();
            });
        }
      );
    } catch (error) {
      console.log(error)
    }
  };

  call = () => {
    this.props.parentCallback(this.state.url)
    console.log(this.state.url)
  }

  render() {
    return (
      <div className="">

        <table >
          <tbody>
          <tr>
            <td  >
              <div className="">
                <img className="imageUpload" src={this.state.url || "https://upload.wikimedia.org/wikipedia/commons/4/42/Photo-camera-in-circular-outlined-interface-button.svg"} alt="firebase-image" />
              </div>
            </td>
            <td className="centro">
              <div className="">
                <progress value={this.state.progress} max="100" />
                <label htmlFor="file-upload" className="in botonDone">Escoger Imagen</label>
                <input className="in " id="file-upload" type="file" onChange={this.handleChange.bind(this)} />
                <br></br>
                <Button className="botonesDone" color="success"  onClick={this.handleUpload.bind(this)} >Upload</Button>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    );
  };
}

export default ReactFirebaseFileUpload;