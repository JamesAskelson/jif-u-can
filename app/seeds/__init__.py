from flask.cli import AppGroup
from .users import seed_users, undo_users
from .posts import seed_posts, undo_posts
from .postmedia import seed_postmedias, undo_postmedias
from .comments import seed_comments, undo_comments
from .tags import seed_tags, undo_tags

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_postmedias()
        undo_comments()
        undo_posts()
        undo_users()
        undo_tags()

    seed_tags()
    seed_users()
    seed_posts()
    seed_comments()
    seed_postmedias()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_postmedias()
    undo_comments()
    undo_posts()
    undo_users()
    undo_tags()
    # Add other undo functions here
