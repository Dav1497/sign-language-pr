from flask import jsonify, session
from dao.levels import Levels
from util.utilities import Utilities
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
    def getLevelById(level_id):
        try:
            level = level.getLevelById(level_id)
            level_dict = Utilities.to_dict(level)
            result = {
                "message": "Success!",
                "level": level_dict
            }
            return jsonify(result), 200
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), 500

    @staticmethod
    def createLevel(json):
        valid_params = LevelsHandler.verify_params(json, Level.LEVEL_REQUIRED_PARAMS)
        if valid_params:
            try:
                new_level = Level(**valid_params)
                created_level = new_level.create()
                result = {
                    "message": "Success!",
                    "level": created_lesson.to_dict(),
                }
                return jsonify(result), 201
            except Exception as err:
                return jsonify(message="Server error!", error=err.__str__()), 500
        else:
            return jsonify(message="Bad Request!"), 400

    @staticmethod
    def updateLevel(lid, json):
        valid_params = LevelsHandler.verify_params(json, LevelsHandler.LEVELS_REQUIRED_PARAMS)
        if lid and valid_params:
            try:
                level_to_update = Level.getLevelById(lid)
                if level_to_update:
                    for key, value in valid_params.items():
                        setattr(level_to_update, key, value)
                    level_to_update.update()
                    result = {
                        "message": "Success!",
                        "level": level_to_update.to_dict(),
                    }
                    return jsonify(result), 200
                else:
                    return jsonify(message="Not Found!"), 404
            except Exception as err:
                return jsonify(message="Server Error!", error=err.__str__()), 500
        else:
            return jsonify(message="Bad Request!"), 400

    @staticmethod
    def deleteLevel(lid):
        if lid:
            try:
                level_to_delete = Level.getLevelById(lid)
                if level_to_delete:
                    level_to_delete.delete()
                    return jsonify(message="Success!"), 200
                else:
                    return jsonify(message="Not Found!"), 404
            except Exception as err:
                return jsonify(message="Server Error!", error=err.__str__()), 500
        else:
            return jsonify(message="Bad Request!"), 400






   



    

  