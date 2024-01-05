from fastapi import APIRouter, Request,Form, Depends, HTTPException
from fastapi.responses import RedirectResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from config.config import *
from routes.create_token import *
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer

route = APIRouter()

oauth2_schema = OAuth2PasswordBearer(tokenUrl="token")

templates = Jinja2Templates(directory='templates')

route.mount("/static", StaticFiles(directory = "static"), name = "static")


@route.get("/login")
def login(request: Request): 
    return templates.TemplateResponse("login.html", {"request": request})


@route.post("/login")
async def login(request: Request, email : str = Form(), password : str = Form()):
    user = authenticate_user(email = email, password = password)
    if user:
        access_token = create_access_token(user_data = {"sub": user["email"]})
        print(access_token)
        token = Token(access_token=access_token, token_type="bearer")
        print(token,"created the token")
        return templates.TemplateResponse("login.html", {"request": request, "access_token": access_token})
    return templates.TemplateResponse("login.html", {"request": request}) 
