from .db import db, environment, SCHEMA, add_prefix_for_prod


class Favorite(db.Model):
    __tablename__ = "favorites"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id")), nullable=False)
    product_id = db.Column(db.ForeignKey(add_prefix_for_prod(
        "products.id")), nullable=False)
    is_favorite = db.Column(db.Boolean, nullable=False)

    user = db.relationship("User", back_populates="favorites")
    product = db.relationship("Product", back_populates="favorite")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "product_id": self.product_id,
            "is_favorite": self.is_favorite
        }
