development: application.py env/
    bash -c "source ./env/bin/activate; python application.py"

prod:
    gunicorn --bind 0.0.0.0:8080 application:application --reload