from flask import Flask, jsonify, render_template
from controller import get_popularity, get_bundle_2, get_bundle_3


app = Flask(__name__)

@app.route('/')
def index():
    return jsonify({2:"hello"})

@app.route("/popularity", methods=["GET", "POST"])
def go_popularity():
    popularity_data = get_popularity()
    return jsonify(popularity_data)

@app.route("/bundle", methods=["GET", "POST"])
def go_bundle():
    bundle = get_bundle_2()
    return jsonify(bundle)

if __name__ == '__main__':
    app.run(debug=True)