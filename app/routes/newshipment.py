from fastapi import APIRouter, Header, Request,Depends,HTTPException
from fastapi.responses import JSONResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from config.config import SHIPMENT
from fastapi.security import OAuth2PasswordBearer
from routes.create_token import get_current_user
from jose import ExpiredSignatureError
from models.models import NewShipment

route = APIRouter()

templates = Jinja2Templates(directory='templates')

oauth2_schema = OAuth2PasswordBearer(tokenUrl="token")

route.mount("/static", StaticFiles(directory = "static"), name = "static")


#route to render the newshipment html page
@route.get("/newshipment")
def newshipment(request: Request):
    return templates.TemplateResponse("newshipment.html", {"request": request})

#Route for newhsipment form data and store in database
@route.post("/newshipment")
def newshipment(request: Request, newshipment: NewShipment | None = None, authorization: str = Header(...), token: str = Depends(get_current_user)):
    print(newshipment)
    print("jAuth", authorization)
    try:
        #Condition to check whether data is null or not
        if newshipment:

            #conidition to check the token has any data
            if token:

                #Checking whether shipment_number length is seven or not
                if len(str(newshipment.shipment_number)) == 7:
                    shipment_details = {
                        "email" : token["email"],
                        "shipment_number" : newshipment.shipment_number,
                        "container_number" : newshipment.container_number,
                        "route_details" : newshipment.route_details,
                        "goods_type" : newshipment.goods_type,
                        "device" : newshipment.device,
                        "delivery_date" : newshipment.delivery_date,
                        "po_number" : newshipment.po_number,
                        "delivery_number" : newshipment.delivery_number,
                        "ndc_number": newshipment.ndc_number,
                        "batch_id" : newshipment.batch_id,
                        "serial_number" : newshipment.serial_number,
                        "shipment_description" : newshipment.shipment_description
                    }
                    print(newshipment, type(shipment_details["shipment_number"]))

                    # Using find_one method to check whether the shipment already present in the database
                    if SHIPMENT.find_one({"shipment_number" : shipment_details["shipment_number"]}):
                        return JSONResponse(content={"message": "Shipment Already Exists"}, status_code=401)
                    #Storing data in database

                    SHIPMENT.insert_one(shipment_details)
                    return JSONResponse(content={"message": "Shipment Created"}, status_code=200)
                return  JSONResponse(content={"message": "Shipment number cannot exceed 7 digits"}, status_code=401)
            return  JSONResponse(content={"message": "Fileds are missings"}, status_code=401)
        #error msg if any fields are empty or not.
        return  JSONResponse(content={"message": "Please Enter the fields"}, status_code=401)
    except HTTPException as e:
        print(e)
        return JSONResponse(content={"message": str(e.detail)}, status_code=e.status_code)
    except Exception:
        
        # Handling Token decode exception
        return JSONResponse(content={"message": "UserNot found or Ivaild Credentials"}, status_code=401)