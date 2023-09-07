from .db import db, environment, SCHEMA, add_prefix_for_prod
# from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class Like(db.Model, UserMixin):
    __tablename__ = 'likes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("posts.id")), nullable=False)
    vote = db.Column(db.Integer, nullable=False)  # 1 for like, -1 for dislike

    # Define relationships to User and Post
    user = db.relationship("User", back_populates="user_likes")
    post = db.relationship("Post", back_populates="post_likes")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'post_id': self.post_id,
            'vote': self.vote
        }
