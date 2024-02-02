from fastapi import APIRouter, Request,Form
from fastapi.templating import Jinja2Templates
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.security import OAuth2PasswordBearer
from config.config import *
from routes.create_token import *
from pydantic import BaseModel


route = APIRouter()

templates = Jinja2Templates(directory='templates')

route.mount("/static", StaticFiles(directory = "static"), name = "static")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

#route to render datastream html page
@route.get("/datastream")
def datastream(request: Request):
    return templates.TemplateResponse("datastream.html", {"request":request})

class Device(BaseModel):
    device : int

@route.post('/datastream')
def datastream(request: Request, device : int = Form()  , token : str = Depends(get_current_user)):
    print(device)
    try:
        if token['role'] == 'admin':
            if device:
                # print(device_id, DEVICE_DATA.find())
                data = list(DEVICE_DATA.find({"Device_id" : device},{'_id':0}))
                print(data)
                print(type(data))
                return JSONResponse(content={'device' : data}, status_code=200)
        return JSONResponse(content={"message" : "Requires Admin Privileges"}, status_code=401)
    except Exception as e:
        print(e)
        return JSONResponse(content={"message" : "Server is busy"}, status_code=401)



##########-------Route for User Management---------##########
#route to render usermanagement html page
@route.get("/usermanagement")
def usermanage(request: Request):
    return templates.TemplateResponse("usermanagement.html", {"request" : request})


#route to handle the usermanagement details to update the user role to admin
@route.post("/usermanagement")
def user(request:Request, email:str = Form(), role : str = Form(), token:str = Depends(get_current_user)):
    try:
        user = get_user(email)
        if user:
            print(role,"role")

            #checking the role of the user whether they are admin or not
            if token["role"] == "admin":
                if user['role'] != "admin":
                    #update the user role to admin by admin
                    success = REGISTER_COL.update_one({"email" : email}, {"$set": {"role" : role}})
                    return JSONResponse(content={"message" : "success"}, status_code=200)
                return JSONResponse(content={"message" : "The user is admin"}, status_code=401)
            return JSONResponse(content={"message" : "No admin found"}, status_code=401)
        return JSONResponse(content={"message" : "User Not found"}, status_code=401)
    except Exception:
        return JSONResponse(content={"message" : "Token Not Found"}, status_code=401)
        
