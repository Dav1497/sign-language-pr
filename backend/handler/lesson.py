from flask import jsonify, session
from dao.lessons import Lessons
from util.utilities import Utilities


class LessonsHandler:

    @staticmethod
    def getAllLessons():
        try:
            lessons = Lessons.getAllLessons()
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

    @staticmethod
    def getLessonsByLevelId(level_id):
        try:
            lessons = Lessons.getLessonsByLevelId(level_id)
            result_list = []
            for lesson in lessons:
                result_list.append(Utilities.to_dict(lesson))
            result = {
                "message": "Success!",
                "lessons": result_list
            }
            return jsonify(result), 200
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), 500


    

  