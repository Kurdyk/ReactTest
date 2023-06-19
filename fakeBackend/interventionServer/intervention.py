from flask import Blueprint, request, make_response, jsonify
from uuid import uuid4
from .db import get_db, Intervention

bp = Blueprint('intervertion', __name__, url_prefix='/intervention')

@bp.route("/new_intervention", methods=["POST"])
def add_new_intervention():
    id = int(uuid4())
    road_name = request.form["roadName"]
    description = request.form["description"]
    first_name = request.form["firstName"]
    last_name = request.form["lastName"]
    mail = request.form["mail"]

    new_intervention = Intervention(id, road_name, description, first_name, last_name, mail)
    db = get_db()

    try :
        db.session.add(new_intervention)
        db.session.commit()
    except db.IntegrityError:
        return make_response('DB Integrity Error', 505)
    else:
        return make_response("Fine", 200)
    
@bp.route("/all", methods=["GET"])
def get_interventions():
    db = get_db()
    try :
        interventions = db.session.query(Intervention).order_by(Intervention.date_ask)
        return make_response(jsonify({"content":[intervention.serialize for intervention in interventions]}), 200)
    except Exception as e:
        print(e)
        return make_response(jsonify({"message":"Error while recovering data"}), 400)
