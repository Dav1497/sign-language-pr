from util.config import db
from dao.users import Users
from dao.levels import Levels
from dao.lessons import Lessons
from dao.quizzes import Quizzes
from dao.choices import Choices
from dao.scores import Scores

db.drop_all()
db.create_all()
