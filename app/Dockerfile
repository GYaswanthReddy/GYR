FROM python

WORKDIR /SCMXPERT/app/

COPY requirements.txt /SCMXPERT/app/

RUN pip install --no-cache-dir --trusted-host pypi.python.org -r requirements.txt

COPY . /SCMXPERT/app/

EXPOSE 8001

CMD [ "uvicorn", "main:app", "--reload", "--host", "0.0.0.0", "--port", "8001" ]

