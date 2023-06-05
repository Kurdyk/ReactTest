from flask import Flask, request, abort
import utils

app = Flask(__name__)

@app.route("/login", methods=["POST"])
def login():
    json = request.get_json()
    try:
        user = utils.parse_json(json)
    except ValueError:
        return "Bad request", 400
    try:
        utils.verify_login(user)
        token = utils.generate_token(user)
    except ValueError:
        return "Invalid password", 401
    except KeyError:
        return "User not found", 404
    print(token)
    return token, 200

@app.route("/register", methods=["POST"])
def register():
    json = request.get_json()
    user = utils.parse_json(json)
    try:
        utils.add_new_user(user)
        token = utils.generate_token(user)
    except ValueError as err:
        return "User already exists", 409
    return token, 201