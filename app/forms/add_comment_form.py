from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired

class CommentForm(FlaskForm):
    user_id = IntegerField("user_id", validators=[DataRequired()])
    post_id = IntegerField("post_id", validators=[DataRequired()])
    text = StringField("text", validators=[DataRequired()])
    url = StringField("url")
    submit = SubmitField("submit")
