from fastapi import APIRouter, Request,Form
from fastapi.responses import JSONResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from passlib.context import CryptContext
from config.config import REGISTER_COL
from models.models import User

route = APIRouter()

login = 'login.html'

pwd_encode = CryptContext(schemes=["bcrypt"], deprecated = "auto")

templates = Jinja2Templates(directory='templates')

route.mount("/static", StaticFiles(directory = "static"), name = "static")


#route for rending the login html page
@route.get("/register")
def register(request: Request): 
    return templates.TemplateResponse(login, {"request": request})

#route for register details
@route.post("/register")
def register(request: Request, username: str=Form(), email: str=Form(), new_password: str=Form(),  confirm_password: str=Form()):
    try:
        print(username,email,new_password,confirm_password)
        #condition for username has any value
        user_db = REGISTER_COL.find_one({'email' : email},{'_id':0})
        if not user_db:
            if username:
                if confirm_password == new_password:
                    #checking whether the password has upper char, special symbol, length equal or greater than 7
                    if len(new_password) >= 7 and any(char.isupper() for char in new_password) and any(not char.isupper() for char in new_password):

                        #Hashing the user password using passlib bcrypt to store in database
                        hash_password = pwd_encode.hash(new_password)
                        user_data = User(username = username, email = email, password = hash_password, role = "user")
                        #storing user credentials in database
                        REGISTER_COL.insert_one(dict(user_data)) 
                        return JSONResponse(content={ "success_msg": "Succesfully Registered! Please Login"}, status_code=200)
                    return JSONResponse(content={ "msg": "Password must contain atleast one upper & special symbol & length equal or greater than 7"}, status_code=401)
                return JSONResponse(content={ "msg": "New Password and confirm password must be same"}, status_code=401)
            return JSONResponse(content={ "msg": "Username not found"}, status_code=401)
        return JSONResponse(content={ "msg": "Email already exists"}, status_code=401)
    except Exception:
        return {"msg" : "Server busy at the moment! Please try again"}