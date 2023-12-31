from .db import db, environment, SCHEMA, add_prefix_for_prod

class PostGraphic(db.Model):
    __tablename__ = "postgraphics"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("posts.id")))
    url = db.Column(db.String(255), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "post_id": self.post_id,
            "url": self.url
        }
