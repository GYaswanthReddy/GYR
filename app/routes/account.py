from fastapi import APIRouter, Request, Form,Depends
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from config.config import *
from routes.create_token import *
from fastapi.security import OAuth2AuthorizationCodeBearer, OAuth2PasswordBearer

route = APIRouter()

oauth2_schema = OAuth2PasswordBearer(tokenUrl="token")

templates = Jinja2Templates(directory="templates")

route.mount("/static", StaticFiles(directory="static"), name = "static")

def get_users(token: dict = Depends(oauth2_schema)):
    payload = get_current_user(token)
    print(payload)
    if payload:
        return payload
    return None

@route.post("/account")
def account(request : Request, token : dict = Depends(oauth2_schema)):
    print(token,"account")
    user_data = get_current_user(token["access"])
    print(user_data["username"])
    return templates.TemplateResponse("account.html", {"request":request,"user_data":user_data})



@route.get("/account")
def account(request : Request, current_user : str = get_users):
    print(current_user, "user_Data")
    return templates.TemplateResponse("account.html", {"request":request})