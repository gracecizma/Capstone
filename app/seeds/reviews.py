from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime
from random import randint


def seed_reviews():
    for i in range(20):
        review = Review(
            user_id=randint(1, 4),
            product_id=randint(1, 10),
            comment=f"This is a test review, pretend I said something profound and meaningful about this product",
            stars=randint(1, 5),
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow(),
        )
        db.session.add(review)
    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
