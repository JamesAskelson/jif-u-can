from flask import Blueprint, jsonify, session, request
from app.models import Post, db, PostGraphic, Comment
from flask_login import current_user, login_user, logout_user, login_required

comments = Blueprint("comments", __name__)

@comments.route("/")
@login_required
def getAllUserComments():
    allUserComments = Comment.query.filter(Comment.user_id == current_user.id)
    userComments = [comment.to_dict() for comment in allUserComments]
    return userComments
