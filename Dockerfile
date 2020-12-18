FROM python:3-slim-buster
LABEL maintainer verbalius@ex.ua

WORKDIR /app
COPY ./requirements.txt ./requirements.txt
RUN pip install -r requirements.txt
COPY . ./
RUN mkdir -p /var/logs/tusovka/

EXPOSE 5000
CMD ["/usr/local/bin/gunicorn", "--workers", "3", "--reload", "--bind", "0.0.0.0:5000", "application:application", "--access-logfile", "/var/logs/tusovka/access.log", "--error-logfile", "/var/logs/tusovka/general.log"]