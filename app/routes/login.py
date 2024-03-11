from fastapi import APIRouter, Request,Depends
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from routes.create_token import authenticate_user,create_access_token
from fastapi.security import OAuth2PasswordBearer,OAuth2PasswordRequestForm
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
def login(request: Request, form_data : OAuth2PasswordRequestForm = Depends()):
    print(form_data.username)
    try: 

        #verifing user credentials with database
        user = authenticate_user(email = form_data.username, password = form_data.password)
        print(user)
        if 'msg' not in user:
            #Generating JWT token
            access_token = create_access_token(user_data = {"sub": user["email"]})
            
            #return the JWT token, username, email, role to store in localstorage
            return JSONResponse(content={"access_token": access_token, "username": user["username"], "email": user["email"], "role": user["role"]}, status_code=200)
        return JSONResponse(content=user, status_code=401)
    except Exception:
        #Error msg for invalid credentails
        return JSONResponse(content={"msg": "User Not Found or Invalid Credentials"}, status_code=401)
