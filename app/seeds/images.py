
from app.models import db, Image, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime
from random import randint


imgList = [
    "https://www.ncenet.com/wp-content/uploads/2020/04/No-image-found.jpg",
    "https://www.shutterstock.com/image-vector/no-item-found-vector-outline-260nw-2082716986.jpg"
]


def seed_images():
    for i in range(7):
        image = Image(
            url=imgList[randint(0, len(imgList)-1)],
            preview=True,
            product_id=i+1
        )
        db.session.add(image)
        db.session.commit()


def undo_images():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM images"))

    db.session.commit()
