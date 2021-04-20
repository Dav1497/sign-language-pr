import flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os

DEV_DB = 'postgresql://aslesusr:1234@localhost/SignLanguagePR'

app = flask.Flask(__name__)
app.secret_key = "asles"

if 'DATABASE_URL' in os.environ:
    uri = os.getenv("DATABASE_URL")
    if uri.startswith("postgres://"):
        uri = uri.replace("postgres://", "postgresql://", 1)
    app.config['SQLALCHEMY_DATABASE_URI'] = uri
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = DEV_DB


db = SQLAlchemy(app)
CORS(app)