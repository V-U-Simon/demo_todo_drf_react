from rest_framework import status
from django.urls import reverse

from todo_app.models import Project


def test_get_list(api_client, test_project):
    response = api_client.get("/api/projects/")
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_get_list_by_auth(api_client, user_test, test_project):
    api_client.force_authenticate(user=user_test)
    response = api_client.get("/api/projects/")
    assert response.status_code == status.HTTP_200_OK
    assert len(response.data) == 1


def test_create_project(api_client, user_test):
    url = reverse("project-list")
    data = {
        "name": "Супер проект",
        "repository_url": "https://github.com/A1eksAwP/special",
        "is_active": False,
    }
    api_client.force_authenticate(user=user_test)
    response = api_client.post(url, data=data)

    assert response.status_code == status.HTTP_201_CREATED
    project = Project.objects.get(pk=response.data.get("id"))

    assert project.name == "Супер проект"
    assert project.repository_url == "https://github.com/A1eksAwP/special"
    assert project.is_active == False


def test_patch_project(api_client, user_test, user_test_another):
    # Создание проекта от имени первого пользователя
    project = Project.objects.create(
        name="Исходный проект",
        is_active=True,
        creator=user_test,
    )

    url = reverse("project-detail", kwargs={"pk": project.id})

    # Попытка обновления проекта от имени второго пользователя
    api_client.force_authenticate(user=user_test_another)
    updated_data = {"name": "Попытка обновления"}
    response = api_client.patch(url, data=updated_data)
    assert response.status_code == status.HTTP_403_FORBIDDEN
    updated_project = Project.objects.get(pk=project.id)
    assert updated_project.name == "Исходный проект"

    # Обновление проекта от имени первого пользователя
    api_client.force_authenticate(user=user_test)
    updated_data = {"name": "Обновленный проект"}
    response = api_client.patch(url, data=updated_data)
    assert response.status_code == status.HTTP_200_OK
    updated_project = Project.objects.get(pk=project.id)
    assert updated_project.name == "Обновленный проект"


def test_delete_project(api_client, user_test, user_test_another):
    project = Project.objects.create(
        name="Исходный проект для удаления",
        is_active=True,
        creator=user_test,
    )

    url = reverse("project-detail", kwargs={"pk": project.id})

    # Попытка удаления проекта от имени второго пользователя
    api_client.force_authenticate(user=user_test_another)
    response = api_client.delete(url)
    assert response.status_code == status.HTTP_403_FORBIDDEN
    assert Project.objects.filter(pk=project.id).exists()

    # Удаление проекта от имени первого пользователя (владельца)
    api_client.force_authenticate(user=user_test)
    response = api_client.delete(url)
    assert response.status_code == status.HTTP_204_NO_CONTENT
    assert not Project.objects.filter(pk=project.id).exists()
