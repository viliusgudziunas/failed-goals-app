from flask import Blueprint
from flask_restful import Resource, Api

users_ping_bp = Blueprint("users_ping", __name__)
api = Api(users_ping_bp)


class UsersPing(Resource):
    def get(self):
        return {
            "status": "success",
            "message": "pong!"
        }


api.add_resource(UsersPing, "/users/ping")
