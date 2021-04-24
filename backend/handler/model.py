from flask import jsonify, session
from dao.models import Models
from util.utilities import Utilities
class ModelsHandler:

    @staticmethod
    def getAllModels():
        try:
            models = Models.getQuizzes()
            result_list = []
            for modl in models:
                result_list.append(Utilities.to_dict(modl))
            result = {
                "message": "Success!",
                "models": result_list
            }
            return jsonify(result), 200
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), 500

    @staticmethod
    def getModelById(model_id):
        try:
            modl = Models.getQuizById(model_id)
            mod_dict = Utilities.to_dict(modl)
            result = {
                "message": "Success!",
                "model": mod_dict
            }
            return jsonify(result), 200
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), 500

    @staticmethod
    def getModelsByLessonId(lesson_id):
        try:
            models = Models.getQuizzesByLessonId(lesson_id)
            result_list = []
            for modl in models:
                result_list.append(Utilities.to_dict(modl))
            result = {
                "message": "Success!",
                "models": result_list
            }
            return jsonify(result), 200
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), 500
