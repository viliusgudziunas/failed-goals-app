import pytest
from sqlalchemy.exc import IntegrityError
from project.api.models import User
from project.tests.utils import add_user


def test_add_user(test_app, test_db):
    """Correct fields are populated when a new user is created"""
    user = add_user()
    assert user.id
    assert user.email == "test@test.com"
    assert user.password
    assert user.active
    assert user.created_date


def test_add_user_no_email(test_app, test_db):
    """Cannot create a user without an email"""
    user = User(email=None, password="test")
    test_db.session.add(user)
    with pytest.raises(IntegrityError):
        test_db.session.commit()


def test_add_user_duplicate_email(test_app, test_db):
    """Cannot create a user with a duplicate email"""
    add_user()
    duplicate_user = User(email="test@test.com", password="test")
    test_db.session.add(duplicate_user)
    with pytest.raises(IntegrityError):
        test_db.session.commit()


def test_to_json(test_app, test_db):
    """to_json method returns a dictionary"""
    user = add_user()
    assert isinstance(user.to_json(), dict)


def test_add_user_no_password(test_app, test_db):
    """Cannot create a user without a password"""
    with pytest.raises(ValueError):
        User(email="test@test.com", password=None)


def test_passwords_are_random(test_app, test_db):
    """Same passwords lead to different encryptions"""
    user_one = add_user()
    user_two = add_user("test2@test.com")
    assert user_one.password != user_two.password


def test_encode_auth_token(test_app, test_db):
    """encode_auth_token method returns a token in bytes"""
    user = add_user()
    auth_token = user.encode_auth_token()
    assert isinstance(auth_token, bytes)


def test_two_auth_tokens_for_one_user_match(test_app, test_db):
    """encode_auth_token method returns the same token for the same id"""
    user = add_user()
    first_auth_token = user.encode_auth_token()
    second_auth_token = user.encode_auth_token()
    assert first_auth_token == second_auth_token


def test_decode_auth_token(test_app, test_db):
    """decode_auth_token method returns a user id"""
    user = add_user()
    auth_token = user.encode_auth_token()
    assert User.decode_auth_token(auth_token) == user.id


def test_decode_auth_token_incorrect_auth_token(test_app, test_db):
    """
    decode_auth_token method does not decode
    if an incorrect user id is provided
    """
    add_user()
    auth_token = b"testIncorrectAuthToken"
    assert User.decode_auth_token(auth_token) ==\
        "Invalid token. Please log in again"


def test_decode_auth_token_expired_auth_token(test_app, test_db):
    """decode_auth_token method does not decode if auth_token is expired"""
    user = add_user()
    test_app.config["TOKEN_EXPIRATION_SECONDS"] = -1
    auth_token = user.encode_auth_token()
    assert User.decode_auth_token(auth_token) ==\
        "Signature expired. Please log in again"
