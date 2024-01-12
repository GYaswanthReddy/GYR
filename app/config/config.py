import pymongo

MONGO_URI = 'mongodb://localhost:27017'

Client = pymongo.MongoClient(MONGO_URI)

DB = Client["yash"]

REGISTER_COL = DB["USERS"]

SHIPMENT = DB["SHIPMENT_DATA"]

