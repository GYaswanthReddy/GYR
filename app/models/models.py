from pydantic import BaseModel

#User pydantic models
class User(BaseModel):
    username : str
    email : str
    password : str
    role : str


#pydantic model for newshipment to process the data
class NewShipment(BaseModel):
    shipment_number : int
    container_number: int
    route_details : str
    goods_type : str
    device : str
    delivery_date : str
    po_number : int
    delivery_number : int
    ndc_number : int
    batch_id : int
    serial_number : int
    shipment_description : str