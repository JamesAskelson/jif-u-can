from app.models import db, Tag, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_tags():
    funny = Tag(
        title="Funny",
        tagline="LOLs and LMAOs",
        url='https://aws-starter-bucket123.s3.amazonaws.com/funny_background.jpg'
    )

    fantasy = Tag(
        title="Fantasy",
        tagline="Find your inner Wizard",
        url='https://aws-starter-bucket123.s3.amazonaws.com/fantasy_background.jpg'
    )

    gaming = Tag(
        title="Gaming",
        tagline="Start your gaming adventure",
        url='https://aws-starter-bucket123.s3.amazonaws.com/gaming_background.png'
    )

    wholesome = Tag(
        title="Wholesome",
        tagline="Coming from the heart",
        url='https://aws-starter-bucket123.s3.amazonaws.com/wholesome_background.jpg'
    )

    nature = Tag(
        title="Nature",
        tagline="The great outdoors",
        url='https://aws-starter-bucket123.s3.amazonaws.com/nature_background.jpg'
    )

    db.session.add_all([funny, fantasy, gaming, wholesome, nature])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_tags():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tags RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tags"))

    db.session.commit()
