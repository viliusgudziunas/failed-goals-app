from project.tests.utils import add_user, register


def test_user_registration(test_app, test_db):
    """User is able to be registered via /register route"""
    client = test_app.test_client()
    response = register(client)
    print(response)
    print(response.data)
    data = response.json
    assert response.status_code == 201
    assert response.content_type == "application/json"
    assert data["status"] == "success"
    assert data["message"] == "Successfully registered"
    assert data["auth_token"]


def test_user_no_json(test_app, test_db):
    """/register route returns an error when no json is passed in"""
    client = test_app.test_client()
    response = register(client, {})
    data = response.json
    assert response.status_code == 400
    assert data["status"] == "fail"
    assert data["message"] == "Invalid payload"


def test_user_registration_no_email(test_app, test_db):
    """/register route returns an error when no email is passed in"""
    client = test_app.test_client()
    response = register(client, {"password": "test"})
    data = response.json
    assert response.status_code == 400
    assert data["status"] == "fail"
    assert data["message"] == "Invalid payload"


def test_user_registration_no_password(test_app, test_db):
    """/register route returns an error when no password is passed in"""
    client = test_app.test_client()
    response = register(client, {"email": "test@test.com"})
    data = response.json
    assert response.status_code == 400
    assert data["status"] == "fail"
    assert data["message"] == "Invalid payload"


def test_user_registration_duplicate_email(test_app, test_db):
    """
    /register route returns an error when an email is passed that already
    exists in the database
    """
    add_user()
    client = test_app.test_client()
    response = register(client)
    data = response.json
    assert response.status_code == 400
    assert data["status"] == "fail"
    assert data["message"] == "Sorry. That user already exists"
