from .db import db, environment, SCHEMA, add_prefix_for_prod
# from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime


class Post(db.Model, UserMixin):
    __tablename__ = 'posts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    tag_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("tags.id")))
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(1000), nullable=True)
    hidden = db.Column(db.Boolean, nullable=False)
    created_date = db.Column(db.DateTime, default=datetime.utcnow)


    post_likes = db.relationship("Like", back_populates="post", cascade="all, delete-orphan")

    post_comments = db.relationship("Comment", backref="post", cascade="all, delete-orphan")

    post_graphics = db.relationship("PostGraphic", backref="post", cascade="all, delete-orphan")

    post_favorites = db.relationship("Favorite", back_populates="post", cascade="all, delete-orphan")

    user = db.relationship("User", back_populates="user_posts", lazy="select")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'tag_id': self.tag_id,
            'title': self.title,
            'description': self.description,
            'hidden': self.hidden,
            'created_date': self.created_date,
            'post_comments': [comment.to_dict() for comment in self.post_comments],
            'post_graphic': [postgraphic.to_dict() for postgraphic in self.post_graphics]
        }
