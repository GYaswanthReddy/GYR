FROM python

WORKDIR /SCMXPERT/app/producer/

RUN pip install python-dotenv confluent-kafka

COPY . /SCMXPERT/app/producer/

CMD [ "python", "producer.py"]