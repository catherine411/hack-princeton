import React from 'react';

class Main extends React.Component {
  

  render() {
    console.log("hello")
    return (
      <div id="speechContainer">
        <h1>Upload</h1>
        <form method="post" enctype="multipart/form-data">
            <input type="file" name="file" />
            
            <input type="submit" value="Transcribe" />
        </form>

        <div id="SpeechTranscript">
            <h1>Transcript</h1>
            {/* <p>{{transcript}}</p> */}
        </div>
      </div>
    );
  }
}

export default Main;