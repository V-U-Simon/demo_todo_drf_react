from django.contrib import admin
from .models import MyUserModel


@admin.register(MyUserModel)
class MyUserModelAdmin(admin.ModelAdmin):
    pass
