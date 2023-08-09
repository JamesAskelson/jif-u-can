from app.models import db, PostMedia, environment, SCHEMA
from .postmedia_data import medias
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_postmedias():
    for media in medias:
        new_media = PostMedia(
            post_id=media["post_id"],
            url=media["url"]
        )
        db.session.add(new_media)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_postmedias():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.postmedias RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM postmedias"))

    db.session.commit()
