from util.config import db


class Users(db.Model):
    __tablename__ = 'users'
    user_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(100), nullable=False)

    def __init__(self, **args):
        self.name = args.get('name')
        self.email = args.get('email')
        self.password = args.get('password')

    @property
    def pk(self):
        return self.user_id

    def create(self):
        db.session.add(self)
        db.session.commit()
        return self

    def update(self):
        db.session.add(self)
        db.session.commit()
        return self

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    @staticmethod
    def getUsers():
        return Users().query.all()

    @staticmethod
    def getUserById(uid):
        return Users().query.filter_by(user_id=uid).first()

    @staticmethod
    def getUserByEmail(uemail):
        return Users().query.filter_by(email=uemail).first()

    @staticmethod
    def verifyEmail(uemail):
        return len(Users().query.filter_by(email=uemail).all()) != 0
 