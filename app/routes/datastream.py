from fastapi import APIRouter, Request,Form,Header
from fastapi.templating import Jinja2Templates
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.security import OAuth2PasswordBearer
import pymongo
from config.config import *
from routes.create_token import *

route = APIRouter()

templates = Jinja2Templates(directory='templates')

route.mount("/static", StaticFiles(directory = "static"), name = "static")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@route.get("/datastream")
def datastream(request: Request):
    return templates.TemplateResponse("datastream.html", {"request":request})





##########-------Route for User Management---------##########
@route.get("/usermanagement")
def usermanage(request: Request):
    return templates.TemplateResponse("usermanagement.html", {"request" : request})

@route.post("/usermanagement")
def user(request:Request, email:str = Form(), role : str = Form(), token:str = Depends(get_current_user)):
    try:
        if email:
            print(role,"role")
            if token["role"] == "admin":
                success = REGISTER_COL.update_one({"email" : email}, {"$set": {"role" : role}})
                return JSONResponse(content={"message" : "success"}, status_code=200)
            return JSONResponse(content={"message" : "No admin found"}, status_code=401)
        return JSONResponse(content={"message" : "User Not found"}, status_code=401)
    except Exception as e:
        return JSONResponse(content={"message" : "Token Not Found"}, status_code=401)
        
