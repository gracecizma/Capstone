from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired


class ImageForm(FlaskForm):
    id = StringField('id')
    url = StringField('url', validators=[DataRequired()])
    preview = BooleanField('preview', validators=[DataRequired()])
