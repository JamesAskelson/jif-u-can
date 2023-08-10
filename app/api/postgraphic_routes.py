from flask import Blueprint, jsonify, session, request
from app.models import Post, db, PostGraphic
from flask_login import current_user, login_user, logout_user, login_required

posts_graphics = Blueprint("post_graphics", __name__)
