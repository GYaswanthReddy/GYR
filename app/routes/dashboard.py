from fastapi import APIRouter, Request,Form, Depends
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from config.config import *
from fastapi.responses import RedirectResponse,HTMLResponse
from routes.create_token import *
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer

route = APIRouter()

oauth2_schema = OAuth2PasswordBearer(tokenUrl="token")

templates = Jinja2Templates(directory='templates')

route.mount("/static", StaticFiles(directory = "static"), name = "static")

@route.get("/dashboard")
def dashboard(request: Request):
    return templates.TemplateResponse("dashboard.html", {"request": request})
