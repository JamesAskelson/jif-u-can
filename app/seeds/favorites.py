from app.models import db, Favorite, environment, SCHEMA
from .favorites_data import favorites
from sqlalchemy.sql import text

def seed_favorites():
    for favorite in favorites:
        new_fav = Favorite(
            user_id=favorite["user_id"],
            post_id=favorite["post_id"],
        )
        db.session.add(new_fav)

    db.session.commit()

def undo_favorites():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.favorites RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM favorites"))

    db.session.commit()
