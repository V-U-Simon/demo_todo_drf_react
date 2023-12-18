# 🐍 python image
FROM python:3.11-slim as python-base
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1 
ENV PYTHONFAULTHANDLER=1 
ENV PYTHONHASHSEED=random
# 📚 дополнительные библиотеки
RUN apt-get update && apt-get install -y "build-essential"
RUN apt-get install -y libpq-dev python3-dev


# 🧰 poetry image
FROM python-base as poetry
ENV POETRY_NO_INTERACTION=1 
ENV POETRY_VERSION=1.3.2
# Установка poetry через pip: /usr/local/bin/poetry
RUN pip install poetry==$POETRY_VERSION
# Конфигурация poetry
RUN poetry config virtualenvs.create false
# RUN poetry config virtualenvs.in-project true

# 📀 установка пактов
FROM poetry as poetry_installed
WORKDIR /app
COPY poetry.lock pyproject.toml ./
RUN poetry install --ansi


# 🍎 настройка приложения
FROM poetry_installed as ready

COPY . /app
WORKDIR /app
EXPOSE 8000

ENTRYPOINT ["sh", "/app/entrypoint.sh"]
