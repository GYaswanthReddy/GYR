from fastapi import APIRouter, Request,Header,Depends
from fastapi.templating import Jinja2Templates
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from routes.create_token import *
from config.config import *
from fastapi.security import OAuth2PasswordBearer
import copy

route = APIRouter()
oauth2_schema = OAuth2PasswordBearer(tokenUrl="token")

templates = Jinja2Templates(directory='templates')

route.mount("/static", StaticFiles(directory = "static"), name = "static")

#route for shipment details
@route.get("/shipmentdata")
def shipment(request: Request, current_user :str = Depends(get_current_user)):
    try:
        #condition to check current_user has any value
        if current_user:
            print("token in shipment", current_user)
            # user  = get_current_user(token)
            # print("user", user)
            #Filtering the shipment data using email to display the shipment data
            shipment_data = list(SHIPMENT.find({"email" : current_user["email"]}, {"_id":0, "email" : 0}))
            return JSONResponse(content=(shipment_data), status_code=200)
        return JSONResponse(content={"message" : "Token is None"}, status_code=401)
    except Exception as e:
        return JSONResponse(content={"message" : "Token was not found"}, status_code=401)

#route to render the shipment html page
@route.get("/shipment")
def shipment(request : Request):
    return templates.TemplateResponse("shipment.html", {"request" : request})