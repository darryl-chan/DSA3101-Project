from flask import Flask, jsonify, request
from controller import get_popularity, bundle_2_attraction, get_revenue_split,\
    get_bundle_2, get_bundle_with_highest_revenue, get_bundles_with_at_least_one_mflg, get_best_bundle_revenue_split
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

# Best bundle after revenue split contains mflg
@app.route("/best_bundle_revenue_split", methods=["GET", "POST"])
def go_best_bundle_revenue_split():
    revenue_split = get_best_bundle_revenue_split()
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

# Find the best bundle highest revenue for mflg
@app.route("/highest_bundle_revenue_mflg", methods=["GET", "POST"])
def go_find_mflg_bundle_with_highest_revenue():
    return jsonify(get_bundles_with_at_least_one_mflg())

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')