from fastapi import APIRouter, Request,Form
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
import pymongo
from config.config import *

route = APIRouter()

templates = Jinja2Templates(directory='templates')

route.mount("/static", StaticFiles(directory = "static"), name = "static")

@route.get("/datastream")
def datastream(request: Request):
    return templates.TemplateResponse("datastream.html", {"request":request})