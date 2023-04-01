# Import flask and datetime module for showing date and time
from flask import Flask, render_template, request, redirect
import speech_recognition as sr
import datetime
import os
import openai as openai

openai.api_key = ""

#on port 5000 for now
#will be on 3000 after linking with react
  
# Initializing flask app
app = Flask(__name__)
  
# Route for seeing a data

from flask import Flask, request

app = Flask(__name__)

# @app.route('/upload', methods=['POST'])
# def handle_upload():
#   contents = request.form['contents']
#   # Do something with the contents
#   print("hello")
#   return 'Success'

input = ""
output = ""

# @app.route("/", methods=["GET"])
# def init():
#     # Returning an api for showing in  reactjs

#     transcript = ""
#     if request.method == "POST":
#         print("Form Uploaded")

#         if "file" not in request.files:
#             return redirect(request.url)
        
#         file = request.files["file"]
#         if file.filename == "":
#             return redirect(request.url)
        
#         if file:
#             recognizer = sr.Recognizer()
#             audioFile = sr.AudioFile(file)
#             with audioFile as source:
#                 data = recognizer.record(source)
#             transcript = recognizer.recognize_google(data, key=None)
#             input = transcript

#     return render_template('test.html')
  
@app.route('/', methods=["GET", "POST"])
def get_summary():
    
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

    response = openai.Completion.create(
        model="text-davinci-003",
        prompt= transcript + "\n\nTl;dr",
        temperature=0.7,
        max_tokens=60,
        top_p=1.0,
        frequency_penalty=0.0,
        presence_penalty=1
    )
    output = response['choices'][0]['text']
    
    return  render_template('test.html', transcript = transcript, summary = output)


# Running app
if __name__ == '__main__':
    app.run(debug=True, threaded=True)
