FROM python

WORKDIR /SCMXPERT/app/producer/

RUN pip install python-dotenv confluent-kafka

COPY . /SCMXPERT/app/producer/

EXPOSE 9999

CMD [ "python", "producer.py"]