from app.models import db, Like, environment, SCHEMA
from .like_data import likes
from sqlalchemy.sql import text

def seed_likes():
    for like in likes:
        new_like = Like(
            user_id=like["user_id"],
            post_id=like["post_id"],
            vote=like["vote"]
        )
        db.session.add(new_like)

    db.session.commit()

def undo_likes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM likes"))

    db.session.commit()
