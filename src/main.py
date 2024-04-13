from flask import Flask, jsonify, request
from controller import get_popularity, get_bundle_2, get_bundle_3, bundle_2_attraction
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return jsonify({2:"hello"})

@app.route("/popularity", methods=["GET", "POST"])
def go_popularity():


    popularity_data = get_popularity()
    return jsonify(popularity_data)

@app.route("/bundle", methods=["GET", "POST"])
def go_bundle():
    data = request.json ## [Attraction A, Attraction B, Attraction C]
    
    if len(data) == 2:
        bundle = bundle_2_attraction(data)
    elif len(data) == 3:
        bundle = bundle_3_attraction(data)

    return jsonify(bundle)

if __name__ == '__main__':
    app.run(debug=True)