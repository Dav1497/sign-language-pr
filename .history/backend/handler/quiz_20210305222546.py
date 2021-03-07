from flask import jsonify, session
from dao.users import Users
from util.utilities import Utilities
class QuizzesHandler:

    @staticmethod
    def getAllQuizzes():
        try:
            quiz = Quizzes.getQuizzes()
            result_list = []
            for quiz in quizzes:
                result_list.append(Utilities.to_dict(quiz))
            result = {
                "message": "Success!",
                "quizzes": result_list
            }
            return jsonify(result), 200
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), 500

    @staticmethod
    def getQuizById(quiz_id):
        try:
            quiz = Quizzes.getQuizById(quiz_id)
            quiz_dict = Utilities.to_dict(quiz)
            result = {
                "message": "Success!",
                "quiz": quiz_dict
            }
            return jsonify(result), 200
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), 500

    @staticmethod
    def getQuizzesByLessonId(lesson_id):
        try:
            quiz = Quizzes.getQuizByLessonID(lesson_id)
            quiz_dict = Utilities.to_dict(quiz)
            result = {
                "message": "Success!",
                "quiz": quiz_dict
            }
            return jsonify(result), 200
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), 500

    @staticmethod
    def createQuizz(json):
        valid_params = QuizzesHandler.verify_params(json, Quiz.QUIZ_REQUIRED_PARAMS)
        if valid_params:
            try:
                new_quiz = Quiz(**valid_params)
                created_quiz = new_quiz.create()
                result = {
                    "message": "Success!",
                    "quiz": created_quiz.to_dict(),
                }
                return jsonify(result), 201
            except Exception as err:
                return jsonify(message="Server error!", error=err.__str__()), 500
        else:
            return jsonify(message="Bad Request!"), 400

    @staticmethod
    def updateQuiz(qid, json):
        valid_params = QuizzesHandler.verify_params(json, QuizzesHandler.QUIZZES_REQUIRED_PARAMS)
        if qid and valid_params:
            try:
                quiz_to_update = Quiz.getQuizById(qid)
                if quiz_to_update:
                    for key, value in valid_params.items():
                        setattr(quiz_to_update, key, value)
                    quiz_to_update.update()
                    result = {
                        "message": "Success!",
                        "quiz": quiz_to_update.to_dict(),
                    }
                    return jsonify(result), 200
                else:
                    return jsonify(message="Not Found!"), 404
            except Exception as err:
                return jsonify(message="Server Error!", error=err.__str__()), 500
        else:
            return jsonify(message="Bad Request!"), 400

    @staticmethod
    def deleteQuiz(qid):
        if qid:
            try:
                quiz_to_delete = Quiz.getQuizById(qid)
                if quiz_to_delete:
                    quiz_to_delete.delete()
                    return jsonify(message="Success!"), 200
                else:
                    return jsonify(message="Not Found!"), 404
            except Exception as err:
                return jsonify(message="Server Error!", error=err.__str__()), 500
        else:
            return jsonify(message="Bad Request!"), 400

    