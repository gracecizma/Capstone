from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Product


class ProductForm(FlaskForm):
    id = IntegerField('id')
    name = StringField('Name', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
    price = StringField('Price', validators=[DataRequired()])
    quantity = StringField('Stock', validators=[DataRequired()])
    image_url = StringField('Preview Image', validators=[DataRequired()])
