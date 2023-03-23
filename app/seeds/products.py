from app.models import db, Product, User, SCHEMA, environment
from sqlalchemy.sql import text
from random import randint
from datetime import datetime


def seed_products():
    users = User.query.all()
    bagel = Product(
        name="Bagel", description="filler text", price=15, quantity=randint(1, 20), created_at=datetime.utcnow(), updated_at=datetime.utcnow(), seller_id=users[randint(1, 3)].id, image_url="https://i.imgur.com/RKMkkny.jpg"
    )
    bread = Product(
        name="Bread", description="filler text", price=18, quantity=randint(1, 20), created_at=datetime.utcnow(), updated_at=datetime.utcnow(), seller_id=users[randint(1, 3)].id, image_url="https://i.imgur.com/z3Xe6nG.jpg"
    )
    cheesecake = Product(
        name="Cheesecake", description="filler text", price=20, quantity=randint(1, 20), created_at=datetime.utcnow(), updated_at=datetime.utcnow(), seller_id=users[randint(1, 3)].id, image_url="https://i.imgur.com/n87eflj.jpg"
    )
    chocolate_chip = Product(
        name="Chocolate Chip Cookie", description="filler text", price=20, quantity=randint(1, 20), created_at=datetime.utcnow(), updated_at=datetime.utcnow(), seller_id=users[randint(1, 3)].id, image_url="https://i.imgur.com/cugUb0s.jpg"
    )
    oatmeal = Product(
        name="Oatmeal Cinnamon Cookie", description="filler text", price=18, quantity=randint(1, 20), created_at=datetime.utcnow(), updated_at=datetime.utcnow(), seller_id=users[randint(1, 3)].id, image_url="https://i.imgur.com/yRAEN0D.jpg"
    )
    cranberry = Product(
        name="Cranberry Orange Cookie", description="filler text", price=18, quantity=randint(1, 20), created_at=datetime.utcnow(), updated_at=datetime.utcnow(), seller_id=users[randint(1, 3)].id, image_url="https://i.imgur.com/OPKI9qv.jpg"
    )
    pb_chocolate = Product(
        name="Peanut Butter Chocolate Cookie", description="filler text", price=18, quantity=randint(1, 20), created_at=datetime.utcnow(), updated_at=datetime.utcnow(), seller_id=users[randint(1, 3)].id, image_url="https://i.imgur.com/XEjD34Z.jpg"
    )
    macarons = Product(
        name="Macarons", description="filler text", price=22, quantity=randint(1, 20), created_at=datetime.utcnow(), updated_at=datetime.utcnow(), seller_id=users[randint(1, 3)].id, image_url="https://i.imgur.com/fJ1Rvws.jpg"
    )
    smores = Product(
        name="S'mores Cookie", description="filler text", price=16, quantity=randint(1, 20), created_at=datetime.utcnow(), updated_at=datetime.utcnow(), seller_id=users[randint(1, 3)].id, image_url="https://i.imgur.com/RS74Bte.jpg"
    )
    brownies = Product(
        name="Brownies", description="filler text", price=14, quantity=randint(1, 20), created_at=datetime.utcnow(), updated_at=datetime.utcnow(), seller_id=users[randint(1, 3)].id, image_url="https://i.imgur.com/fkqcqKt.jpg"
    )

    db.session.add(bagel)
    db.session.add(bread)
    db.session.add(cheesecake)
    db.session.add(brownies)
    db.session.add(chocolate_chip)
    db.session.add(oatmeal)
    db.session.add(cranberry)
    db.session.add(pb_chocolate)
    db.session.add(macarons)
    db.session.add(smores)
    db.session.commit()


def undo_products():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM products")

    db.session.commit()
