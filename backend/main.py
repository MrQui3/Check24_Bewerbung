'''
main.py handels Api requests and responses:
 1. Getting all passwords from a user
 2. Logging into an account
 3. Signing up a new user
 4. Creating a password
 5. Deleting a password
 6. Searching for a password

crud.py handels the database request

models.py handels the database models

schemas.py handels the database schemas

database.py handels the database connection
'''

from hashlib import pbkdf2_hmac
from typing import Annotated

from fastapi import Depends, FastAPI, HTTPException, status, Request
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.context import CryptContext
from pydantic import BaseModel
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

from backend import crud
from backend import models
from backend import schemas
from backend.database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)
app = FastAPI()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Allowing CORS
origins = [
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

nonce = b'\xd1\xbb\xed\xbe`O\x8es\t\xad\xff \xe3\xcb}$'


class User(BaseModel):
    email: str


# Get curren user by token
async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    user = token
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user


# Api fetch to get all passwords of a user
@app.post("/all_passwords/")
async def all_passwords(current_user: Annotated[User, Depends(get_current_user)],
                        db: Session = Depends(get_db)):
    user = crud.get_user_by_email(db, email=str(current_user))
    passwords = crud.get_all_passwords(db, user_id=user.id)
    return passwords


# Api fetch to log in
@app.post("/token")
async def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], db: Session = Depends(get_db)):
    user = crud.get_user_by_email(db, email=form_data.username)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    if not pwd_context.verify(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    return {"access_token": user.email, "token_type": "bearer"}


# Api fetch to create user
@app.post("/users/")
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    else:
        return crud.create_user(db=db, user=user, password=pwd_context.hash(user.password))


# Api fetch to create a password
@app.post("/users/passwords/")
def create_password_for_user(current_user: Annotated[User, Depends(get_current_user)], password: schemas.PasswordCreate,
                             db: Session = Depends(get_db)):
    user = crud.get_user_by_email(db, email=str(current_user))
    password.name = password.name.strip()
    password.name = password.name.lower()
    return crud.create_user_password(db=db, password=password, user_id=user.id)


# Api fetch to delete a password
@app.post("/password_delete/")
def delete_password_for_user(current_user: Annotated[User, Depends(get_current_user)], password_name: str,
                             request: Request,
                             db: Session = Depends(get_db)):
    user = crud.get_user_by_email(db, email=str(current_user))
    password_name = password_name.lower()
    password_name = password_name.strip()
    return crud.delete_user_password(db=db, password_name=password_name, user_id=user.id)


# Api fetch to search for a password
@app.post("/password/")
def find_password(current_user: Annotated[User, Depends(get_current_user)], password_name: str,
                  db: Session = Depends(get_db)):
    user = crud.get_user_by_email(db, email=str(current_user))
    password_name = password_name.lower()
    password_name = password_name.strip()
    passwords = crud.get_passwords(db, password_name=password_name, user_id=user.id)
    return passwords
