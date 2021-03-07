from flask import jsonify, session
from api.dao.users import Users
from api.util.utilities import Utilities


class UsersHandler:

    @staticmethod
    def getAllUsers():
        try:
            users = Users.getUsers()
            result_list = []
            for user in users:
                result_list.append(Utilities.to_dict(user))
            result = {
                "message": "Success!",
                "users": result_list
            }
            return jsonify(result), 200
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), 500

    @staticmethod
    def getUserById(uid):
        try:
            user = Users.getUserById(uid)
            user_dict = Utilities.to_dict(user)
            result = {
                "message": "Success!",
                "user": user_dict
            }
            return jsonify(result), 200
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), 500

    #terminar esto
    @staticmethod
    def updateUser(uid, json):
        return null

    @staticmethod
    def login(json):
        try:
            if json['email'] == "" or json['password'] == "":
                return jsonify(reason="Must fill both username and password fields."), 400
            user = Users.getUserByEmail(json['email'])
            user_dic = Utilities.to_dict(user)
            if user and user.password == json['password']:
                session['logged_in'] = True
                status = True
                result = {
                    "message": "Success!",
                    "user": user_dic
                }
                return jsonify(result), 200
            else:
                return jsonify(reason="Incorrect email or password."), 401
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), 500

    @staticmethod
    def logout():
        try:
            session['logged_in'] = False
            return jsonify(status='Success!'), 200
        except Exception as err:
            return jsonify(reason="Server error!", error=err.__str__()), 500