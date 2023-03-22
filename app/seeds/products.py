from app.models import db, Product, SCHEMA, environment
from sqlalchemy.sql import text
import random


def seed_products():

    imgList = [
        "https://www.ncenet.com/wp-content/uploads/2020/04/No-image-found.jpg"
    ]

    productList = []
    for idx, link in enumerate(imgList):
        product = Product(
            product_name=f'Baked Good',
            description="This is a filler description for this obviously unique and delicious baked product.",
            price=15.05+idx,
            seller_id=random.randint(2, 3),
            stock=random.randint(6, 18),
            preview_img=link,
        )
        productList.append(product)

    db.session.add_all(productList)
    db.session.commit()


def undo_products():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM products")

    db.session.commit()
