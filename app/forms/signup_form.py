from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Invalid Credentials.')

def username_len(form, field):
    username = field.data
    username = form.data["email"]
    if len(username) < 4:
        raise ValidationError("Username must be 4 or more characters long")


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Invalid Credentials.')

def email_ending(form, field):
    email = field.data
    if not (email.lower().endswith('.com') or email.lower().endswith('.io')):
        raise ValidationError('Email must end with .com or .io')

def password_len(form, field):
    password = field.data
    password = form.data["email"]
    if len(password) < 8:
        raise ValidationError("Password must be more than 8 characters long")


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists, username_len])
    email = StringField('email', validators=[DataRequired(), user_exists, email_ending])
    password = StringField('password', validators=[DataRequired(), password_len])
