from fastapi import Depends, FastAPI, HTTPException, status
from sqlalchemy.orm import Session
from . import schemas
from sql_app import models, crud
from sql_app.database import SessionLocal, engine
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from typing import Annotated
from pydantic import BaseModel
from passlib.context import CryptContext
from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes

models.Base.metadata.create_all(bind=engine)

app = FastAPI()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

key = get_random_bytes(16)
encryption_cipher = AES.new(key, AES.MODE_EAX)
decryption_cipher = AES.new(key, AES.MODE_EAX, nonce=encryption_cipher.nonce)


class User(BaseModel):
    username: str
    email: str | None = None


async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    user = token
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user


@app.post("/token")
async def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], db: Session = Depends(get_db)):
    user = crud.get_user_by_email(db, email=form_data.username)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    if not pwd_context.verify(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect username or password")

    return {"access_token": user.email, "token_type": "bearer"}


@app.get("/testdecrypt")
def testing_decryption(current_user: Annotated[User, Depends(get_current_user)], password: str):
    return 0


@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db=db, user=user, password=pwd_context.hash(user.password))


@app.post("/users/{user_id}/passwords/", response_model=schemas.Password)
def create_password_for_user(current_user: Annotated[User, Depends(get_current_user)], password: schemas.PasswordCreate,
                             db: Session = Depends(get_db)):
    user = crud.get_user_by_email(db, email=str(current_user))
    n = encryption_cipher.encrypt(password.password)
    password.password = n
    return crud.create_user_password(db=db, password=password, user_id=user.id)


@app.get("/passwords/")
def read_passwords(current_user: Annotated[User, Depends(get_current_user)], password_name: str, db: Session = Depends(get_db)):
    user = crud.get_user_by_email(db, email=str(current_user))
    passwords = crud.get_passwords(db, password_name=password_name, user_id=user.id)
    for password in passwords:
        print(decryption_cipher.decrypt(password.password))
        return password.password
