from flask import g
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func

db = SQLAlchemy()

def init_app(app):
    from interventionServer.fill import main

    with app.app_context():
        db.init_app(app)
        db.create_all()
        app.cli.add_command(main)


def get_db():
    if 'db' not in g:
        g.db = db
    return g.db

class Intervention(db.Model):
    __tablename__ = "intervention"
    id = db.Column(db.Integer, primary_key = True)
    road_name = db.Column(db.String(64))
    description = db.Column(db.String(2048))
    first_name = db.Column(db.String(64))
    last_name = db.Column(db.String(128))
    mail = db.Column(db.String(128))
    date_ask = db.Column(db.DateTime(timezone=True), server_default=func.now())
    accepted = db.Column(db.Boolean)
    date_solved = db.Column(db.DateTime(timezone=True))
    gain = db.Column(db.Integer)

    @property
    def serialize(self):
        return {
            'id': self.id,
            "roadName": self.road_name,
            "descrition" : self.description,
            "firstName" : self.first_name,
            "lastName" : self.last_name,
            'mail': self.mail,
            "dateAsk" : self.date_ask,
            "accepted" : self.accepted,
            "dateSolved": self.date_solved,
            "gain" : self.gain,
        }

