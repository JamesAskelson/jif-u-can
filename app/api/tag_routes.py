from flask import Blueprint, jsonify, session, request
from app.models import db, Tag
from flask_login import current_user, login_user, logout_user, login_required

tags = Blueprint("tags", __name__)

@tags.route("/")
def get_all_tags():
    allTags = Tag.query.all()
    print(allTags)
    return [tag.to_dict() for tag in allTags]
