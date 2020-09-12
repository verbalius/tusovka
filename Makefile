SHELL=/bin/bash

dev: application.py env/
	(\
		openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ssl-certificates/tusovka.key -out ssl-certificates/tusovka.crt; \
		python3 -m venv env; \
		source env/bin/activate; \
		pip install -r requirements.txt; \
		python application.py;
	)

guni: application.py env/
	(\
		python3 -m venv env; \
		source env/bin/activate; \
		pip install -r requirements.txt; \
		gunicorn --bind 0.0.0.0:8080 application:application --reload;
	)