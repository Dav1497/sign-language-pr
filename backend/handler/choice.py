from flask import jsonify, session
from dao.choices import Choices
from util.utilities import Utilities


class ChoicesHandler:

    @staticmethod
    def getAllChoices():
        try:
            choices = Choices.getChoices()
            result_list = []
            for choice in choices:
                result_list.append(Utilities.to_dict(choice))
            result = {
                "message": "Success!",
                "choices": result_list
            }
            return jsonify(result), 200
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), 500

    @staticmethod
    def getChoicesById(cid):
        try:
            choice = Choices.getChoicesById(cid)
            choice_dict = Utilities.to_dict(choice)
            result = {
                "message": "Success!",
                "choice": choice_dict
            }
            return jsonify(result), 200
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), 500

    @staticmethod
    def getChoicesByQuizId(qid):
        try:
            choices = Choices.getChoicesByQuizId(qid)
            result_list = []
            for choice in choices:
                result_list.append(Utilities.to_dict(choice))
            result = {
                "message": "Success!",
                "choices": result_list
            }
            return jsonify(result), 200
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), 500
   
   



    

  