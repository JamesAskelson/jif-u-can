from flask import Blueprint, jsonify, session, request
from app.models import Post, db, PostGraphic, Comment
from ..forms.add_comment_form import CommentForm
from flask_login import current_user, login_user, logout_user, login_required

comments = Blueprint("comments", __name__)

@comments.route("/")
@login_required
def getAllUserComments():
    allUserComments = Comment.query.filter(Comment.user_id == current_user.id)
    userComments = [comment.to_dict() for comment in allUserComments]
    return userComments

@comments.route("/new", methods=["POST"])
@login_required
def new_comment():
    form = CommentForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        data = form.data
        new_comment = Comment(
            user_id=data["user_id"],
            post_id=data["post_id"],
            text=data["text"],
            url=data["url"]
        )

        db.session.add(new_comment)
        db.session.commit()

        return new_comment.to_dict()

    if form.errors:
        return form.errors

@comments.route("/<commentId>", methods=["PATCH"])
@login_required
def edit_comment(commentId):

    form = CommentForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():

        data = form.data
        comment = Comment.query.get(commentId)

        comment.user_id=data["user_id"]
        comment.post_id=data["post_id"]
        comment.text=data["text"]
        comment.url=data["url"]

        db.session.commit()

        return comment.to_dict()

    if form.errors:
        return form.errors

@comments.route("/<commentId>", methods=["DELETE"])
@login_required
def delete_comment(commentId):

    comment = Comment.query.get(commentId)
    if not comment:
        return {"message": "bruh"}, 404
    db.session.delete(comment)
    db.session.commit()

    return {"message": "Comment Deleted"}
