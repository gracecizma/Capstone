from app.models import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from random import randint


class Review(db.Model):
    __tablename__ = "reviews"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    user_id = db.Column(db.ForeignKey(
        add_prefix_for_prod("users.id")), nullable=False)
    product_id = db.Column(
        db.ForeignKey(add_prefix_for_prod("products.id")), nullable=False
    )
    comment = db.Column(db.String(255), nullable=False)
    stars = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)

    product = db.relationship("Product", back_populates="reviews")
    author = db.relationship("User", back_populates="reviews")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "product_id": self.product_id,
            "comment": self.comment,
            "stars": self.stars,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "author": self.author.to_dict(),
            "product": self.product.to_dict(),
        }
