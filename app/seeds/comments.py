from app.models import db, Comment, environment, SCHEMA
from .comment_data import comments
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_comments():
    for comment in comments:
        new_comment = Comment(
            user_id=comment["user_id"],
            post_id=comment["post_id"],
            text=comment["text"],
            url=comment["url"],
            created_date=comment["created_date"]
        )
        db.session.add(new_comment)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
