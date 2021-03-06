from flask import jsonify, session
from dao.lesson import Lessons
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
            lesson = Lessons.getLessonByLevelId(level_id)
            lesson_dict = Utilities.to_dict(lesson)
            result = {
                "message": "Success!",
                "lesson": lesson_dict
            }
            return jsonify(result), 200
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), 500

    @staticmethod
    def createLessons(json):
        valid_params = LessonsHandler.verify_params(json, Lesson.LESSON_REQUIRED_PARAMS)
        if valid_params:
            try:
                new_lesson = Lesson(**valid_params)
                created_lesson = new_lesson.create()
                result = {
                    "message": "Success!",
                    "lesson": created_lesson.to_dict(),
                }
                return jsonify(result), 201
            except Exception as err:
                return jsonify(message="Server error!", error=err.__str__()), 500
        else:
            return jsonify(message="Bad Request!"), 400


    @staticmethod
    def updateLesson(lid, json):
        valid_params = LessonsHandler.verify_params(json, LessonsHandler.LESSON_REQUIRED_PARAMS)
        if lid and valid_params:
            try:
                lesson_to_update = Lesson.getLessonById(lid)
                if lesson_to_update:
                    for key, value in valid_params.items():
                        setattr(lesson_to_update, key, value)
                    lesson_to_update.update()
                    result = {
                        "message": "Success!",
                        "lesson": lesson_to_update.to_dict(),
                    }
                    return jsonify(result), 200
                else:
                    return jsonify(message="Not Found!"), 404
            except Exception as err:
                return jsonify(message="Server Error!", error=err.__str__()), 500
        else:
            return jsonify(message="Bad Request!"), 400


    @staticmethod
    def deleteLesson(lid, json):
        if lid:
            try:
                lesson_to_delete = Lesson.getLessonById(lid)
                if lesson_to_delete:
                    lesson_to_delete.delete()
                    return jsonify(message="Success!"), 200
                else:
                    return jsonify(message="Not Found!"), 404
            except Exception as err:
                return jsonify(message="Server Error!", error=err.__str__()), 500
        else:
            return jsonify(message="Bad Request!"), 400

   



    

  