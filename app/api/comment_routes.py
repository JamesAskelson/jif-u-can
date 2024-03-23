from flask import Blueprint, jsonify, session, request
from app.models import Post, db, PostGraphic, Comment, User
from ..forms.add_comment_form import CommentForm
from flask_login import current_user, login_user, logout_user, login_required
from sqlalchemy.orm import joinedload
from app.api.aws_helper import (
    upload_file_to_s3, get_unique_filename, remove_file_from_s3)


comments = Blueprint("comments", __name__)

@comments.route("/")
def getAllComments():
    allComments = Comment.query.options(joinedload(Comment.user)).all()

    comm_dicts = []
    for comment in allComments:
        comm_dict = comment.to_dict()
        comm_dict['user'] = comment.user.to_dict()
        comm_dicts.append(comm_dict)
    return jsonify(comm_dicts)

@comments.route("/new", methods=["POST"])
@login_required
def new_comment():
    form = CommentForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        data = form.data
        image = data["url"]
        if image:
            image.file = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)
            url = upload['url']
            new_comment = Comment(
            user_id=data["user_id"],
            post_id=data["post_id"],
            text=data["text"],
            url=url)
        else:
            new_comment = Comment(
            user_id=data["user_id"],
            post_id=data["post_id"],
            text=data["text"],
            url=data['url'])

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

        url = data['url']
        if url is not None:
            if comment.url is not None:
                comment.user_id=data["user_id"]
                comment.post_id=data["post_id"]
                comment.text=data["text"]
                remove = remove_file_from_s3(comment.url)
                newurl = data['url']
                newurl.filename = get_unique_filename(newurl.filename)
                upload = upload_file_to_s3(newurl)
                url = upload["url"]
                comment.url=url
            else:
                comment.user_id=data["user_id"]
                comment.post_id=data["post_id"]
                comment.text=data["text"]
                newurl = data['url']
                newurl.filename = get_unique_filename(newurl.filename)
                upload = upload_file_to_s3(newurl)
                url = upload["url"]
                comment.url=url
        else:
            comment.user_id=data["user_id"]
            comment.post_id=data["post_id"]
            comment.text=data["text"]
            comment.url=None

        db.session.commit()

        return comment.to_dict()

    if form.errors:
        return form.errors

@comments.route("/<commentId>", methods=["DELETE"])
@login_required
def delete_comment(commentId):

    comment = Comment.query.get(commentId)
    user_data = comment.user.to_dict()
    if not comment:
        return {"message": "bruh"}, 404
    db.session.delete(comment)
    db.session.commit()

    return {"message": "Comment Deleted"}
