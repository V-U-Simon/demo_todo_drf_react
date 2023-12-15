from django.utils import timezone
from django.db import models

from django.conf import settings

User: str = settings.AUTH_USER_MODEL


class Project(models.Model):
    title = models.CharField(verbose_name="Название проекта", max_length=20)
    user = models.ForeignKey(
        User,
        verbose_name="Пользователь",
        related_name="projects",
        null=True,
        blank=True,
        on_delete=models.CASCADE,
    )
    created = models.DateTimeField(verbose_name="Создан", auto_now_add=True)
    updated = models.DateTimeField(verbose_name="Обновлен", auto_now=True)
    is_active = models.BooleanField(verbose_name="Активный", default=True)

    def __str__(self):
        return self.title


class Task(models.Model):
    title = models.CharField(verbose_name="Название задачи", max_length=20)
    description = models.TextField(verbose_name="Описание задачи", blank=True)
    project = models.ForeignKey(
        Project,
        verbose_name="Проект",
        related_name="tasks",
        null=True,
        blank=True,
        on_delete=models.CASCADE,
    )
    user = models.ForeignKey(
        User,
        verbose_name="Пользователь",
        related_name="tasks",
        null=True,
        blank=True,
        on_delete=models.CASCADE,
    )
    created = models.DateTimeField(verbose_name="Создан", auto_now_add=True)
    updated = models.DateTimeField(verbose_name="Обновлен", auto_now=True)
    is_active = models.BooleanField(verbose_name="Активный", default=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "task"
        verbose_name_plural = "tasks"
