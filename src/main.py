from flask import Flask, jsonify, request
from controller import get_popularity, bundle_2_attraction, get_revenue_split, get_bundle_2, get_bundle_with_highest_revenue
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
    data = request.json ## [Attraction A, Attraction B]
    revenue_split = get_revenue_split(data)
    return jsonify(revenue_split)

@app.route("/bundle", methods=["GET", "POST"])
def go_bundle():
    data = request.json ## [Attraction A, Attraction B]
    
    bundle = bundle_2_attraction(data)

    return jsonify(bundle)

# Find best bundles for every combination
@app.route("/best_bundles", methods=["GET", "POST"])
def go_find_best_bundle():
    return jsonify(get_bundle_2())


# Find the best bundle highest revenue
@app.route("/highest_bundle_revenue", methods=["GET", "POST"])
def go_find_bundle_with_highest_revenue():
    return jsonify(get_bundle_with_highest_revenue())

if __name__ == '__main__':
    app.run(debug=True)