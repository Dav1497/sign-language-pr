from flask import Flask, request, jsonify, redirect, render_template
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy

from util.config import app
from handler.lesson import LessonsHandler
from handler.user import UsersHandler
from handler.level import LevelsHandler
from handler.model import ModelsHandler
from handler.score import ScoresHandler

@app.route('/', methods=['GET'])
def index():
    return 'Welcome to Sign Language Puerto Rico'

# USER ENDPOINTS
@app.route("/login", methods=['POST'])
def login():
    return UsersHandler().login(request.json)

@app.route("/logout", methods=['GET'])
def logout():
    return UsersHandler().logout()

@app.route("/users", methods=['GET', 'POST'])
def getAllUsersOrCreateUser():
    if request.method == 'GET':
        return UsersHandler.getAllUsers()
    elif request.method == 'POST':
        return UsersHandler.createUser(request.json)
    else:
        return jsonify(message="Method not allowed."), 405

@app.route('/users/<int:uid>', methods=['GET', 'PUT', 'DELETE'])
def getUserById(uid):
    if request.method == 'GET':
        return UsersHandler.getUserById(uid)
    elif request.method == 'PUT':
        return UsersHandler.updateUser(uid, request.json)
    elif request.method == 'DELETE':
        return UsersHandler.deleteUser(uid)
    else:
        return jsonify(message="Method not allowed."), 405


# LESSONS ENDPOINTS
@app.route('/lessons', methods=['GET', 'POST'])
def getAllLessons():
    if request.method == 'GET':
        return LessonsHandler.getAllLessons()
    elif request.method == 'POST':
        return LessonsHandler.createLesson(request.json) 
    else:
        return jsonify(message="Method not allowed."), 405


@app.route('/lessons/<int:lid>', methods=['GET'])
def getLessonById(lid):
    if request.method == 'GET':
        return LessonsHandler.getLessonById(lid)
    else:
        return jsonify(message="Method not allowed."), 405


@app.route('/lessons/level/<int:lid>', methods=['GET'])
def getLessonsByLevelId(lid):
    if request.method == 'GET':
        return LessonsHandler().getLessonsByLevelId(lid)
    else:
        return jsonify(message="Method not allowed."), 405

# LEVEL ENDPOINTS
@app.route('/levels', methods=['GET'])
def getAllLevels():
    if request.method == 'GET':
        return LevelsHandler.getAllLevels()
    else:
        return jsonify(message="Method not allowed."), 405


@app.route('/levels/<int:lid>', methods=['GET'])
def getLevelById(lid):
    if request.method == 'GET':
        return LevelsHandler.getLevelById(lid)
    else:
        return jsonify(message="Method not allowed."), 405


# MODELS ENDPOINTS
@app.route('/models', methods=['GET'])
def getAllQuizzes():
    if request.method == 'GET':
        return ModelsHandler.getAllModels()
    else:
        return jsonify(message="Method not allowed."), 405


@app.route('/models/<int:mid>', methods=['GET'])
def getModelById(mid):
    if request.method == 'GET':
        return ModelsHandler.getModelById(mid)
    else:
        return jsonify(message="Method not allowed."), 405

@app.route('/models/lessons/<int:lid>', methods=['GET'])
def getModelsByLessonId(lid):
    if request.method == 'GET':
        return ModelsHandler().getModelsByLessonId(lid)
    else:
        return jsonify(message="Method not allowed."), 405

# SCORES ENDPOINTS
@app.route('/scores', methods=['GET', 'POST'])
def getAllScores():
    if request.method == 'GET':
        return ScoresHandler().getAllScores()
    elif request.method == 'POST':
        return ScoresHandler().createScore(request.json)
    else:
        return jsonify(message="Method not allowed."), 405

@app.route('/scores/<int:sid>', methods=['GET', 'PUT', 'DELETE'])
def getScoreById(sid):
    if request.method == 'GET':
        return ScoresHandler().getScoresById(sid)
    elif request.method == 'PUT':
        return ScoresHandler().updateScore(sid, request.json)
    elif request.method == 'DELETE':
        return ScoresHandler().deleteScore(sid)
    else:
        return jsonify(message="Method not allowed."), 405

@app.route('/scores/user/<int:uid>', methods=['GET'])
def getScoresByUserId(uid):
    if request.method == 'GET':
        return ScoresHandler().getScoresByUserId(uid)
    else:
        return jsonify(message="Method not allowed."), 405

@app.route('/scores/quiz/<int:qid>', methods=['GET'])
def getScoresByQuizId(qid):
    if request.method == 'GET':
        return ScoresHandler().getScoresByQuizId(qid)
    else:
        return jsonify(message="Method not allowed."), 405

@app.route('/scores/userAndQuiz/<int:uid>/<int:qid>', methods=['GET'])
def getScoresByQuizIdAndUserId(uid, qid):
    if request.method == 'GET':
        return ScoresHandler().getScoresByQuizIdAndUserId(uid, qid)
    else:
        return jsonify(message="Method not allowed."), 405

@app.route('/scores/lesson/<int:lid>/<int:uid>', methods=['GET'])
def getScoresByLessonIdAndUserId(lid, uid):
    if request.method == 'GET':
        return ScoresHandler().getScoresByLessonIdAndUserId(lid, uid)
    else:
        return jsonify(message="Method not allowed."), 405


if __name__ == '__main__':
    app.run()