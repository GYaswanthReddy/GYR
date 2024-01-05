from fastapi import APIRouter, Request,Form
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from routes.create_token import *
from config.config import *

route = APIRouter()

templates = Jinja2Templates(directory='templates')

route.mount("/static", StaticFiles(directory = "static"), name = "static")

@route.get("/shipment")
def shipment(request: Request):
    shipment_data = SHIPMENT.find({},{'_id':0})
    return templates.TemplateResponse("shipment.html", { "request": request, "shipment": shipment_data} )


@route.post("/shipment")
def shipment(request : Request, token: dict):
    payload = get_current_user(token["access"])
    return templates.TemplateResponse("shipment.html", { "request": request, "access" : token} )
