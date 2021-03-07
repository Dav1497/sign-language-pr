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
        return null

    @staticmethod
    def updateLevel(lid, json):
        return null

    @staticmethod
    def deleteLevel(lid):
        return null






   



    

  