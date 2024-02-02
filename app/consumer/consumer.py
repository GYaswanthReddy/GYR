from confluent_kafka import Consumer, KafkaException,KafkaError
from dotenv import load_dotenv
import os
import json
import pymongo

#Establing mongodb server
MONGO_URI = 'mongodb+srv://yaswanthg9966:iqUGvzM42gzFrIwH@cluster0.tzvgwaf.mongodb.net/'

#instance for mongodb server
Client = pymongo.MongoClient(MONGO_URI)

#Creatng db 
DB = Client["SCMXPERTLITE"]

DEVICE_DATA = DB["DEVICE_DATA"]

load_dotenv()

bootstrap_server = os.getenv('bootstrap_servers')
topic = os.getenv('topic')

conf = {
    'bootstrap.servers': os.getenv("bootstrap_servers"),
    'group.id': os.getenv("group_id"),
    'enable.auto.commit': 'false',   # Disable auto-commit of offsets
    'auto.offset.reset': 'earliest'
     
}

consumer = Consumer(conf)
consumer.subscribe([topic])

try:
    while True:
        msg = consumer.poll(1.0)

        if msg is None:
            continue
        if msg.error():
            if msg.error().code() == KafkaException._PARTITION_EOF:
                # End of partition event
                continue
            else:
                print(msg.error())
                break
        data = msg.value().decode('utf-8')
        # print(data)
        print('Received message: {}'.format(msg.value().decode('utf-8')))
        try:
            json_data = json.loads(data)
            # print('EFORE the db json_data',json_data)
            DEVICE_DATA.insert_one(json_data)
            # print('after the db',data)
            # print('after the db json_data',json_data)
        except json.JSONDecodeError as e:
            print(f"Error decoding JSON: {e}")
        
except KeyboardInterrupt:
    pass

finally:
    consumer.close()


