from util.config import db


class Scores(db.Model):
    __tablename__ = 'scores'
    sid = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    quiz_id = db.Column(db.Integer, db.ForeignKey('quizzes.quiz_id'), nullable=False)
    percentage = db.Column(db.Numeric, nullable=True)

    def __init__(self, **args):
        self.user_id = args.get('user_id')
        self.quiz_id = args.get('quiz_id')
        self.percentage = args.get('percentage')

    @property
    def pk(self):
        return self.sid

    def create(self):
        db.session.add(self)
        db.session.commit()
        return self

    @staticmethod
    def getScores():
        return Scores().query.all()

    @staticmethod
    def getScoresById(scoreid):
        return Scores().query.filter_by(sid=scoreid).first()

    @staticmethod
    def getScoresByUserId(uid):
        return Scores().query.filter_by(user_id=uid).first()

    @staticmethod
    def getScoresByQuizId(qid):
        return Scores().query.filter_by(quiz_id=qid).first()
 