import pytest
from rest_framework.test import APIClient, force_authenticate
from django.contrib.auth import get_user_model

from users_app.models import MyUserModel as User
from todo_app.models import Project, ToDo

User = get_user_model()


# # Аутентификация пользователей
# force_authenticate(auth_client, user=user1)
# force_authenticate(another_auth_client, user=user2)


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def api_client_another():
    return APIClient()


# Для работы с моделями
@pytest.fixture
def user_admin(db: None):
    return User.objects.create_superuser(
        username="AdminUser", password="test", email="admin@mail.ru"
    )


@pytest.fixture
def user_test(db: None):
    return User.objects.create_user(
        username="TestUser1", password="test", email="one@mail.ru"
    )


@pytest.fixture
def user_test_another(db: None):
    return User.objects.create_user(
        username="TestUser2", password="password2", email="two@mail.ru"
    )


# МОДЕЛЬ
@pytest.fixture
def test_project(db: None):
    return Project.objects.create(name="Новый пустой проект")
