from flask import Blueprint, jsonify, session, request, url_for
from app.models import db, CartItem
from app.forms import AddToCart
from flask_login import current_user

cart_routes = Blueprint('shopping-cart', __name__)


# Get a user's cart
@cart_routes.route('/')
def get_cart():
    user = current_user.to_dict()

    user_cart = CartItem.query.filter(CartItem.user_id == user["id"])
    items_list = []

    for item in list(user_cart):
        item_dict = item.to_dict()
        item_dict["product"] = item.product.to_dict()
        items_list.append(item_dict)

    print("items_list", items_list)
    return items_list


# POST Add a listing to a cart
@cart_routes.route('/', methods=['POST'])
def add_to_cart():
    res = request.get_json()
    print("request to add", res)

    form = AddToCart()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.is_submitted():
        cart = CartItem(
            product_id=res["product_id"],
            user_id=res["user_id"],
            quantity=form.data["quantity"]
        )
        db.session.add(cart)
        db.session.commit()
        return cart.to_dict()


# PUT Update a cart listing purchase quantity
@cart_routes.route('/', methods=["PUT"])
def update_quantity():
    res = request.get_json()

    cart_item = CartItem.query.get(res["id"])

    if cart_item:
        cart_item.quantity = res["quantity"]
        db.session.commit()

    return cart_item.to_dict()


# DELETE Remove a listing from a cart
@cart_routes.route('/', methods=["DELETE"])
def delete_from_cart():
    res = request.get_json()

    delete_item = CartItem.query.get(res["id"])

    if delete_item:
        db.session.delete(delete_item)
        db.session.commit()
        return {"Response": f"Successfully deleted item."}
