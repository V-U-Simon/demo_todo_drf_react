from pathlib import Path
from os import getenv

# https://docs.djangoproject.com/en/2.0/ref/settings/#databases


BASE_DIR = Path(__file__).resolve().parent.parent

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

CONN_HEALTH_CHECKS = True
ATOMIC_REQUESTS = True
CONN_MAX_AGE = 0

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    },
    # "default": {
    #     "ENGINE": "django.db.backends.postgresql",
    #     "HOST": getenv("DB_HOST", "localhost"),
    #     "NAME": getenv("DB_NAME", "postgres_db"),
    #     "USER": getenv("DB_USER", "postgres"),
    #     "PASSWORD": getenv("DB_PASSWORD", "password"),
    #     "PORT": getenv("DB_PORT", "5432"),
    # },
}


# ================================== GRAPHENE (GPAPHQL) ==========================
GRAPHENE = {
    "SCHEMA": "todo_app.schema.schema",
}
