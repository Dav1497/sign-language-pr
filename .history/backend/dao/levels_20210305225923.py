from util.config import db


class Levels(db.Model):
    __tablename__ = 'levels'
    level_id = db.Column(db.Integer, primary_key=True)
    level_name = db.Column(db.String(100), nullable=False)
    
    def __init__(self, **args):
        self.level_name = args.get('level_name')
       
    @property
    def pk(self):
        return self.level_id

    @staticmethod
    def getLevels():
        return Levels().query.all()

    @staticmethod
    def getLevelById(lid):
        return Levels().query.filter_by(level_id=lid).first()

 