import pytest
from sqlalchemy.exc import IntegrityError
from project.api.models import User
from project.tests.utils import add_user


def test_add_user(test_app, test_db):
    user = add_user()
    assert user.id
    assert user.email == "test@test.com"
    assert user.active


def test_user_duplicate_email(test_app, test_db):
    add_user()
    duplicate_user = User(email="test@test.com")
    test_db.session.add(duplicate_user)
    with pytest.raises(IntegrityError):
        test_db.session.commit()


def test_to_json(test_app, test_db):
    user = add_user()
    assert isinstance(user.to_json(), dict)
