from app.models import db, Product, User, SCHEMA, environment
from sqlalchemy.sql import text
from random import randint
from datetime import datetime


def seed_products():
    users = User.query.all()
    chocolate_chip = Product(
        name="Chocolate Chip Cookie", description="filler text", price=20, quantity=randint(1, 20), created_at=datetime.utcnow(), updated_at=datetime.utcnow(), seller_id=users[randint(1, 3)].id
    )
    oatmeal = Product(
        name="Oatmeal Cinnamon Cookie", description="filler text", price=18, quantity=randint(1, 20), created_at=datetime.utcnow(), updated_at=datetime.utcnow(), seller_id=users[randint(1, 3)].id
    )
    cranberry = Product(
        name="Cranberry Orange Cookie", description="filler text", price=18, quantity=randint(1, 20), created_at=datetime.utcnow(), updated_at=datetime.utcnow(), seller_id=users[randint(1, 3)].id
    )
    pb_chocolate = Product(
        name="Peanut Butter Chocolate Cookie", description="filler text", price=18, quantity=randint(1, 20), created_at=datetime.utcnow(), updated_at=datetime.utcnow(), seller_id=users[randint(1, 3)].id
    )
    smores = Product(
        name="Smores Cookie", description="filler text", price=16, quantity=randint(1, 20), created_at=datetime.utcnow(), updated_at=datetime.utcnow(), seller_id=users[randint(1, 3)].id
    )
    bagel = Product(
        name="Bagel", description="filler text", price=15, quantity=randint(1, 20), created_at=datetime.utcnow(), updated_at=datetime.utcnow(), seller_id=users[randint(1, 3)].id
    )
    bread = Product(
        name="Bread", description="filler text", price=18, quantity=randint(1, 20), created_at=datetime.utcnow(), updated_at=datetime.utcnow(), seller_id=users[randint(1, 3)].id
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
