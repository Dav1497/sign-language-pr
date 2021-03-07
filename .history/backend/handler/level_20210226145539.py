from flask import jsonify, session
from api.dao.users import Users
from api.util.utilities import Utilities


class LevelsHandler:

    @staticmethod
    def getAllLevels():
        try:
            level = Levels.getLevels()
            result_list = []
            for level in levels:
                result_list.append(Utilities.to_dict(level))
            result = {
                "message": "Success!",
                "levels": result_list
            }
            return jsonify(result), 200
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), 500

    @staticmethod
    def getLessonById(lessom_id):
        try:
            lesson = Lessons.getLessonById(lesson_id)
            lesson_dict = Utilities.to_dict(lesson)
            result = {
                "message": "Success!",
                "lesson": lesson_dict
            }
            return jsonify(result), 200
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), 500

   



    

  