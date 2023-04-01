# Import flask and datetime module for showing date and time
from flask import Flask, flash, render_template, request, redirect, url_for
import datetime
import os
from PIL import Image
from werkzeug.utils import secure_filename
from pytesseract import pytesseract
import openai as openai
import speech_recognition as sr

openai.api_key = "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"
# will have to install tesseract
path_to_tesseract = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}

# on port 5000 for now
# will be on 3000 after linking with react

# Initializing flask app
app = Flask(__name__)

def summarize_transcript(input):
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt= input + "\n\nTl;dr",
        temperature=0,
        max_tokens=200,
        top_p=1.0,
        frequency_penalty=0.0,
        presence_penalty=1
    )
    output = response['choices'][0]['text']

    return output

    
# Route for initialize the website
@app.route("/")
def index():
    return render_template("test.html")


# Receive uploaded .wav from html, convert to text
# Converted text sent to GPT for summarization
@app.route('/audio', methods=["GET", "POST"])
def get_audioSummary():

    if request.method == "POST":
        print("Form Uploaded")

        if "audioFile" not in request.files:
            return redirect(request.url)
        
        file = request.files["audioFile"]
        if file.filename == "":
            return redirect(request.url)

        if file:
            recognizer = sr.Recognizer()
            audioFile = sr.AudioFile(file)
            with audioFile as source:
                data = recognizer.record(source)
            transcript = recognizer.recognize_google(data, key=None)

        output = summarize_transcript(transcript)

    return render_template('test.html', transcript=transcript, summary=output)

@app.route('/text', methods=["GET", "POST"])
def get_textSummary():

    if request.method == "POST":
        print("Form Uploaded")

        if "textFile" not in request.files:
            return redirect(request.url)
        
        file = request.files["textFile"]
        if file.filename == "":
            return redirect(request.url)

        file = request.files["textFile"]
        original = file.read()

        transcript = original.decode("utf-8")

        output = summarize_transcript(transcript)

    return render_template('test.html', transcript = transcript, summary = output)



def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Route for seeing a data
# Part 1: upload image to text


@app.route('/image', methods=["GET", "POST"])
def init():
    filename = ""
    result = ""
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']
        # if user does not select file, browser also
        # submit an empty part without filename
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(UPLOAD_FOLDER, filename))
            # return redirect(url_for('uploaded_file',filename=filename))
            # convert image to text
            image_path = UPLOAD_FOLDER + "/" + file.filename
            img = Image.open(image_path)
            pytesseract.tesseract_cmd = path_to_tesseract
            text = pytesseract.image_to_string(img)
            transcript = text[:-1]
    return transcript


# # part 2: upload and read text and summarize (does not work, add this)
# def textSummarize():
#     result = ""
#     if request.method == "POST":
#         if "file" not in request.files:
#             return redirect(request.url)

#         uploaded_file = request.files['file']
#         if uploaded_file:
#             data = uploaded_file.read()
#             result = get_summary(data)
#     return render_template('test.html', result=result)

# for testing if it connects with react stuff





#     return  render_template('test.html', transcript = transcript, summary = output)



# Receive uploaded .wav from html, convert to text
# Converted text sent to GPT for summarization
# Running app
if __name__ == '__main__':
    app.run(debug=True, threaded=True)
