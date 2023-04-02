// Importing modules
import React, { useState, useEffect } from "react";
import "./App.css";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  LinearProgress,
  CircularProgress,
  Alert,
  AlertTitle,
} from "@mui/material";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

function App() {
  const [audioFile, setAudioFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [audioTranscript, setAudioTranscript] = useState("");
  const [audioSummary, setAudioSummary] = useState("");
  const [imageTranscript, setImageTranscript] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [open, setOpen] = useState(false);

  const handleAudioFileInputChange = (event) => {
    setAudioFile(event.target.files[0]);
    setUploadSuccess(true);
    setOpen(true);
  };

  const handleAudioUpload = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("audioFile", audioFile);
    axios.post("/audio", formData).then((response) => {
      const result = response.data;
      setAudioTranscript(result.slice(0, result.indexOf("SEPARATIONSTRING")));
      setAudioSummary(result.slice(result.indexOf("SEPARATIONSTRING") + 17));
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
        <Grid container spacing={2} columns={15}>
          <Grid item xs={5}>
            <div>
              <p>
                <input
                  type="file"
                  name="audioFile"
                  accept="audio/*,image/*"
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
                {/* <Alert color="info" severity="success" onClose={() => {}} >
                  Upload Success
                </Alert> */}
                <br></br>
                <br></br>
                <div>
                  <Collapse in={open}>
                    <Alert
                      severity="info"
                      action={
                        <IconButton
                          aria-label="close"
                          color="inherit"
                          size="small"
                          onClick={() => {
                            setOpen(false);
                          }}
                        >
                          <CloseIcon fontSize="inherit" />
                        </IconButton>
                      }
                      sx={{
                        mb: 2,
                        ml: 16,
                      }}
                      style={{ width: "40%" }}
                    >
                      Upload success
                    </Alert>
                  </Collapse>
                </div>

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
              </p>
              {loading && <CircularProgress />}
              {loading && <LinearProgress />}
              {audioTranscript && (
                <div>
                  <Card
                    raised={true}
                    variant="outlined"
                    style={{ backgroundColor: "#FFE3E1" }}
                    sx={{ borderRadius: "20px", border: 0, boxShadow: 1 }}
                  >
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Transcript:
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {audioTranscript}
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton aria-label="share">
                        <ShareIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                  <br></br>
                  <Card
                    variant="outlined"
                    style={{ backgroundColor: "#FFE3E1" }}
                    sx={{ borderRadius: "20px", border: 0, boxShadow: 1 }}
                  >
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Summary:
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {audioSummary}
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton aria-label="share">
                        <ShareIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </div>
              )}
            </div>
          </Grid>
          <Grid item xs={5}>
            <div>
              <p>
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
              </p>
              {loading && <LinearProgress />}
              {imageTranscript && (
                <Card variant="outlined" style={{ backgroundColor: "#FFE3E1" }}>
                  <div>
                    <h5>Transcript:</h5>
                    <p>{imageTranscript}</p>
                  </div>
                </Card>
              )}
            </div>
          </Grid>
          <Grid item xs={5}>
            <div>
              <p>
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
                      backgroundColor: "#C7E9B0",
                    }}
                  >
                    Upload Text
                  </Button>
                </label>
                <br></br>
                <br></br>
                <Button
                  type="submit"
                  variant="contained"
                  onClick={handleImageUpload}
                  style={{
                    backgroundColor: "#C7E9B0",
                  }}
                >
                  Transcribe
                </Button>
              </p>
              {loading && <LinearProgress />}
              {imageTranscript && (
                <Card variant="outlined" style={{ backgroundColor: "#FFE3E1" }}>
                  <div>
                    <h5>Transcript:</h5>
                    <p>{imageTranscript}</p>
                  </div>
                </Card>
              )}
            </div>
          </Grid>
        </Grid>
      </header>
    </div>
  );
}

export default App;
