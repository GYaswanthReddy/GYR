FROM python

WORKDIR /SCMXPERT/app/consumer/

RUN pip install python-dotenv confluent-kafka pymongo

COPY . /SCMXPERT/app/consumer/

CMD [ "python", "consumer.py" ]

