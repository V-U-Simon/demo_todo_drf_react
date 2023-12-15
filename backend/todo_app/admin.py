from django.contrib import admin
from todo_app.models import Task, Project


@admin.register(Project)
class ProjectModelAdmin(admin.ModelAdmin):
    pass



@admin.register(Task)
class TaskModelAdmin(admin.ModelAdmin):
    pass
