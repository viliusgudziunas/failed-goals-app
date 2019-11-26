import json


def test_ping(test_app):
    client = test_app.test_client()
    response = client.get("/users/ping")
    data = response.json
    assert response.status_code == 200
    assert data["status"] == "success"
    assert data["message"] == "pong!"
