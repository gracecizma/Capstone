from .db import db, environment, SCHEMA, add_prefix_for_prod


class Product(db.Model):
    __tablename__ = "products"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False, unique=True)
    description = db.Column(db.String(255), nullable=False, unique=True)
    price = db.Column(db.Float(), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)
    seller_id = db.Column(db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)
    image_url = db.Column(db.String(1000), nullable=False)


    # images = db.relationship('Image', back_populates='product')
    cart_item = db.relationship("CartItem", back_populates='product', cascade="delete, merge, save-update")
    order_product = db.relationship("OrderProduct", back_populates='product')
    reviews = db.relationship("Review", back_populates="product", cascade="delete, merge, save-update")
    favorite = db.relationship("Favorite", back_populates="product", cascade="delete, merge, save-update")

    def avg_rating(self):
        if len(self.reviews) == 0:
            return 0
        return sum(review.stars for review in self.reviews) / len(self.reviews)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'quantity': self.quantity,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'seller_id': self.seller_id,
            'image_url': self.image_url,
            'avg_rating': self.avg_rating(),
            'total_reviews': len(self.reviews)
        }
