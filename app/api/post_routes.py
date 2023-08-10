from flask import Blueprint, jsonify, session, request
from app.models import Post, db, PostGraphic
from flask_login import current_user, login_user, logout_user, login_required

posts = Blueprint("posts", __name__)


@posts.route("/")
def get_all_posts():
    posts = Post.query.all()
    return [post.to_dict() for post in posts]
