from rest_framework import permissions


class ProjectOwnerOrReadOnly(permissions.BasePermission):
    """From examples: https://www.django-rest-framework.org/api-guide/permissions/#examples"""

    def has_object_permission(self, request, view, obj):
        if obj.user.id == request.user.id:
            return True
        if request.method in permissions.SAFE_METHODS:
            return True
        return False
