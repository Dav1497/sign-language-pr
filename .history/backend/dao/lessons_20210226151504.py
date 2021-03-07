from backend.util.config import db


class Lessons(db.Model):
    __tablename__ = 'lessons'
    lesson_id = db.Column(db.Integer, primary_key=True)
    lname = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    level_id = db.Column(db.Integer, db.ForeignKey('levels.level_id'), nullable=False)
    video_url = db.Column(db.String(500), nullable=False)
    max_xp = db.Column(db.Integer, nullable=True)

    def __init__(self, **args):
        self.lname = args.get('lname')
        self.description = args.get('description')
        self.level_id = args.get('level_id')
        self.video_url = args.get('video_url')
        self.max_xp = args.get('max_xp')

    @property
    def pk(self):
        return self.lesson_id

    @staticmethod
    def getLessons():
        return Lessons().query.all()

    @staticmethod
    def getLessonsById(lid):
        return Lessons().query.filter_by(lesson_id=lid).first()

    @staticmethod
    def getLessonsByLevelId(levid):
        return Lessons().query.filter_by(level_id=levid).all()

 