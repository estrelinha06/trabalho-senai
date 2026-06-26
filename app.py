from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def index():
     return render_template("index.html")

@app.route("/home")
def home():
     return render_template("home.html")

@app.route("/cadastrarnovoitem")
def cadastrarnovoitem():
     return render_template("cadastrarnovoitem.html")

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')