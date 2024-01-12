from fastapi import APIRouter, Request,Form, Depends, HTTPException
from fastapi.responses import RedirectResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from config.config import *
from routes.create_token import *    
from random import randint
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


route = APIRouter()

templates = Jinja2Templates(directory='templates')

route.mount("/static", StaticFiles(directory = "static"), name = "static")


smtp_server = "smtp.gmail.com"
smtp_port = 587

def generate_otp():
    return str(randint(100000, 999999))


@route.get("/forgotpassword")
def forgot(request: Request):
    return templates.TemplateResponse("forgot.html", {"request": request})


@route.post("/forgotpassword")
def forgot(request: Request, email: str=Form(), new_password: str = Form(), confirm_password : str = Form()):
    user = REGISTER_COL.find_one({"email" : email})
    if user:
        if new_password == confirm_password:
            REGISTER_COL.update_one({"email": email},{"$set" : {"password" : pwd_encode.hash(new_password)}})
            return templates.TemplateResponse("forgot.html", {"request": request, "msg" : "Password Successfully changed! Please Login"})
    return templates.TemplateResponse("forgot.html", {"request": request, "msg" : "User Not Found"})

