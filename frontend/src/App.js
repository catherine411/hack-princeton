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

  const [file, setFile] = useState(null);
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileInputChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    axios.post("/test", formData).then((response) => {
      setTranscript(response.data);
      setLoading(false);
    });
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
        <h1>SumRise</h1>
        {/* Calling a data from setdata for showing */}
        <input
          type="file"
          name="file"
          accept="audio/*"
          style={{ display: "none" }}
          id="contained-button-file"
          onChange={handleFileInputChange}
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" color="primary" component="span">
            Upload Audio File
          </Button>
        </label>
        <br></br>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleUpload}
        >
          Transcribe
        </Button>
        {loading && <LinearProgress />}
        {transcript && (
          <Card variant="outlined">
            <div>
              <h5>Transcript:</h5>
              <p>{transcript}</p>
            </div>
          </Card>
        )}
      </header>
    </div>
  );
}

export default App;
