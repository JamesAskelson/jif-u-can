from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired
from app.api.aws_helper import ALLOWED_EXTENSIONS

class CommentForm(FlaskForm):
    user_id = IntegerField("user_id", validators=[DataRequired()])
    post_id = IntegerField("post_id", validators=[DataRequired()])
    text = StringField("text")
    url = FileField("Image File", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField("submit")
