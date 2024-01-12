from fastapi import APIRouter, Header, Request,Form, Depends
from fastapi.responses import JSONResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from config.config import *
from fastapi.security import OAuth2PasswordBearer
from routes.create_token import *

route = APIRouter()

templates = Jinja2Templates(directory='templates')

oauth2_schema = OAuth2PasswordBearer(tokenUrl="token")

route.mount("/static", StaticFiles(directory = "static"), name = "static")

class NewShipment(BaseModel):
    shipment_number : str
    container_number: str
    route_details : str
    goods_type : str
    device : str
    delivery_date : str
    po_number : str
    delivery_number : str
    ndc_number : str
    batch_id : str
    serial_number : str
    shipment_description : str


@route.get("/newshipment")
def newShipment(request: Request):
    return templates.TemplateResponse("newshipment.html", {"request": request})

@route.post("/newshipment")
def newShipment(request: Request, newShipment: NewShipment | None = None, authorization: str = Header(...), token: str = Depends(get_current_user)):
    print(newShipment)
    print("jAuth", authorization)
    try:
        if newShipment:
            print(request.get("Authorization"))
            print(token)
            # user = get_current_user(token)
            if token:
                if len(newShipment.shipment_number) == 7:
                    shipment_details = {
                        "email" : token["email"],
                        "shipment_number" : newShipment.shipment_number,
                        "container_number" : newShipment.container_number,
                        "route_details" : newShipment.route_details,
                        "goods_type" : newShipment.goods_type,
                        "device" : newShipment.device,
                        "delivery_date" : newShipment.delivery_date,
                        "po_number" : newShipment.po_number,
                        "delivery_number" : newShipment.delivery_number,
                        "ndc_number": newShipment.ndc_number,
                        "batch_id" : newShipment.batch_id,
                        "serial_number" : newShipment.serial_number,
                        "shipment_description" : newShipment.shipment_description
                    }
                    print(newShipment)
                    # find_one() shipme number already exist or not
                    if SHIPMENT.find_one({"shipment_number" : shipment_details["shipment_number"]}):
                        return JSONResponse(content={"message": "Shipment Already Exists"}, status_code=401)
                    SHIPMENT.insert_one(shipment_details)
                    return JSONResponse(content={"message": "Shipment Created"}, status_code=200)
                return  JSONResponse(content={"message": "Shipment number cannot exceed 7 digits"}, status_code=401)
        return  JSONResponse(content={"message": "Please Enter the fields"}, status_code=401)
    except Exception as exception:
        # Handling Token decode exception
        return JSONResponse(content={"message": "UserNot found or Ivaild Credentials"}, status_code=401)