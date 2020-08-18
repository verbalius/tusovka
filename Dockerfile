FROM python:3-slim-buster
LABEL maintainer verbalius@ex.ua

WORKDIR /app
COPY ./requirements.txt /app/requirements.txt
COPY . /app
RUN pip install -r requirements.txt
RUN mkdir -p /var/logs/tusovka/

EXPOSE 5000

CMD ["gunicorn", "--workers", "3", "--bind", "0.0.0.0:5000", "application:application", "--access-logfile" "/var/logs/tusovka/access.log", "--error-logfile", "/var/logs/tusovka/general.log"]