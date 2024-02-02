from fastapi import APIRouter, Request,Form
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from passlib.context import CryptContext
from config.config import *

route = APIRouter()

pwd_encode = CryptContext(schemes=["bcrypt"], deprecated = "auto")

templates = Jinja2Templates(directory='templates')

route.mount("/static", StaticFiles(directory = "static"), name = "static")


#route for rending the login html page
@route.get("/register")
def register(request: Request): 
    return templates.TemplateResponse("login.html", {"request": request})

#route for register details
@route.post("/register")
def register(request: Request, username: str=Form(), email: str=Form(), new_password: str=Form(),  confirm_password: str=Form()):
    try:
        #condition for username has any value
        if username:
            if confirm_password == new_password:
            #checking whether the password has upper char, special symbol, length equal or greater than 7
                if len(new_password) >= 7 and any(char.isupper() for char in new_password) and any(not char.isupper() for char in new_password):

                    #Hashing the user password using passlib bcrypt to store in database
                    hash_password = pwd_encode.hash(new_password)

                    #storing user credentials in database
                    user_data = {
                        "username" : username,
                        "email" : email,
                        "password" : hash_password,
                        "role" : "user"
                    }
                    REGISTER_COL.insert_one(user_data) 
                    return templates.TemplateResponse("login.html", {"request": request, "msg": "Succesfully Registered! Please Login"})
                return templates.TemplateResponse("login.html", {"request": request, "msg": "Password must contain atleast one upper & special symbol & length equal or greater than 7"})
        return templates.TemplateResponse("login.html", {"request": request}) 
    except Exception as e:
        return {"msg" : "Server busy at the moment! Please try again"}