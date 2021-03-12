from flask import jsonify, session
from dao.levels import Levels
from util.utilities import Utilities
class LevelsHandler:

    @staticmethod
    def getAllLevels():
        try:
            levels = Levels.getLevels()
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
            level = Levels.getLevelById(level_id)
            level_dict = Utilities.to_dict(level)
            result = {
                "message": "Success!",
                "level": level_dict
            }
            return jsonify(result), 200
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), 500

   
   



    

  