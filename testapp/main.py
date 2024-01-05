from fastapi import FastAPI, Form, Depends,Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

app = FastAPI()

templates = Jinja2Templates(directory="html")

@app.get("/")
async def read_root(request: Request):
    # Provide data to the template
    data_from_fastapi = {"message": "Hello from FastAPI!"}
    return templates.TemplateResponse("log.html", {"request": request, "data_from_fastapi": data_from_fastapi})

@app.post("/process_form")
def process_form(name: str = Form(...), email: str = Form(...)):
    # Process the form data as needed
    # For example, save the email to a database

    # Simulate a processing delay (e.g., interacting with a database)
    import time
    time.sleep(2)

    # Return a response
    return {"message": f"Form data processed successfully: Name - {name}, Email - {email}"}
