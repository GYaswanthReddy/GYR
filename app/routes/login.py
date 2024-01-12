from fastapi import APIRouter, Request,Form, Depends, HTTPException
from fastapi.responses import RedirectResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from config.config import *
from routes.create_token import *
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from fastapi.responses import JSONResponse

route = APIRouter()

oauth2_schema = OAuth2PasswordBearer(tokenUrl="token")

templates = Jinja2Templates(directory='templates')

route.mount("/static", StaticFiles(directory = "static"), name = "static")


# Default Admin Credentails
def default_admin():
    if REGISTER_COL.find({"role" : "admin"}):
        return False
    Admin ={
        "username" : "Admin",
        "email" : "Admin@gmail.com",
        "password" : pwd_encode.hash("123456"),
        "role" : "admin"
    }
    REGISTER_COL.insert_one(Admin)
    return True

@route.get("/login")
def login(request: Request): 
    return templates.TemplateResponse("login.html", {"request": request})


@route.post("/login")
async def login(request: Request, email : str = Form(), password : str = Form()):
    try: 
        user = authenticate_user(email = email, password = password)
        print(user)
        if user:
            access_token = create_access_token(user_data = {"sub": user["email"]})
            token = Token(access_token=access_token, token_type="bearer")
            return JSONResponse(content={"access_token": access_token, "username": user["username"], "email": user["email"], "role": user["role"]}, status_code=200)
    except Exception as e:
        return JSONResponse(content={"message": "User Not Found or Invalid Credentials"}, status_code=401)
