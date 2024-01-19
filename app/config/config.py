import pymongo

#Establing mongodb server
MONGO_URI = 'mongodb://localhost:27017'

#instance for mongodb server
Client = pymongo.MongoClient(MONGO_URI)

#Creatng db 
DB = Client["SCMXPERTLITE"]

#Creating users collection to store the user credentials
REGISTER_COL = DB["USERS"]

#Creating shipment collection to store the shipment data
SHIPMENT = DB["SHIPMENT_DATA"]

DEVICE_DATA = DB["DEVICE_DATA"]



