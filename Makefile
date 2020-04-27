SHELL=/bin/bash

dev: application.py env/
	(\
		source env/bin/activate; \
		pip install -r requirements.txt; \
		python application.py; \
	)

guni: application.py env/
	(\
		source env/bin/activate; \
		pip install -r requirements.txt; \
		gunicorn --bind 0.0.0.0:8080 application:application --reload; \
	)