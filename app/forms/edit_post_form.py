from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, IntegerField, SubmitField, BooleanField
from wtforms.validators import DataRequired, InputRequired
from app.api.aws_helper import ALLOWED_EXTENSIONS


class EditPostForm(FlaskForm):
    user_id = IntegerField("user_id", validators=[DataRequired()])
    tag_id = IntegerField("tag_id", validators=[DataRequired()])
    title = StringField("title", validators=[DataRequired()])
    description = StringField("description")
    hidden = BooleanField("hidden")
    graphic = FileField("Image File", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField("submit")
