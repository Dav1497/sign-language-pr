from flask import jsonify, session
from dao.quizzes import Quizzes
from util.utilities import Utilities
class QuizzesHandler:

    @staticmethod
    def getAllQuizzes():
        try:
            quizzes = Quizzes.getQuizzes()
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
            quizzes = Quizzes.getQuizzesByLessonId(lesson_id)
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
