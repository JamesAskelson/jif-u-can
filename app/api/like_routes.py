from flask import Blueprint, jsonify, session, request
from app.models import Post, db, PostGraphic, User, Comment, Like
from flask_login import current_user, login_user, logout_user, login_required

likes = Blueprint("likes", __name__)

@likes.route("/new", methods=["POST"])
@login_required
def new_like():
    data = request.get_json()

    userId = data.get('user_id')
    postId = data.get('post_id')
    voteNum = data.get('vote')

    new_like = Like(
        user_id=userId,
        post_id=postId,
        vote=voteNum
    )

    db.session.add(new_like)
    db.session.commit()

    return new_like.to_dict()

@likes.route("/<likeId>", methods=["DELETE"])
@login_required
def delete_like(likeId):
    like = Like.query.get(likeId)
    if not like:
        return {"message": "Like doesn't exist"}, 404
    db.session.delete(like)
    db.session.commit()

    return like.to_dict(), 200
