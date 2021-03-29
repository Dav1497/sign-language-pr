import flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

DEV_DB = 'postgresql://aslesusr:1234@localhost/SignLanguagePR'
PROD_DB = 'postgres://oznwwrrmbzaouj:c3734637920c26912d7cebad22d33eb971c8925425c4f2bf342d326bd1d4cb1a@ec2-3-211-37-117.compute-1.amazonaws.com:5432/d2cm180srol83l'

app = flask.Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DEV_DB
app.secret_key = "asles"

db = SQLAlchemy(app)
CORS(app)