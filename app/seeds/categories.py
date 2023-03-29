from app.models import db, Category, SCHEMA, environment
from sqlalchemy.sql import text


def seed_categories():
    empty = Category(
        name="None"
    )
    bread = Category(
        name="Bread"
    )
    cake = Category(
        name="Cakes/Pies"
    )
    cookie = Category(
        name="Cookies"
    )
    sweets = Category(
        name="Etc Sweets"
    )
    db.session.add(empty)
    db.session.add(bread)
    db.session.add(cake)
    db.session.add(cookie)
    db.session.add(sweets)
    db.session.commit()


def undo_categories():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.categories RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM categories")

    db.session.commit()
