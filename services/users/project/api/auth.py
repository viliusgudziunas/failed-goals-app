from flask import Blueprint, jsonify, request
from sqlalchemy import exc
from project.api.models import User
from project import db

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/register", methods=["POST"])
def register():
    """Register user"""
    response_object = {
        "status": "fail",
        "message": "Invalid payload"
    }
    data = request.get_json()
    if not data:
        print(1)
        return jsonify(response_object), 400

    email = data.get("email")
    password = data.get("password")
    if not email or not password:
        print(2)
        return jsonify(response_object), 400

    try:
        user = User.query.filter_by(email=email).first()
        if user:
            print(3)
            response_object["message"] = "Sorry. That user already exists"
            return response_object, 400

        new_user = User(
            email=email,
            password=password
        )
        db.session.add(new_user)
        db.session.commit()
        auth_token = new_user.encode_auth_token()
        response_object = {
            "status": "success",
            "message": "Successfully registered",
            "auth_token": auth_token.decode()
        }
        return jsonify(response_object), 201

    except (exc.IntegrityError, ValueError):
        print(4)
        db.session.rollback()
        return jsonify(response_object), 400
