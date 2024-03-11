# Use the offical python image from docker
FROM python:3

# Set the working dir to app/
WORKDIR /SCMXPERT/app/

# copy the requuirements file to the working dir
COPY requirements.txt /SCMXPERT/app/

# Install any required packages specified in the requirements file
RUN pip install --no-cache-dir --trusted-host pypi.python.org -r requirements.txt

# copy the remaining application code into the container
COPY . /SCMXPERT/app/

# Expose the port number to 8001
EXPOSE 8001

# Specify the command to run Fastpi application at container startup
CMD [ "uvicorn", "main:app", "--reload", "--host", "0.0.0.0", "--port", "8001" ]

