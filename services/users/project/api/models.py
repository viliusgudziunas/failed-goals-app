from datetime import datetime, timedelta
import jwt
from sqlalchemy.sql import func
from flask import current_app
from project import db, bcrypt


class User(db.Model):
    """User Model"""
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(128), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    active = db.Column(db.Boolean(), default=True, nullable=False)
    created_date = db.Column(db.DateTime, default=func.now(), nullable=False)

    def __init__(self, email, password):
        self.email = email
        self.password = bcrypt.generate_password_hash(
            password, current_app.config.get("BCRYPT_LOG_ROUNDS")
        ).decode()

    def to_json(self):
        """Returns user info in a dictionary"""
        return {
            "id": self.id,
            "email": self.email,
            "active": self.active
        }

    def encode_auth_token(self):
        """Generates auth token"""
        try:
            payload = {
                "exp": datetime.utcnow() + timedelta(
                    days=current_app.config.get("TOKEN_EXPIRATION_DAYS"),
                    seconds=current_app.config.get("TOKEN_EXPIRATION_SECONDS")
                ),
                "iat": datetime.utcnow(),
                "sub": self.id
            }
            return jwt.encode(
                payload,
                current_app.config.get("SECRET_KEY"),
                algorithm="HS256"
            )
        except Exception as err:
            return err

    @staticmethod
    def decode_auth_token(auth_token):
        """Decodes auth token"""
        try:
            payload = jwt.decode(
                auth_token, current_app.config.get("SECRET_KEY")
            )
            return payload["sub"]
        except jwt.ExpiredSignatureError:
            return "Signature expired. Please log in again"
        except jwt.InvalidTokenError:
            return "Invalid token. Please log in again"
