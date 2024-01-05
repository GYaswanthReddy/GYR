from fastapi import APIRouter, Request,Form, Depends
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from config.config import *
from fastapi.responses import RedirectResponse,HTMLResponse
from routes.create_token import *
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer

route = APIRouter()

oauth2_schema = OAuth2PasswordBearer(tokenUrl="dashboard")

templates = Jinja2Templates(directory='templates')

route.mount("/static", StaticFiles(directory = "static"), name = "static")

def get_users(token: dict = Depends(oauth2_schema)):
    payload = get_current_user(token)
    print(payload)
    if payload:
        return payload
    return None

@route.get("/dashboard/{token}" ,response_class=HTMLResponse)
def dashboard(request: Request, token: dict):
    print(token)
    return templates.TemplateResponse("dashboard.html", {"request": request})
 


@route.post("/dashboard")
def dashboard(request: Request, token : dict = Depends(get_users)):
    print(token,"this is token")
    if token: 
        print("I'm in dashboard")
        payload = get_current_user(token["access"])
        print(payload,"this is payload")
        return templates.TemplateResponse("dashboard.html", {"request": request, "accesstoken" : payload})
    return  templates.TemplateResponse("login.html", {"request": request,})