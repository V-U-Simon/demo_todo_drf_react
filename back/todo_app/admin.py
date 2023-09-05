from django.contrib import admin
from todo_app.models import ToDo, Project, ProjectUser


@admin.register(Project)
class ProjectModelAdmin(admin.ModelAdmin):
    pass


@admin.register(ProjectUser)
class ProjectUserModelAdmin(admin.ModelAdmin):
    pass


@admin.register(ToDo)
class ToDoModelAdmin(admin.ModelAdmin):
    pass
