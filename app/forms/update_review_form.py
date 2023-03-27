from flask_wtf import FlaskForm
from wtforms.fields import StringField, TextAreaField, IntegerField, SubmitField
from wtforms.validators import DataRequired
from app.models import Review


class UpdateReviewForm(FlaskForm):
    comment = StringField("comment", validators=[DataRequired()])
    stars = IntegerField("stars", validators=[DataRequired()])
