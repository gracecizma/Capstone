from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Product, Review, db

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

# Get all reviews by current user
@user_routes.route('/profile/<int:id>/reviews')
def get_reviews_by_seller(id):
    reviews = Review.query.filter_by(user_id=id).all()
    return {'reviews': [review.to_dict() for review in reviews]}


# Get all products by current user
@user_routes.route('/profile/<int:id>')
def get_products_by_seller(id):
    products = Product.query.filter_by(seller_id=id).all()
    return {'products': [product.to_dict() for product in products]}
