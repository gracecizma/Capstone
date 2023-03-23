from flask import Blueprint, jsonify, session, request
from app.models import Product, db, Image, User
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
    return {'product': product_obj}


# Get all products by seller id
@product_routes.route('/seller/<int:id>')
def get_products_by_seller():
    seller_id = id
    products = Product.query.filter_by(seller_id).all()
    seller = User.query.get(id)
    return {'products': [product.to_dict() for product in products], 'seller': seller.to_dict()}


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
@product_routes.route('/', methods=['POST'])
def create_product():
    form = ProductForm()
    if current_user.is_authenticated:
        user = current_user.to_dict()
        seller_id = user['id']
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            product = Product(
                name=form.data['name'],
                description=form.data['description'],
                price=form.data['price'],
                quantity=form.data['quantity'],
                seller_id=seller_id,
                image_url=form.data['image_url'],
                created_at=datetime.utcnow(),
                updated_at=datetime.utcnow(),
            )
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
            product.updated_at = datetime.utcnow()
            db.session.add(product)
            db.session.commit()
            return product.to_dict()
        return {'errors': form.errors}, 401
    return {'errors': 'Unauthorized'}, 403
