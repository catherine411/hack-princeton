// Importing modules
import React, { useState, useEffect } from "react";
import "./App.css";
import { Button, Card, LinearProgress } from "@mui/material";
import axios from "axios";

function App() {
  // usestate for setting a javascript
  // object for storing and using data
  const [data, setdata] = useState({
    name: "",
    age: 0,
    date: "",
    programming: "",
  });

  const [audioFile, setAudioFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [audioTranscript, setAudioTranscript] = useState("");
  const [audioSummary, setAudioSummary] = useState("");
  const [imageTranscript, setImageTranscript] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAudioFileInputChange = (event) => {
    setAudioFile(event.target.files[0]);
  };

  const handleAudioUpload = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("audioFile", audioFile);
    axios.post("/audio", formData).then((response) => {
      setAudioTranscript(response.data);
      setLoading(false);
    });
    setLoading(false);
  };

  const handleImageFileInputChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleImageUpload = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("imageFile", imageFile);

    axios.post("/image", formData).then((response) => {
      setImageTranscript(response.data);
      setLoading(false);
    });
    setLoading(false);
  };

  // useEffect(() => {
  //   fetch("/test").then((res) =>
  //     res.json().then((data) => {
  //       setTranscript(transcript);
  //     })
  //   );
  // });

  // Using useEffect for single rendering
  // useEffect(() => {
  //   // Using fetch to fetch the api from
  //   // flask server it will be redirected to proxy
  //   fetch("/test").then((res) =>
  //     res.json().then((data) => {
  //       // Setting a data from api
  //       setdata({
  //         name: data.Name,
  //         age: data.Age,
  //         date: data.Date,
  //         programming: data.programming,
  //       });
  //     })
  //   );
  // }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>HTTP: Hurry, To The Point</h1>
        <div>
          <input
            type="file"
            name="audioFile"
            accept="audio/*"
            style={{ display: "none" }}
            id="contained-button-file"
            onChange={handleAudioFileInputChange}
          />
          <label htmlFor="contained-button-file">
            <Button
              variant="contained"
              component="span"
              style={{
                backgroundColor: "#F4BFBF",
              }}
            >
              Upload Audio
            </Button>
          </label>
          <br></br>
          <Button
            type="submit"
            variant="contained"
            onClick={handleAudioUpload}
            style={{
              backgroundColor: "#F4BFBF",
            }}
          >
            Transcribe
          </Button>
          {loading && <LinearProgress />}
          {audioTranscript && (
            <div>
              <Card variant="outlined" style={{ backgroundColor: "#FFE3E1" }}>
                <div>
                  <h5>Transcript:</h5>
                  <p>{audioTranscript}</p>
                </div>
              </Card>
              <Card variant="outlined" style={{ backgroundColor: "#FFE3E1" }}>
                <div>
                  <h5>Summary:</h5>
                  <p>{audioSummary}</p>
                </div>
              </Card>
            </div>
          )}
        </div>
        {/* <div>
          <input
            type="file"
            name="file"
            accept="image/*"
            style={{ display: "none" }}
            id="contained-button-file"
            onChange={handleImageFileInputChange}
          />
          <label htmlFor="contained-button-file">
            <Button
              variant="contained"
              component="span"
              style={{
                backgroundColor: "#FFD9C0",
              }}
            >
              Upload Image
            </Button>
          </label>
          <br></br>
          <Button
            type="submit"
            variant="contained"
            onClick={handleImageUpload}
            style={{
              backgroundColor: "#FFD9C0",
            }}
          >
            Transcribe
          </Button>
          {loading && <LinearProgress />}
          {imageTranscript && (
            <Card variant="outlined" style={{ backgroundColor: "#FFE3E1" }}>
              <div>
                <h5>Transcript:</h5>
                <p>{imageTranscript}</p>
              </div>
            </Card>
          )}
        </div> */}
      </header>
    </div>
  );
}

export default App;
