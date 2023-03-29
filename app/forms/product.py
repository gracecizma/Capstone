from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField, DecimalField
from wtforms.validators import DataRequired, Email, ValidationError


class ProductForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
    price = IntegerField('Price', validators=[DataRequired()])
    quantity = IntegerField('Stock', validators=[DataRequired()])
    image_url = StringField('Preview Image', validators=[DataRequired()])
    # category_id = SelectField('Category', choices = [('---', "Empty"),('bread', 'Bread'), ('cake', 'Cake/Pies'), ('cookie', 'Cookies'), ('sweets', 'Etc Sweets')])
    category_id = IntegerField('Category', validators=[DataRequired()])
