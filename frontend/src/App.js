// Importing modules
import React, { useState, useEffect } from "react";
import "./App.css";
import Main from './components/Main';

function App() {

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          const contents = e.target.result;
          fetch('/upload', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ contents })
          });
        };
        reader.readAsDataURL(file);
        
      };
      
  
    return (
        <div className="App">
            <input type="file" name="Upload">

            </input>
        </div>
    );  
};
  
export default App;