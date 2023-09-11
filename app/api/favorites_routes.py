from flask import Blueprint, jsonify, session, request
from app.models import Post, db, PostGraphic, User, Comment, Like, Favorite
from flask_login import current_user, login_user, logout_user, login_required

favorites = Blueprint("favorites", __name__)

@favorites.route("/")
def get_all_favs():
    favs = Favorite.query.all()
    return [fav.to_dict() for fav in favs]

@favorites.route("/current")
@login_required
def get_all_user_favs():
    favs = Favorite.query.filter(Favorite.user_id == current_user.id)
    return [fav.to_dict() for fav in favs]

@favorites.route("/new", methods=["POST"])
@login_required
def new_fav():
    data = request.get_json()

    userId = data.get('user_id')
    postId = data.get('post_id')

    new_fav = Favorite(
        user_id=userId,
        post_id=postId,
    )

    db.session.add(new_fav)
    db.session.commit()

    return new_fav.to_dict()

@favorites.route("/<favId>", methods=["DELETE"])
@login_required
def delete_fav(favId):
    fav = Favorite.query.get(favId)
    if not fav:
         return {"message": "Fav doesn't exist"}, 404
    db.session.delete(fav)
    db.session.commit()

    return fav.to_dict(), 200
