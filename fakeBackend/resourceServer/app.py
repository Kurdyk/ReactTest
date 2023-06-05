from flask import Flask
import utils

app = Flask(__name__)

@app.route("/accessRoute", methods=["GET"])
@utils.token_required
def accessRoute(current_user):
    return "CHAMPION"