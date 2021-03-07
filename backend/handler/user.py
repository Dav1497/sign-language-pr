from flask import jsonify, session
from dao.users import Users
from util.utilities import Utilities


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

    @staticmethod
    def getUserByEmail(uemail):
        try:
            user = Users.getUserByEmail(uemail)
            user_dict = Utilities.to_dict(user)
            result = {
                "message": "Success!",
                "user": user_dict
            }
            return jsonify(result), 200
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), 500

    @staticmethod
    def updateUser(uid, json):
        valid_params = Utilities.verify_parameters(json, ["user_id"])
        if uid and valid_params:
            try:
                user_to_update = Users.getUserById(uid)
                if user_to_update:
                    for key, value in valid_params.items():
                        if key == "password":
                            if value != user_to_update.password and not \
                                    bcrypt.checkpw(value.encode('utf-8'), user_to_update.password.encode('utf-8')):
                                user_to_update.update_password(value)
                        else:
                            setattr(user_to_update, key, value)
                    user_to_update.update()
                    result = {
                        "message": "Success!",
                        "user": user_to_update.to_dict(),
                    }
                    return jsonify(result), 200
                else:
                    return jsonify(message="Not Found!"), 404
            except Exception as err:
                return jsonify(message="Server Error!", error=err.__str__()), 500
        else:
            return jsonify(message="Bad Request!"), 400

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

    @staticmethod
    def deleteUser(uid):
        if uid:
            try:
                user_to_delete = Users.getUserById(uid)
                if user_to_delete:
                    user_to_delete.delete()
                    return jsonify(message="Success!"), 200
                else:
                    return jsonify(message="Not Found!"), 404
            except Exception as err:
                return jsonify(message="Server Error!", error=err.__str__()), 500
        else:
            return jsonify(message="Bad Request!"), 400
    
    @staticmethod
    def createUser(json):
        valid_params = Utilities.verify_parameters(json, ["name", "email", "password"])
        if valid_params:
            try:
                print(valid_params)
                emailExists = Users.getUserByEmail(json['email'])
                if (emailExists):
                    return jsonify(message="email already taken."), 400
                new_user = Users(**valid_params)
                created_user = new_user.create()
                result = {
                    "message": "Success!",
                    "user": Utilities.to_dict(created_user),
                }
                return jsonify(result), 201
            except Exception as err:
                return jsonify(message="Server error!", error=err.__str__()), 500
        else:
            return jsonify(message="Bad Request!"), 400