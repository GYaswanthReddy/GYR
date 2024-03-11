from fastapi import FastAPI
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from routes.register import route as register
from routes.login import route as login
from routes.shipment import route as shipment
from routes.newshipment import route as newshipment
from routes.dashboard import route as dashboard
from routes.account import route as account
from routes.datastream import route as datastream
from routes.forgotPassword import route as forgot
from routes.home import route as home

# instance for fastapi 
app = FastAPI()

# To use the html folder
templates = Jinja2Templates(directory='templates')

# Mount the static folder for css, js, images
app.mount("/static", StaticFiles(directory = "static"), name = "static")




# Include the routes 
app.include_router(home)
app.include_router(login)
app.include_router(register)
app.include_router(shipment)
app.include_router(newshipment)
app.include_router(dashboard)
app.include_router(account)
app.include_router(datastream)
app.include_router(forgot)
