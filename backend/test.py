from flask import Flask, render_template
import datetime
import os
import openai as openai

openai.api_key = "sk-"

# just to test if it's linked with react
import datetime
  
x = datetime.datetime.now()
  
# Initializing flask app
app = Flask(__name__)
  
  
# Route for seeing a data
@app.route('/data')
def get_time():
  
    # Returning an api for showing in  reactjs
    return {
        'Name':"geek", 
        "Age":"22",
        "Date":x, 
        "programming":"python"
        }

# Running app
if __name__ == '__main__':
    app.run(debug=True)