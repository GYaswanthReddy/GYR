# Use the offical python image from docker
FROM python:3

# Set the working dir to app/
WORKDIR /SCMXPERT/app/producer/

# Install any required packages
RUN pip install python-dotenv confluent-kafka

# copy the remaining application code into the container
COPY . /SCMXPERT/app/producer/

EXPOSE 9999

# Specify the command to run Fastpi application at container startup
CMD [ "python", "producer.py"]