from flask_wtf import FlaskForm
from wtforms.fields import StringField, TextAreaField, IntegerField, SubmitField
from wtforms.validators import DataRequired
from app.models import Review


class NewReviewForm(FlaskForm):
    user_id = IntegerField("user", validators=[DataRequired()])
    product_id = IntegerField("product", validators=[DataRequired()])
    comment = StringField("comment", validators=[DataRequired()])
    stars = IntegerField("stars", validators=[DataRequired()])
