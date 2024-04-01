from flask import Flask, render_template
from controller import get_popularity


app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route("/popularity", methods=["GET", "POST"])
def go_popularity():
    popularity_data = get_popularity()
    return render_template("popularity.html", popularity = popularity_data)

if __name__ == '__main__':
    app.run(debug=True)