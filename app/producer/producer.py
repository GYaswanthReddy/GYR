import socket
import os
from confluent_kafka import Producer
from dotenv import load_dotenv

load_dotenv()

host = os.getenv('host')
port = int(os.getenv('port'))
    
bootstrap_server = os.getenv('bootstrap_servers')

topic = os.getenv('topic')

client = socket.socket()

client.connect((host,port))
print(client)

config = {'bootstrap.servers' : bootstrap_server}

producer = Producer(config)

while True:
    message = client.recv(1024).decode('utf-8')
    if not message:
        break
    print(message)
    producer.produce(topic, key = 'kafka', value = message)
    