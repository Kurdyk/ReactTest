from flask import Blueprint, request, make_response, jsonify
from uuid import uuid4
from .db import get_db, Intervention

bp = Blueprint('intervertion', __name__, url_prefix='/intervention')

@bp.route("/new_intervention", methods=["POST"])
def add_new_intervention():
    json = request.get_json()
    road_name = json["roadName"]
    description = json["description"]
    first_name = json["firstName"]
    last_name = json["lastName"]
    mail = json["mail"]

    new_intervention = Intervention(road_name=road_name, description=description, 
                                    first_name=first_name, last_name=last_name, mail=mail)
    db = get_db()

    try :
        db.session.add(new_intervention)
        db.session.commit()
    except Exception as e:
        print(e)
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
