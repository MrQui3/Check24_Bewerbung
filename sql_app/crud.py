from sqlalchemy.orm import Session
from . import schemas
from sql_app import models


def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()

def create_user(db: Session, user: schemas.UserCreate):
    fake_hashed_password = user.password + "notreallyhashed"
    db_user = models.User(email=user.email, hashed_password=fake_hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


#Looking for the name of the password AND the owner of the password(or and are reversed, don't know why)
def get_passwords(db: Session, password_name: str, user_id: int):
    return db.query(models.Password).filter(models.Password.name == password_name or models.Password.owner_id == user_id).all()

def create_user_password(db: Session, password: schemas.PasswordCreate, user_id: int):
    db_password = models.Password(**password.dict(), owner_id=user_id)
    db.add(db_password)
    db.commit()
    db.refresh(db_password)
    return db_password