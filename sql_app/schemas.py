from pydantic import BaseModel

class PasswordBase(BaseModel):
    name: str
    email: str | None = None
    password: str | None = None
    username: str | None = None

class PasswordCreate(PasswordBase):
    pass

class Password(PasswordBase):
    id: int
    owner_id: int

    class Config:
        orm_mode = True


class UserBase(BaseModel):
    email: str

class User(UserBase):
    id: int
    is_active: bool
    passwords: list[Password] = []

    class Config:
        orm_mode = True

class UserCreate(UserBase):
    password: str