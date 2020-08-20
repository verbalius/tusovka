# Web app for listening to my radio

## Staging Heroku

![Staging-CI](https://github.com/verbalius/tusovka-flask-webapp/workflows/Staging-CI/badge.svg)

https://radio-tusovka.herokuapp.com

## Production stable:

![CD-to-Home-Server](https://github.com/verbalius/tusovka-flask-webapp/workflows/CD-to-Home-Server/badge.svg)

http://tusovka.ml

Currently can't make port 80 or 443 work because of ISP probably..

> GCP host micro vm expect slow connection

### AWS

![architecture](/architecture.png)

### Home

![homesetup](/homesetup.png)

## Development

1. Create a python 3 environment

`$ python3 -m venv env `

2. Run makefile development to quickly start development server

`$ make dev `

or start a gunicorn server on port 8080 to test

`$ make guni `

3. Have fun :) 
