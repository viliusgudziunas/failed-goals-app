import json
from project import db
from project.api.models import User


def add_user(email="test@test.com", password="test"):
    """
    Helper method for adding a user to the database with default credentials
    """
    user = User(email=email, password=password)
    db.session.add(user)
    db.session.commit()
    return user


register_credentials = {
    "email": "test@test.com",
    "password": "test"
}


def register(client, credentials=register_credentials):
    """Helper method for registering a user with default credentials"""
    response = client.post(
        "/auth/register",
        data=json.dumps(credentials),
        content_type="application/json"
    )
    return response
