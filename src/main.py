from flask import Flask, render_template


app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route("/popularity", methods=["GET", "POST"])
def go_popularity():
  return render_template("settings.html")

if __name__ == '__main__':
    app.run(debug=True)