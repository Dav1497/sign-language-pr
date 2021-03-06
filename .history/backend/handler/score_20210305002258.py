from flask import jsonify, session
from api.dao.users import Users
from api.util.utilities import Utilities


class ScoresHandler:

    @staticmethod
    def getAllScores():
        try:
            score = Scores.getScores()
            result_list = []
            for score in scores:
                result_list.append(Utilities.to_dict(score))
            result = {
                "message": "Success!",
                "scores": result_list
            }
            return jsonify(result), 200
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), 500

    @staticmethod
    def getScoreById(sid):
        try:
            score = Scores.getScoreById(sid)
            score_dict = Utilities.to_dict(score)
            result = {
                "message": "Success!",
                "score": score_dict
            }
            return jsonify(result), 200
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), 500

    @staticmethod
    def getScoresByUserId(uid):
        try:
            score = Scores.getScoresByUserId(uid)
            score_dict = Utilities.to_dict(score)
            result = {
                "message": "Success!",
                "score": score_dict
            }
            return jsonify(result), 200
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), 500

    @staticmethod
    def getScoresByQuizId(qid):
        try:
            score = Scores.getScoresByQuizId(sid)
            score_dict = Utilities.to_dict(score)
            result = {
                "message": "Success!",
                "score": score_dict
            }
            return jsonify(result), 200
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), 500

    @staticmethod
    def createScore(json):
        valid_params = ScoresHandler.verify_params(json, Score.SCORE_REQUIRED_PARAMS)
        if valid_params:
            try:
                new_score = Score(**valid_params)
                created_score = new_score.create()
                result = {
                    "message": "Success!",
                    "score": created_score.to_dict(),
                }
                return jsonify(result), 201
            except Exception as err:
                return jsonify(message="Server error!", error=err.__str__()), 500
        else:
            return jsonify(message="Bad Request!"), 400

    @staticmethod
    def updateScore(sid,json):
        valid_params = ScoresHandler.verify_params(json, Score.SCORES_REQUIRED_PARAMS)
        if sid and valid_params:
            try:
                score_to_update = Score.getScoreById(sid)
                if score_to_update:
                    for key, value in valid_params.items():
                        setattr(score_to_update, key, value)
                    score_to_update.update()
                    result = {
                        "message": "Success!",
                        "score": score_to_update.to_dict(),
                    }
                    return jsonify(result), 200
                else:
                    return jsonify(message="Not Found!"), 404
            except Exception as err:
                return jsonify(message="Server Error!", error=err.__str__()), 500
        else:
            return jsonify(message="Bad Request!"), 400

    @staticmethod
    def deleteScore(sid):
        if sid:
            try:
                score_to_delete = Score.getScoreById(sid)
                if score_to_delete:
                    score_to_delete.delete()
                    return jsonify(message="Success!"), 200
                else:
                    return jsonify(message="Not Found!"), 404
            except Exception as err:
                return jsonify(message="Server Error!", error=err.__str__()), 500
        else:
            return jsonify(message="Bad Request!"), 400

    