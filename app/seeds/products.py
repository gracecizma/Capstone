from app.models import db, Product, User, SCHEMA, environment
from sqlalchemy.sql import text
from random import randint
from datetime import datetime


def seed_products():
    users = User.query.all()
    chocolate_chip = Product(
        name="Chocolate Chip Cookie", description="filler text", price=20, quantity=randint(1, 20), created_at=datetime.utcnow(), updated_at=datetime.utcnow(), seller_id=users[randint(1, 3)].id, image_url="https://www.ncenet.com/wp-content/uploads/2020/04/No-image-found.jpg"
    )
    oatmeal = Product(
        name="Oatmeal Cinnamon Cookie", description="filler text", price=18, quantity=randint(1, 20), created_at=datetime.utcnow(), updated_at=datetime.utcnow(), seller_id=users[randint(1, 3)].id, image_url="https://www.ncenet.com/wp-content/uploads/2020/04/No-image-found.jpg"
    )
    cranberry = Product(
        name="Cranberry Orange Cookie", description="filler text", price=18, quantity=randint(1, 20), created_at=datetime.utcnow(), updated_at=datetime.utcnow(), seller_id=users[randint(1, 3)].id, image_url="https://www.ncenet.com/wp-content/uploads/2020/04/No-image-found.jpg"
    )
    pb_chocolate = Product(
        name="Peanut Butter Chocolate Cookie", description="filler text", price=18, quantity=randint(1, 20), created_at=datetime.utcnow(), updated_at=datetime.utcnow(), seller_id=users[randint(1, 3)].id, image_url="https://www.ncenet.com/wp-content/uploads/2020/04/No-image-found.jpg"
    )
    smores = Product(
        name="Smores Cookie", description="filler text", price=16, quantity=randint(1, 20), created_at=datetime.utcnow(), updated_at=datetime.utcnow(), seller_id=users[randint(1, 3)].id, image_url="https://www.ncenet.com/wp-content/uploads/2020/04/No-image-found.jpg"
    )
    bagel = Product(
        name="Bagel", description="filler text", price=15, quantity=randint(1, 20), created_at=datetime.utcnow(), updated_at=datetime.utcnow(), seller_id=users[randint(1, 3)].id, image_url="https://www.ncenet.com/wp-content/uploads/2020/04/No-image-found.jpg"
    )
    bread = Product(
        name="Bread", description="filler text", price=18, quantity=randint(1, 20), created_at=datetime.utcnow(), updated_at=datetime.utcnow(), seller_id=users[randint(1, 3)].id, image_url="https://www.ncenet.com/wp-content/uploads/2020/04/No-image-found.jpg"
    )

    db.session.add(chocolate_chip)
    db.session.add(oatmeal)
    db.session.add(cranberry)
    db.session.add(pb_chocolate)
    db.session.add(smores)
    db.session.add(bagel)
    db.session.add(bread)
    db.session.commit()


def undo_products():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM products")

    db.session.commit()
