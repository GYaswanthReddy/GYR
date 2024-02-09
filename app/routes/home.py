from fastapi import APIRouter,Request,Form
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles


route = APIRouter()

templates = Jinja2Templates(directory='templates')

route.mount("/static", StaticFiles(directory = "static"), name = "static")

# Route to render home html page
@route.get("/")
def home(request: Request): 
    return templates.TemplateResponse("home.html", {"request": request})

##############----------------------contact us route------------------#####################
# Route to render contact html page
@route.get("/contactus")
def contact(request:Request):
    return templates.TemplateResponse("contactus.html", {"request" : request})

@route.post("/contactus")
def contact(request:Request, name:str=Form(), email:str=Form(), msg:str=Form()):
    print(name,email,msg)
    if name and email and msg:
        return templates.TemplateResponse("contactus.html", {"request" : request, "message" : "Successfully Submitted the request"})
    return templates.TemplateResponse("contactus.html", {"request" : request})