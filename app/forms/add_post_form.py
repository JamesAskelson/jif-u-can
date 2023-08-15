from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField, BooleanField
from wtforms.validators import DataRequired, InputRequired

class PostForm(FlaskForm):
    user_id = IntegerField("user_id", validators=[DataRequired()])
    tag_id = IntegerField("tag_id", validators=[DataRequired()])
    title = StringField("title", validators=[DataRequired()])
    description = StringField("description")
    hidden = BooleanField("hidden")
    graphic = StringField("graphic", validators=[DataRequired()])
    submit = SubmitField("submit")
