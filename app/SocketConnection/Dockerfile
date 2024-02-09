# Use the offical python image from docker
FROM python:3

# Set the working dir to app/
WORKDIR /SCMXPERT/app/SocketConnection/

# copy the remaining application code into the container
COPY . /SCMXPERT/app/SocketConnection/

# Specify the command to run Fastpi application at container startup
CMD [ "python", "server.py"]