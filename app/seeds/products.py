from app.models import db, Product, User, SCHEMA, environment
from sqlalchemy.sql import text
from random import randint
from datetime import datetime


def seed_products():
    users = User.query.all()
    bagel = Product(
        name="Bagels", description="This is a great product. The best product. The best you've ever had. You should buy it.", price=15,
        quantity=randint(1, 20), created_at=datetime.utcnow(), updated_at=datetime.utcnow(), seller_id=randint(1, 3), image_url="https://i.imgur.com/RKMkkny.jpg", category_id=1
    )
    bread = Product(
        name="Bread", description="This is a great product. The best product. The best you've ever had. You should buy it.", price=18,
        quantity=randint(1, 20), created_at=datetime.utcnow(), updated_at=datetime.utcnow(), seller_id=randint(1, 4), image_url="https://i.imgur.com/z3Xe6nG.jpg", category_id=1
    )
    cheesecake = Product(
        name="Cheesecake", description="This is a great product. The best product. The best you've ever had. You should buy it.", price=20,
        quantity=randint(1, 20), created_at=datetime.utcnow(), updated_at=datetime.utcnow(), seller_id=randint(1, 4), image_url="https://i.imgur.com/n87eflj.jpg", category_id=2
    )
    chocolate_chip = Product(
        name="Chocolate Chip Cookies", description="This is a great product. The best product. The best you've ever had. You should buy it.", price=20,
        quantity=randint(1, 20), created_at=datetime.utcnow(), updated_at=datetime.utcnow(), seller_id=randint(1, 4), image_url="https://i.imgur.com/cugUb0s.jpg", category_id=3
    )
    oatmeal = Product(
        name="Oatmeal Cinnamon Cookies", description="This is a great product. The best product. The best you've ever had. You should buy it.", price=18,
        quantity=randint(1, 20), created_at=datetime.utcnow(), updated_at=datetime.utcnow(), seller_id=randint(1, 4), image_url="https://i.imgur.com/yRAEN0D.jpg", category_id=3
    )
    cranberry = Product(
        name="Cranberry Orange Cookies", description="This is a great product. The best product. The best you've ever had. You should buy it.", price=18,
        quantity=randint(1, 20), created_at=datetime.utcnow(), updated_at=datetime.utcnow(), seller_id=randint(1, 4), image_url="https://i.imgur.com/OPKI9qv.jpg", category_id=3
    )
    pb_chocolate = Product(
        name="Peanut Butter Chocolate Cookies", description="This is a great product. The best product. The best you've ever had. You should buy it.", price=18,
        quantity=randint(1, 20), created_at=datetime.utcnow(), updated_at=datetime.utcnow(), seller_id=randint(1, 4), image_url="https://i.imgur.com/XEjD34Z.jpg", category_id=3
    )
    macarons = Product(
        name="Macarons", description="This is a great product. The best product. The best you've ever had. You should buy it.", price=22,
        quantity=randint(1, 20), created_at=datetime.utcnow(), updated_at=datetime.utcnow(), seller_id=randint(1, 4), image_url="https://i.imgur.com/fJ1Rvws.jpg", category_id=4
    )
    smores = Product(
        name="S'mores Cookies", description="This is a great product. The best product. The best you've ever had. You should buy it.", price=16,
        quantity=randint(1, 20), created_at=datetime.utcnow(), updated_at=datetime.utcnow(), seller_id=randint(1, 4), image_url="https://i.imgur.com/RS74Bte.jpg", category_id=3
    )
    brownies = Product(
        name="Brownies", description="This is a great product. The best product. The best you've ever had. You should buy it.", price=14,
        quantity=randint(1, 20), created_at=datetime.utcnow(), updated_at=datetime.utcnow(), seller_id=randint(1, 4), image_url="https://i.imgur.com/fkqcqKt.jpg", category_id=4
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
