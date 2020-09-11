# Web app for listening to my radio

## Production on Google Cloud VM

See docker-compose.yaml

 80,443 [NGINX] <-> [gunicorn container | python app]
 8000 [Icecast server]

## Staging Heroku

![Staging-CI](https://github.com/verbalius/tusovka-flask-webapp/workflows/Staging-CI/badge.svg)

https://radio-tusovka.herokuapp.com

## Old

### AWS

![architecture](/illustrations/architecture.png)

### Home

![homesetup](/illustrations/homesetup.png)

## Development

### Local Docker

`# docker-compose up`

### Local

1. Create a python 3 environment

`$ python3 -m venv env`

2. Run makefile development to quickly start development server

`$ make dev`

or start a gunicorn server on port 8080 to test

`$ make guni`

3. Have fun :) 
