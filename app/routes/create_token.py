from passlib.context import CryptContext
from pydantic import BaseModel
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
import datetime
from jose import JWTError, jwt
from fastapi import Depends, HTTPException
from config.config import *



secret_key = "mykey"
algorithm = 'HS256'
token_expire = datetime.datetime.utcnow() + datetime.timedelta(minutes=60)

pwd_encode = CryptContext(schemes=["bcrypt"], deprecated = "auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl = 'token')


class Token(BaseModel):
    access_token : str
    token_type : str

# class TokenData(BaseModel):
#     email : str | None = None

class User(BaseModel):
    email : str
    username : str

def verify_password(password, hash_password):
    return pwd_encode.verify(password,hash_password)

def get_user(email: str):
    user = REGISTER_COL.find_one({"email": email})
    return user

def authenticate_user(email : str, password : str = None, form_data : OAuth2PasswordRequestForm = None):
    if form_data:
        email = form_data.username
        password = form_data.password
    
    user = get_user(email)
    User(email = email, username = user["username"])
    if not user and not verify_password(password, user["password"]):
        return None
    return user


def create_access_token(user_data : dict):
    encode = user_data.copy()
    expire = datetime.datetime.utcnow() + datetime.timedelta(minutes = 60)
    encode.update({"exp" : expire})
    jwt_token = jwt.encode(encode, secret_key, algorithm=algorithm)
    return jwt_token


def get_current_user(token: str = Depends(oauth2_scheme)):
    print(token,"heloo")
    payload = jwt.decode(token, secret_key, algorithms=[algorithm])
    email = payload.get('sub')
    print(email)
    user = get_user(email)
    print(user)
    if user:
        return user
    return None
