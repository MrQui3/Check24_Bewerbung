from backend.database import Base
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)


class Password(Base):
    __tablename__ = "passwords"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    password = Column(String, index=True)
    email = Column(String, index=True)
    username = Column(String, index=True)
    owner_id = Column(Integer, ForeignKey("users.id"))

