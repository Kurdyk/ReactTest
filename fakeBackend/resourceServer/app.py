from flask import Flask, make_response, jsonify
from flask_cors import CORS
import utils

app = Flask(__name__)
CORS(app)

@app.route("/accessRoute", methods=["GET"])
@utils.token_required
def accessRoute(current_user):
    return make_response(jsonify({"Text":"CHAMPIONS"}), 200)