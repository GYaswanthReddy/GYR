from fastapi import APIRouter, Request,Form
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from config.config import *
from routes.create_token import *    
from random import randint


route = APIRouter()

templates = Jinja2Templates(directory='templates')

route.mount("/static", StaticFiles(directory = "static"), name = "static")


smtp_server = "smtp.gmail.com"
smtp_port = 587

#function to generate otp by random function
def generate_otp():
    return str(randint(100000, 999999))

#route to render the forgotpassword html page
@route.get("/forgotpassword")
def forgot(request: Request):
    return templates.TemplateResponse("forgot.html", {"request": request})

#route to handle the forgot password details to change the password for users
@route.post("/forgotpassword")
def forgot(request: Request, email: str=Form(), new_password: str = Form(), confirm_password : str = Form()):

    #filtering the user credentials using email in database
    user = REGISTER_COL.find_one({"email" : email})
    if user:

        #Confirming the password
        if new_password == confirm_password:

            #change the user password in database by hashing it using passlib bcrypt module
            REGISTER_COL.update_one({"email": email},{"$set" : {"password" : pwd_encode.hash(new_password)}})
            return templates.TemplateResponse("forgot.html", {"request": request, "msg" : "Password Successfully changed! Please Login"})
    return templates.TemplateResponse("forgot.html", {"request": request, "msg" : "User Not Found"})

