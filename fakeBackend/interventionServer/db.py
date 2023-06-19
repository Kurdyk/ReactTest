from flask import g
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func

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
    id = db.Column(db.Integer, primary_key = True)
    road_name = db.Column(db.String(64), nullable=False)
    description = db.Column(db.String(2048), nullable=False)
    first_name = db.Column(db.String(64), nullable=False)
    last_name = db.Column(db.String(128), nullable=False)
    mail = db.Column(db.String(128), nullable=False)
    date_ask = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)
    state = db.Column(db.String(32), nullable=False, default="Asked")
    date_solved = db.Column(db.DateTime(timezone=True), nullable=True)
    gain = db.Column(db.Integer, nullable=True)
    last_modification = db.Column(db.DateTime(timezone=True), nullable=True)
    report = db.Column(db.String(2048), nullable=True)

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
