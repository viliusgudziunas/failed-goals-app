import pytest
from project import create_app, db


@pytest.fixture(scope="module")
def test_app():
    """Creates test_app variable to use in tests"""
    app = create_app()
    app.config.from_object("project.config.TestingConfig")
    with app.app_context():
        yield app


@pytest.fixture(scope="function")
def test_db():
    """Creates test_db variable to use in tests"""
    db.create_all()
    yield db
    db.session.remove()
    db.drop_all()
