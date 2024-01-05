from fastapi import APIRouter, Request,Form
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from passlib.context import CryptContext
from config.config import *

route = APIRouter()

pwd_encode = CryptContext(schemes=["bcrypt"], deprecated = "auto")

templates = Jinja2Templates(directory='templates')

route.mount("/static", StaticFiles(directory = "static"), name = "static")

@route.get("/register")
def register(request: Request): 
    return templates.TemplateResponse("login.html", {"request": request})


@route.post("/register")
def register(request: Request, username: str=Form(), email: str=Form(), new_password: str=Form(),  confirm_password: str=Form()):
    if username:
        hash_password = pwd_encode.hash(new_password)
        user_data = {
            "username" : username,
            "email" : email,
            "password" : hash_password
        } 
        REGISTER_COL.insert_one(user_data)
        return templates.TemplateResponse("login.html", {"request": request, "msg": "Succesfully Registered! Please Login"}) 

    return templates.TemplateResponse("login.html", {"request": request}) 