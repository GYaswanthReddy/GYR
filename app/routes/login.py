from fastapi import APIRouter, Request,Form
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from config.config import *
from routes.create_token import *
from fastapi.security import OAuth2PasswordBearer
from fastapi.responses import JSONResponse

route = APIRouter()

oauth2_schema = OAuth2PasswordBearer(tokenUrl="token")

templates = Jinja2Templates(directory='templates')

route.mount("/static", StaticFiles(directory = "static"), name = "static")




# Route to render login html page
@route.get("/login")
def login(request: Request): 
    return templates.TemplateResponse("login.html", {"request": request})

#Route for login details
@route.post("/login")
async def login(request: Request, email : str = Form(), password : str = Form()):
    try: 

        #verifing user credentials with database
        user = authenticate_user(email = email, password = password)
        print(user)
        if user:

            #Generating JWT token
            access_token = create_access_token(user_data = {"sub": user["email"]})
            token = Token(access_token=access_token, token_type="bearer")

            #retur the JWT token, username, email, role to store in localstorage
            return JSONResponse(content={"access_token": access_token, "username": user["username"], "email": user["email"], "role": user["role"]}, status_code=200)
    except Exception as e:
        
        #Error msg for invalid credentails
        return JSONResponse(content={"msg": "User Not Found or Invalid Credentials"}, status_code=401)
