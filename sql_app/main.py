from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer
from typing import Annotated
from . import schemas
from sql_app import models, crud
from sql_app.database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/items/")
async def read_items(token: str = Depends(oauth2_scheme)):
    return {"token": token}

@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db=db, user=user)


@app.get("/users/{user_id}", response_model=schemas.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@app.post("/users/{user_id}/passwords/", response_model=schemas.Password)
def create_password_for_user(
    user_id: int, password: schemas.PasswordCreate, db: Session = Depends(get_db)
):
    return crud.create_user_password(db=db, password=password, user_id=user_id)


@app.get("/passwords/", response_model=list[schemas.Password])
def read_passwords(password_name: str, db: Session = Depends(get_db)):
    passwords = crud.get_passwords(db, password_name)
    return passwords