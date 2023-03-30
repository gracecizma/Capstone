from flask import Blueprint, jsonify, session, request
from app.models import Product, db, User, Review, Category
from app.forms import ProductForm, ImageForm
from flask_login import current_user
from datetime import datetime

product_routes = Blueprint('product', __name__)


# Get all products
@product_routes.route('/')
def get_all_products():
    products = Product.query.all()
    return {'products': [product.to_dict() for product in products]}


# Get a single product
@product_routes.route('/<int:id>')
def get_one_product(id):
    product = Product.query.get(id)
    seller = User.query.get(product.seller_id)
    product_obj = product.to_dict()
    product_obj['seller'] = seller.to_dict()
    return product_obj


# Define a product API endpoint that returns the image URLs for a product
# @product_routes.route('/api/products/<int:id>/images')
# def get_product_images(id):
#     # Assume that we have a database or other data source that contains image URLs for each product
#     # For this example, we'll just return a list of image URLs for the product ID that was requested
#     images = [
#         'https://example.com/image1.jpg',
#         'https://example.com/image2.jpg',
#         'https://example.com/image3.jpg'
#     ]
#     return jsonify(images)


# Delete a product
@product_routes.route('/<int:id>', methods=['DELETE'])
def delete_product(id):
    if current_user.is_authenticated:
        product = Product.query.get(id)
        db.session.delete(product)
        db.session.commit()
        return {'message': 'Product deleted'}
    return {'errors': 'Unauthorized'}, 403


#  Create a product
@product_routes.route('/new', methods=['POST'])
def create_product():
    form = ProductForm()
    if current_user.is_authenticated:
        user = current_user.to_dict()
        seller_id = user['id']
        form['csrf_token'].data = request.cookies['csrf_token']
        print(form.data)
        if form.validate_on_submit():
            product = Product(
                name=form.data['name'],
                description=form.data['description'],
                price=form.data['price'],
                quantity=form.data['quantity'],
                seller_id=seller_id,
                image_url=form.data['image_url'],
                category_id=form.data['category_id'],
                created_at=datetime.utcnow(),
                updated_at=datetime.utcnow(),
            )
            print(product.to_dict())
            db.session.add(product)
            db.session.commit()
            return product.to_dict()
        return {'errors': form.errors}, 401
    return {'errors': 'Unauthorized'}, 403


#  Update a product
@product_routes.route('/<int:id>', methods=['PUT'])
def update_product(id):
    form = ProductForm()
    if current_user.is_authenticated:
        user = current_user.to_dict()
        seller_id = user['id']
        product = Product.query.get(id)
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.is_submitted():
            product.name = form.data['name']
            product.description = form.data['description']
            product.price = form.data['price']
            product.quantity = form.data['quantity']
            product.seller_id = seller_id
            product.category_id = form.data['category_id']
            product.updated_at = datetime.utcnow()
            db.session.add(product)
            db.session.commit()
            return product.to_dict()
        return {'errors': form.errors}, 401
    return {'errors': 'Unauthorized'}, 403


# Get reviews for a single product
@product_routes.route('/<int:id>/reviews')
def product_reviews(id):
    reviews = Review.query.filter_by(product_id=id).all()
    return [review.to_dict() for review in reviews]


# get all categories
@product_routes.route('/categories')
def get_categories():
    categories = Category.query.all()
    return {'categories': [category.to_dict() for category in categories]}
