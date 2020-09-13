SHELL=/bin/bash

dev: application.py
	(\
		echo "creating python3 env" && \
		python3 -m venv env && \
		source ./env/bin/activate && \
		echo "installing requirements" && \
		pip install -r requirements.txt && \
		echo "starting" && \
		python application.py \
	)

guni: application.py
	(\
		python3 -m venv env && \
		source env/bin/activate && \
		pip install -r requirements.txt && \
		gunicorn --bind 0.0.0.0:8080 application:application --reload \
	)