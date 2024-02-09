import socket
import os
from confluent_kafka import Producer
from dotenv import load_dotenv

load_dotenv()

host = os.getenv('host')
port = int(os.getenv('port'))
    
bootstrap_server = os.getenv('bootstrap_servers')

topic = os.getenv('topic')

# Create client instance
client = socket.socket()

# Connect the client to this host and port
client.connect((host,port))
print(client)


config = {'bootstrap.servers' : bootstrap_server}

# Create kafka producer
producer = Producer(config)

while True:
    # Receving the msg and decoding it with utf-8
    message = client.recv(1024).decode('utf-8')
    if not message:
        break
    print(message)
    # Send the data that is received from server to the kafka consumer
    producer.produce(topic, key = 'kafka', value = message)
    