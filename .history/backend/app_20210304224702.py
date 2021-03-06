from flask import Flask, request, jsonify, redirect, render_template
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy

from config import app
from handler.lesson import LessonsHandler
from handler.user import UsersHandler
from handler.level import LevelstHandler
from handler.quiz import QuizzestHandler
from handler.score import ScoresHandler

@app.route('/')
def index():
    return 'Welcome to Sign Language Puerto Rico'


# USER ENDPOINTS
@app.route("/login", methods=['POST'])
def do_login():
    return UsersHandler().do_login(request.json)


@app.route("/logout", methods=['GET'])
def do_logout():
    return UsersHandler().do_logout()


@app.route("/users", methods=['GET', 'POST'])
def get_all_or_create_users():
    if request.method == 'GET':
        return UsersHandler.get_all_users()
    elif request.method == 'POST':
        return UsersHandler.create_user(request.json)
    else:
        return jsonify(message="Method not allowed."), 405

@app.route('/users/<int:uid>', methods=['GET', 'PUT', 'DELETE'])
def get_user_by_id(uid):
    if request.method == 'GET':
        return UsersHandler.getUserById(uid)
    elif request.method == 'PUT':
        return UsersHandler.updateUser(uid, request.json)
    elif request.method == 'DELETE':
        return UsersHandler.deleteUser(uid)
    else:
        return jsonify(message="Method not allowed."), 405


# DONATIONS ENDPOINTS
@app.route('/lessons', methods=['GET', 'POST'])
def getAllLessons():
    if request.method == 'GET':
        return LessonsHandler.getAllLessons()
    elif request.method == 'POST':
        return LessonsHandler.createLesson(request.json) 
    else:
        return jsonify(message="Method not allowed."), 405


@app.route('/lessons/<int:did>', methods=['GET', 'PUT', 'DELETE'])
def getLessonById(lid):
    if request.method == 'GET':
        return LessonsHandler.getLessonById(lid)
    elif request.method == 'PUT':
        return LessonsHandler.updateLesson(lid, request.json)
    elif request.method == 'DELETE':
        return LessonsHandler.deleteLesson(lid)
    else:
        return jsonify(message="Method not allowed."), 405


@app.route('/lessons/user/<int:uid>', methods=['GET'])
def getLessonsByLevelId(lid):
    if request.method == 'GET':
        return LessonsHandler().getLessonsByLevelId(lid)
    else:
        return jsonify(message="Method not allowed."), 405


if __name__ == '__main__':
    app.run()