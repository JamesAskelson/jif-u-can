from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .posts import Post
from datetime import datetime

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    created_date = db.Column(db.DateTime, default=datetime.utcnow)

    user_posts = db.relationship("Post", back_populates="user", cascade="all, delete-orphan")

    user_comments = db.relationship("Comment", back_populates="user", cascade="all, delete-orphan")

    user_likes = db.relationship("Like", back_populates="user", cascade="all, delete-orphan")

    user_favorites = db.relationship("Favorite", back_populates="user", cascade="all, delete-orphan")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'created_date': self.created_date
        }

    def all_user_info_to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'created_date': self.created_date,
            "user_posts": [post.to_dict() for post in self.user_posts],
            "user_comments": [comment.to_dict() for comment in self.user_comments]
        }
