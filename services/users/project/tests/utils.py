from project import db
from project.api.models import User


def add_user(email="test@test.com", password="test"):
    user = User(email=email, password=password)
    db.session.add(user)
    db.session.commit()
    return user
