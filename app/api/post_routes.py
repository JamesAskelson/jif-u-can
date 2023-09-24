from flask import Blueprint, jsonify, session, request
from app.models import Post, db, PostGraphic, User, Comment, Like
from flask_login import current_user, login_user, logout_user, login_required
from ..forms.add_post_form import PostForm
from ..forms.edit_post_form import EditPostForm
from sqlalchemy.orm import joinedload
from app.api.aws_helper import (
    upload_file_to_s3, get_unique_filename, remove_file_from_s3)

posts = Blueprint("posts", __name__)


@posts.route("/")
def get_all_posts():
    allPosts = Post.query.options(joinedload(Post.user), joinedload(Post.post_comments).joinedload(Comment.user)).all()

    post_dicts = []
    for post in allPosts:
        post_dict = post.to_dict()
        post_dict["user"] = post.user.to_dict()

        comments = []
        for comment in post.post_comments:
            comment_dict = comment.to_dict()
            comment_dict["user"] = comment.user.to_dict()
            comments.append(comment_dict)

        post_dict["post_comments"] = comments
        post_dicts.append(post_dict)

    return jsonify(post_dicts)

@posts.route('/<int:postId>/likes')
def get_all_post_likes(postId):
    post = Post.query.get(postId)
    # print('-----------------------------------------', post.id)
    postLikes = Like.query.filter(Like.post_id == post.id).all()
    # print('-----------------------------------------', postLikes)

    return [like.to_dict() for like in postLikes]

# def get_all_posts():
#     allPosts = Post.query.all(Post).options(joinedload(Post.user)).all()
#     print("----------------", allPosts)
#     for post in allPosts:
#         for comment in post.post_comments:
#             user = comment.options(joinedload(User.user_comments)).get(1)
#             print(user)
#     print("---------------", allPosts)
#     return [post.to_dict() for post in allPosts]






# @posts.route("/<int:postId>")
# def get_one_post(postId):
#     singlePost = db.session.query(Post).options(joinedload(Post.user)).get(postId)
#     print('-------------------------', singlePost.user)
#     return {"whatever": "fasfdsafds"}

@posts.route("/new", methods=["POST"])
@login_required
def new_post():
    form = PostForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        data = form.data
        new_post = Post(
            user_id=data["user_id"],
            tag_id=data["tag_id"],
            title=data["title"],
            description=data["description"],
            hidden=data["hidden"],
        )

        db.session.add(new_post)
        db.session.commit()

        image = data["graphic"]
        # print('-------------------------------------filename', image.filename)
        # print('-------------------------------------url', image.url)
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        url = upload["url"]
        # print('url', url)
        graphic = PostGraphic(post_id=new_post.id, url=url)
        db.session.add(graphic)
        db.session.commit()

        return new_post.to_dict()

    if form.errors:
        return form.errors

@posts.route("/<postId>", methods=["PATCH"])
@login_required
def edit_post(postId):
    form = EditPostForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        data = form.data
        # print('fdsfasdfasdfasdfasdfasdfasd', data)
        post = Post.query.get(postId)

        post.user_id=data["user_id"]
        post.tag_id=data["tag_id"]
        post.title=data["title"]
        post.description=data["description"]
        post.hidden=data["hidden"]

        # db.session.commit()
        if data['graphic']:
            photo = PostGraphic.query.filter(PostGraphic.post_id == postId).first()
            remove = remove_file_from_s3(photo.url)
            new_graphic = data["graphic"]
            new_graphic.filename = get_unique_filename(new_graphic.filename)
            upload = upload_file_to_s3(new_graphic)
            if 'url' not in upload:
                return jsonify(upload), 400
            url = upload['url']
            photo.url=url

        db.session.commit()

        post_with_user = post.to_dict()
        post_with_user["user"] = post.user.to_dict()

        return post.to_dict()

    if form.errors:
        return form.errors

@posts.route("/<postId>", methods=["DELETE"])
@login_required
def delete_post(postId):

    post = Post.query.get(postId)
    photo = PostGraphic.query.filter(PostGraphic.post_id == postId).first()
    remove = remove_file_from_s3(photo.url)
    if not post:
        return {"message": "bruh"}, 404
    db.session.delete(post)
    db.session.commit()

    return post.to_dict(), 200
