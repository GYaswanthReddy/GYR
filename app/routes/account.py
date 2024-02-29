from fastapi import APIRouter, Request, Depends, Form,HTTPException
from fastapi.responses import JSONResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from config.config import REGISTER_COL
from routes.create_token import get_current_user
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer

route = APIRouter()

pwd_encode = CryptContext(schemes=["bcrypt"], deprecated = "auto")

oauth2_schema = OAuth2PasswordBearer(tokenUrl="token")

templates = Jinja2Templates(directory="templates")

route.mount("/static", StaticFiles(directory="static"), name = "static")


#route to render the account html page
@route.get("/account")
def account(request : Request):
    return templates.TemplateResponse("account.html", {"request":request})




#########################--------Update Password-----------########################
@route.post('/updatepassword')
def update(request: Request, current_user : str = Depends(get_current_user), oldpassword : str =Form(), newpassword : str = Form(), confirmpassword : str =Form()):
    print(oldpassword,newpassword,confirmpassword)
    try:
        print(current_user)
        # Check the current user has any data
        if current_user:
            # Whether the passwords are matching or not
            if newpassword == confirmpassword:
                # update the password and store in db
                REGISTER_COL.update_one({'email' : current_user['email']}, {'$set' : {'password' : pwd_encode.hash(newpassword)}})
                return JSONResponse(content={'message' : 'Successfully changed the password'}, status_code=200)
            return JSONResponse(content={'message' : 'New password and Confirm password are not matching'}, status_code=400)
        return JSONResponse(content={'message' : 'No User Found'}, status_code=400)
    except HTTPException as e:
        return JSONResponse(content={"message": str(e.detail)}, status_code=e.status_code)
    except Exception:
        return JSONResponse(content={'message' : 'Please Try again later!'}, status_code=400)