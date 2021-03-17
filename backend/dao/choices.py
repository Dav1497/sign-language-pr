from util.config import db

class Choices(db.Model):
    __tablename__ = 'choices'
    choice_id = db.Column(db.Integer, primary_key=True)
    quiz_id = db.Column(db.Integer, db.ForeignKey('quizzes.quiz_id'), nullable=False)
    choice_text= db.Column(db.String(500), nullable=False)

    def __init__(self, **args):
        self.quiz_id = args.get('quiz_id')
        self.choice_text = args.get('choice_text')

    @property
    def pk(self):
        return self.choice_id

    @staticmethod
    def getChoices():
        return Choices().query.all()

    @staticmethod
    def getChoicesById(cid):
        return Choices().query.filter_by(choice_id=cid).first()

    @staticmethod
    def getChoicesByQuizId(qid):
        return Choices().query.filter_by(quiz_id=qid).all()
