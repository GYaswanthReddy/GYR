from fastapi import FastAPI
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from routes.register import route as reg
from routes.login import route as log
from routes.shipment import route as ship
from routes.newshipment import route as newship
from routes.dashboard import route as dash
from routes.account import route as account
from routes.datastream import route as datastream
from routes.forgotPassword import route as forgot
from fastapi.middleware.cors import CORSMiddleware

# instance for fastapi 
app = FastAPI()

# To use the html folder
templates = Jinja2Templates(directory='templates')

# Mount the static folder for css, js, images
app.mount("/static", StaticFiles(directory = "static"), name = "static")

# Origins for the fastapi to accept data
origins = [
    "http://localhost",
    "http://127.0.0.1:8000"
    "http://localhost:8080",
]

#adding the middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Include the routes 
app.include_router(log)
app.include_router(reg)
app.include_router(ship)
app.include_router(newship)
app.include_router(dash)
app.include_router(account)
app.include_router(datastream)
app.include_router(forgot)
