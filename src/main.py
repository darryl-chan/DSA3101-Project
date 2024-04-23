from flask import Flask, jsonify, request
from controller import get_popularity, bundle_2_attraction, get_revenue_split,\
    get_bundles_with_at_least_one_mflg, get_best_bundle_revenue_split, get_names
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/attraction_names", methods=["GET", "POST"])
def get_attractions():
    attraction_names = get_names()
    return jsonify(attraction_names)

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

# Bundle 2 attractions
@app.route("/bundle", methods=["GET", "POST"])
def go_bundle():
    data = request.json ## [Attraction A, Attraction B]
    
    bundle = bundle_2_attraction(data)

    return jsonify(bundle)

# Find the best bundle highest revenue for mflg 
@app.route("/highest_bundle_revenue_mflg", methods=["GET", "POST"])
def go_find_mflg_bundle_with_highest_revenue():
    return jsonify(get_bundles_with_at_least_one_mflg())

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
