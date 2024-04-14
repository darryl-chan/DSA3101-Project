from flask import Flask, jsonify, request
from controller import get_popularity, bundle_2_attraction, get_revenue_split
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

@app.route("/revenue_split", methods=["GET", "POST"])
def go_revenue_split():
    revenue_split = get_revenue_split()
    return jsonify(revenue_split)

@app.route("/bundle", methods=["GET", "POST"])
def go_bundle():
    data = request.json ## [Attraction A, Attraction B]
    
    bundle = bundle_2_attraction(data)

    return jsonify(bundle)

if __name__ == '__main__':
    app.run(debug=True)