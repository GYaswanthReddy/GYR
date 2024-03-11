# Use the offical python image from docker
FROM python:3

# Set the working dir to app/
WORKDIR /SCMXPERT/app/consumer/

# Install any required packages
RUN pip install python-dotenv confluent-kafka pymongo

# copy the remaining application code into the container 
COPY . /SCMXPERT/app/consumer/

# Specify the command to run Fastpi application at container startup
CMD [ "python", "consumer.py" ]

