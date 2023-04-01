
# Import flask and datetime module for showing date and time
from flask import Flask, render_template, request, redirect
import datetime
import os
import openai as openai
import speech_recognition as sr

openai.api_key = os.getenv("sk-")

#on port 5000 for now
#will be on 3000 after linking with react
  
# Initializing flask app
app = Flask(__name__)
  
@app.route("/test", methods=["GET", "POST"])
def index():
    transcript = ""
    if request.method == "POST":
        print("Form Uploaded")

        if "file" not in request.files:
            return redirect(request.url)
        
        file = request.files["file"]
        if file.filename == "":
            return redirect(request.url)
        
        if file:
            recognizer = sr.Recognizer()
            audioFile = sr.AudioFile(file)
            with audioFile as source:
                data = recognizer.record(source)
            transcript = recognizer.recognize_google(data, key=None)

    return transcript 

# Route for seeing a data
# @app.route('/data')
# def init():
#     # Returning an api for showing in  reactjs
#     return render_template('test.html')
  
@app.route('/result')
def get_summary():
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt="A neutron star is the collapsed core of a massive supergiant star, which had a total mass of between 10 and 25 solar masses, possibly more if the star was especially metal-rich.[1] Neutron stars are the smallest and densest stellar objects, excluding black holes and hypothetical white holes, quark stars, and strange stars.[2] Neutron stars have a radius on the order of 10 kilometres (6.2 mi) and a mass of about 1.4 solar masses.[3] They result from the supernova explosion of a massive star, combined with gravitational collapse, that compresses the core past white dwarf star density to that of atomic nuclei.\n\nTl;dr",
        temperature=0.7,
        max_tokens=60,
        top_p=1.0,
        frequency_penalty=0.0,
        presence_penalty=1
    )
    return response['choices'][0]['text']


# Running app
if __name__ == '__main__':
    app.run(debug=True, threaded=True)
