from app.models import db, Product, SCHEMA, environment
from sqlalchemy.sql import text
from random import randint
from datetime import datetime


def seed_products():
    bagel = Product(
        name="Bagels", description="Fluffy and yet chewy, with a super crunchy crust. Great for sandwiches or alone.", price=8.00,
        quantity=randint(1, 20), created_at=datetime.utcnow(), updated_at=datetime.utcnow(), seller_id=1, image_url="https://i.imgur.com/RKMkkny.jpg", category_id=1
    )
    bread = Product(
        name="Bread", description="The perfect sandwich bread. Ideal for toasting. Tastes great with butter. Doesn't like to be left outside, make sure to keep in the refrigerator after cutting off a slice.", price=8.00,
        quantity=36, created_at=datetime.utcnow(), updated_at=datetime.utcnow(), seller_id=1, image_url="https://i.imgur.com/z3Xe6nG.jpg", category_id=1
    )
    cheesecake = Product(
        name="Cheesecake", description="Perfectly sweet and cheesy. Just firm enough to hold together, but soft enough to melt in your mouth. Topped with a layer of crème fraîche for an extra-special experience.", price=20,
        quantity=1, created_at=datetime.utcnow(), updated_at=datetime.utcnow(), seller_id=1, image_url="https://i.imgur.com/n87eflj.jpg", category_id=2
    )
    chocolate_chip = Product(
        name="Chocolate Chip Cookies", description="This is IT. THE cookie that started it all. The best chocolate chip cookies you'll ever have. You'll tell your kids about these cookies someday. I'm sorry for all cookies you eat in the future that just can't measure up to these.", price=9.00,
        quantity=36, created_at=datetime.utcnow(), updated_at=datetime.utcnow(), seller_id=1, image_url="https://i.imgur.com/cugUb0s.jpg", category_id=3
    )
    oatmeal = Product(
        name="Oatmeal Cinnamon Cookies", description="These cookies were created with love for the wedding of my sister and her husband. Born from an idea of a warm and spicy-sweet cinnamon cookie, without the raisins.", price=8.00,
        quantity=36, created_at=datetime.utcnow(), updated_at=datetime.utcnow(), seller_id=1, image_url="https://i.imgur.com/yRAEN0D.jpg", category_id=3
    )
    cranberry = Product(
        name="Cranberry Orange Cookies", description="The perfect twist on holiday flavors for a cookie you can eat all year. Sugar cookie-type base with dried cranberries and sweet orange, topped with an orange glaze.", price=8.00,
        quantity=36, created_at=datetime.utcnow(), updated_at=datetime.utcnow(), seller_id=1, image_url="https://i.imgur.com/OPKI9qv.jpg", category_id=3
    )
    pb_chocolate = Product(
        name="Peanut Butter Chocolate Cookies", description="For all the peanut butter lovers who just want a good cookie, this is for you. The cookie is perfectly soft and chewy, with strong peanut butter flavor. Just enough chocolate chips to balance the peanut flavor without overpowering it. Sweet and salty heaven.", price=8.00,
        quantity=36, created_at=datetime.utcnow(), updated_at=datetime.utcnow(), seller_id=1, image_url="https://i.imgur.com/XEjD34Z.jpg", category_id=3
    )
    macarons = Product(
        name="Macarons", description="Perfectly delicate shell, with a soft and sweet interior and the uniquely chewy experience you have to try to believe.", price=16.00,
        quantity=36, created_at=datetime.utcnow(), updated_at=datetime.utcnow(), seller_id=1, image_url="https://i.imgur.com/fJ1Rvws.jpg", category_id=3
    )
    # smores = Product(
    #     name="S'mores Cookies", description="This is a great product. The best product. The best you've ever had. You should buy it.", price=16,
    #     quantity=randint(1, 20), created_at=datetime.utcnow(), updated_at=datetime.utcnow(), seller_id=randint(1, 4), image_url="https://i.imgur.com/RS74Bte.jpg", category_id=3
    # )
    brownies = Product(
        name="Brownies", description="Fudgy. Rich. Topped with a dark chocolate ganache and rainbow sprinkles for an element of whimsy, though you'll eat them so fast you may not even notice. Pre-sliced for your eating convenience.", price=18.00,
        quantity=32, created_at=datetime.utcnow(), updated_at=datetime.utcnow(), seller_id=1, image_url="https://i.imgur.com/fkqcqKt.jpg", category_id=4
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
    # db.session.add(smores)
    db.session.commit()


def undo_products():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM products")

    db.session.commit()
