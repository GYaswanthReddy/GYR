import socket
import json
import random
from datetime import datetime
import time

# create socket instance
socket_conn = socket.socket()
print("socket created")

# Bind the socket to the host and port
socket_conn.bind(("", 9999))

# Limiting the user to connect to the server
socket_conn.listen(3)
print("waiting for client connections")

# Accepting the connection from the client
client, addr = socket_conn.accept()
print("Client", addr)
try:
    while True:
        # Generating the data
        data = {
                "Device_id": random.choice([1234567890,1234567891]),
                "Battery_level": round(random.uniform(4, 5), 2),
                "First_sensor_temp": round(random.uniform(20, 25), 2),
                "Route_from": f"{random.choice(['Hyderabad', 'Delhi', 'Tirupati', 'Mumbai', 'Visakhapatnam', 'Pune', 'Chennai', 'Trivandrum', 'Ahmedabad', 'Kolkata'])}, India",
                "Route_to": f"{random.choice(['Louisville', 'Los Angeles', 'Chicago', 'New York', 'North Las Vegas', 'Houston', 'Dallas', 'Austin', 'Washington', 'San Francisco', 'Philadelphia'])}, USA",
                "Timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            }
        print(data)

        # Converting the dict to JSON format and encode it with utf-8
        user_data = (json.dumps(data, indent=1)).encode("utf-8")

        # Send data to the client using the 'client' socket
        client.send(user_data)
        time.sleep(10)
except Exception as e:
    print("Exception:", e)

finally:
    # Close the server socket
    socket_conn.close()