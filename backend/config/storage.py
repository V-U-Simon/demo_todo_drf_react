from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent.parent

MESSAGE_STORAGE = "django.contrib.messages.storage.session.SessionStorage"

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/
STATIC_URL = "/static/"  # 🔗 url путь к статике для debag
STATIC_ROOT = "static"  # 📁 папка для раздачи статики (project/staticfiles)
# STATICFILES_DIRS = (join(BASE_DIR, "staticfiles"),) # 🔍 пути поиска статики (для сбора)

MEDIA_URL = "/media/"  # 🔗 url путь к медиа для debag
MEDIA_ROOT = "medial"  # 📁 папка для раздачи медиа (project/medialfiles)
