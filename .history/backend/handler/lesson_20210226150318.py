from flask import jsonify, session
from api.dao.users import Users
from api.util.utilities import Utilities


class LessonsHandler:

    @staticmethod
    def getAllLessons():
        try:
            lessons = Lessons.getLevels()
            result_list = []
            for lesson in lessons:
                result_list.append(Utilities.to_dict(lesson))
            result = {
                "message": "Success!",
                "lesson": result_list
            }
            return jsonify(result), 200
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), 500

    @staticmethod
    def getLessonById(lesson_id):
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

   



    

  