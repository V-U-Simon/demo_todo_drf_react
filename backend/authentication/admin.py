from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User


class UserAdmin(BaseUserAdmin):
    # Define which fields are displayed on the user list page in the admin
    list_display = (
        "email",
        "username",
        "age",
        "phone",
        "city",
        "is_active",
        "is_staff",
    )
    list_filter = ("is_active", "is_staff", "city")

    # Fieldsets for user edit page in admin
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        ("Personal info", {"fields": ("username", "age", "phone", "city")}),
        (
            "Permissions",
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                )
            },
        ),
        ("Important dates", {"fields": ("last_login",)}),  # Removed 'created'
    )

    # Fieldsets for adding a new user
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "email",
                    "username",
                    "age",
                    "phone",
                    "city",
                    "password1",
                    "password2",
                ),
            },
        ),
    )

    search_fields = ("email", "username", "city")
    ordering = ("email",)
    filter_horizontal = ()


# Register your models here
admin.site.register(User, UserAdmin)
