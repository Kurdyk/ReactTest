from flask import Blueprint, request, make_response, jsonify
from uuid import uuid4
from interventionServer.db import get_db, Intervention

bp = Blueprint('intervertion', __name__)

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
    interventions = db.session.query(Intervention).order_by(Intervention.date_ask)
    return make_response(jsonify(json_list=[intervention.serialize for intervention in interventions]), 200)
