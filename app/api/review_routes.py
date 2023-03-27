from flask import Blueprint, jsonify, session, request
from app.models import Review, db, User
from flask_login import current_user
from datetime import datetime

from app.forms.new_review_form import NewReviewForm
from app.forms.update_review_form import UpdateReviewForm

review_routes = Blueprint("review", __name__)

# Get all reviews
@review_routes.route('/')
def get_all_reviews():
    reviews = Review.query.all()
    return [review.to_dict() for review in reviews]


# Get reviews for a single product
@review_routes.route('/product/<int:id>')
def product_reviews(id):
    reviews = Review.query.filter(id == Review.product_id)
    return [review.to_dict() for review in reviews]


# Create new review
@review_routes.route('/new', methods=["POST"])
def new_review():
    form = NewReviewForm()
    if current_user.is_authenticated:
        user = current_user.to_dict()
        user_id=user["id"]
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.is_submitted():
            review = Review(
                user_id=user_id,
                product_id=form.data["product_id"],
                comment = form.data["comment"],
                stars=form.data["stars"],
                created_at=datetime.utcnow(),
                updated_at=datetime.utcnow()
            )
            db.session.add(review)
            db.session.commit()
            return review.to_dict()
        return {"errors": form.errors}, 401
    return {"errors": "Unauthorized"}, 403

#  Update review
@review_routes.route('/<int:id>', methods=["PUT"])
def update_review(id):
    review = Review.query.get(id)
    form = UpdateReviewForm()
    if current_user.is_authenticated:
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.is_submitted():
            review.comment = form.data["comment"]
            review.stars = form.data["stars"]
            review.updated_at = datetime.utcnow()
            db.session.add(review)
            db.session.commit()
            return review.to_dict()
        return {"errors": form.errors}, 401
    return {"errors": "Unauthorized"}, 403


#  Delete a review
@review_routes.route('/<int:id>', methods=["DELETE"])
def delete_review(id):
    if current_user.is_authenticated:
        review = Review.query.get(id)
        db.session.delete(review)
        db.session.commit()
        return {'message': 'Review deleted'}
    return {'errors': 'Unauthorized'}, 403
