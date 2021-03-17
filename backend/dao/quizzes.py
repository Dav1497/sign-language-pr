from util.config import db

class Quizzes(db.Model):
    __tablename__ = 'quizzes'
    quiz_id = db.Column(db.Integer, primary_key=True)
    lesson_id = db.Column(db.Integer, db.ForeignKey('lessons.lesson_id'), nullable=False)
    quiz_name= db.Column(db.String(100), nullable=False)
    model_url = db.Column(db.String(500), nullable=True)
    question = db.Column(db.String(500), nullable=False)
    img_url = db.Column(db.String(500), nullable=True)
    answer = db.Column(db.String(100), nullable=False)
    quiz_xp = db.Column(db.Integer, nullable=True)

    def __init__(self, **args):
        self.lesson_id = args.get('lesson_id')
        self.quiz_name = args.get('quiz_name')
        self.model_url = args.get('model_url')
        self.question = args.get('questions')
        self.img_url = args.get('img_url')
        self.answer = args.get('answer')
        self.quiz_xp = args.get('quiz_xp')

    @property
    def pk(self):
        return self.quiz_id

    @staticmethod
    def getQuizzes():
        return Quizzes().query.all()

    @staticmethod
    def getQuizById(qid):
        return Quizzes().query.filter_by(quiz_id=qid).first()

    @staticmethod
    def getQuizzesByLessonId(lid):
        return Quizzes().query.filter_by(lesson_id=lid).all()
