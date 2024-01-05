from fastapi import APIRouter, Request,Form
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from config.config import *

route = APIRouter()

templates = Jinja2Templates(directory='templates')

route.mount("/static", StaticFiles(directory = "static"), name = "static")

@route.get("/newshipment")
def newShipment(request: Request):
    return templates.TemplateResponse("newshipment.html", {"request": request})

@route.post("/newshipment")
def newShipment(request: Request, shipment_number: str = Form(), container_number: str = Form(), route_details: str = Form(), goods_type: str = Form(), device: str = Form(), delivery_date: str = Form(), po_number: str = Form(), delivery_number: str = Form(), ndc_number: str = Form(), batch_id: str = Form(), serial_number: str = Form(), shipment_description: str = Form()):
    shipment_details = {
        "shipment_number" : shipment_number,
        "container_number" : container_number,
        "route_details" : route_details,
        "goods_type" : goods_type,
        "device" : device,
        "delivery_date" : delivery_date,
        "po_number" :po_number,
        "delivery_number" : delivery_number,
        "ndc_number": ndc_number,
        "batch_id" : batch_id,
        "serial_number" : serial_number,
        "shipment_description" : shipment_description
    }
    SHIPMENT.insert_one(shipment_details)
    return templates.TemplateResponse("newshipment.html", {"request" : request})