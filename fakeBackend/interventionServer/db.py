from flask import g
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func, sql
import datetime
import uuid

db = SQLAlchemy()

def init_app(app):

    with app.app_context():
        db.init_app(app)
        db.create_all()


def get_db():
    if 'db' not in g:
        g.db = db
    return g.db

class Intervention(db.Model):
    __tablename__ = "intervention"

    def default_id():
        return str(uuid.uuid4())
    
    def default_date():
        current_date = datetime.date.today()
        return f"{current_date.day}/{current_date.month}/{current_date.year}"

    id = db.Column(db.String(36), primary_key = True, default=default_id)
    road_name = db.Column(db.String(64), nullable=False)
    description = db.Column(db.String(2048), nullable=False)
    first_name = db.Column(db.String(64), nullable=False)
    last_name = db.Column(db.String(128), nullable=False)
    mail = db.Column(db.String(128), nullable=False)
    date_ask = db.Column(db.String(10), default=default_date, nullable=False)
    state = db.Column(db.String(32), nullable=False, default="Asked")
    date_solved = db.Column(db.String(10), nullable=True, default=sql.null())
    gain = db.Column(db.Integer, nullable=True, default=sql.null())
    last_modification = db.Column(db.String(64), nullable=True, default=sql.null())
    report = db.Column(db.String(2048), nullable=True, default=sql.null())

    @property
    def serialize(self):
        return {
            "interventionId": self.id,
            "roadLocalisation": self.road_name,
            "description" : self.description,
            # "firstName" : self.first_name,
            # "lastName" : self.last_name,
            # "mail": self.mail,
            "askDate" : self.date_ask,
            "lastModification" : self.last_modification,
            "state" : self.state,
            "dateSolved": self.date_solved,
            "gain" : self.gain,
            "report" : self.report,
        }

