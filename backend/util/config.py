import flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

DEV_DB = 'postgresql://aslesusr:1234@localhost/SignLanguagePR'
PROD_DB = ''

app = flask.Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DEV_DB
app.secret_key = "asles"

db = SQLAlchemy(app)
CORS(app)