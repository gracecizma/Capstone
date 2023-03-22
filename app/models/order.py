from .db import db, environment, SCHEMA, add_prefix_for_prod


class Order(db.Model):
    __tablename__ = "orders"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id")), nullable=False)
    total_price = db.Column(db.Float, nullable=False)
    date = db.Column(db.Date, nullable=False)

    user = db.relationship("User", back_populates="orders")
    order_product = db.relationship("OrderProduct", back_populates="order")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "total_price": self.total_price,
            "date": self.date
        }
