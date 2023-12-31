from app.models import db, Post, environment, SCHEMA
from .post_data import posts
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_posts():
    for post in posts:
        new_post = Post(
            user_id=post["user_id"],
            tag_id=post["tag_id"],
            title=post["title"],
            description=post["description"],
            hidden=post["hidden"],
            created_date=post["created_date"]
        )
        db.session.add(new_post)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()
