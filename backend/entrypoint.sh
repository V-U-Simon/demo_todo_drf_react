#!/bin/sh
echo "Run entrypoint.sh"
python3 manage.py makemigrations
python3 manage.py migrate

gunicorn app.wsgi:application --bind 0.0.0.0:8000
