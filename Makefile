SHELL=/bin/sh

dev: application.py
	(\
		echo "creating cerificate"; \
		sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ssl-certificates/tusovka.key -out ssl-certificates/tusovka.crt; \
		echo "creating python3 env"; \
		python3 -m venv env; \
		source env/bin/activate; \
		echo "installing requirements"; \
		pip install -r requirements.txt; \
		echo "starting"; \
		python application.py; \
	)

guni: application.py
	(\
		python3 -m venv env; \
		source env/bin/activate; \
		pip install -r requirements.txt; \
		gunicorn --bind 0.0.0.0:8080 application:application --reload; \
	)