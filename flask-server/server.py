from flask import Flask, render_template

app =Flask(__name__)

@app.route("/members")
def members():
    return {"members": ["Member1", "Member2", "Member3"]}


if __name__ == "__main__":
    app.run(debug=True)

# import sys
# sys.path.append("C:\\Users\\User\\OneDrive - National University of Singapore\\Desktop\\y3s2\\DSA3101\\DSA3101-Project")
# from src.attraction import *
# from src.controller import get_popularity, get_bundle_2, get_bundle_3


# app = Flask(__name__)

# @app.route('/')
# def index():
#     return render_template('index.html')

# @app.route("/popularity", methods=["GET", "POST"])
# def go_popularity():
#     popularity_data = get_popularity()
#     return render_template("popularity.html", popularity = popularity_data)

# @app.route("/bundle", methods=["GET", "POST"])
# def go_bundle():
#     bundle = get_bundle_2()
#     return render_template("popularity.html", bundle = bundle)

# if __name__ == '__main__':
#     app.run(debug=True)
