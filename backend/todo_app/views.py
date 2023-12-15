from rest_framework.viewsets import ModelViewSet

# from rest_framework.pagination import LimitOffsetPagination
from rest_framework.mixins import *
from rest_framework.permissions import IsAuthenticated

from .models import Project, Task
from .filters import ProjectContainsFilter
from .serializers import ProjectSerializer, TaskSerializer
from .permissions import ProjectOwnerOrReadOnly


# class ProjectLimitOffsetPagination(LimitOffsetPagination):
#     default_limit = 10


# class TaskLimitOffsetPagination(LimitOffsetPagination):
#     default_limit = 20


class ProjectModelViewSet(ModelViewSet):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()
    # pagination_class = ProjectLimitOffsetPagination
    filterset_class = ProjectContainsFilter
    # поскольку права проверяются в последовательно: has_permission, затем has_object_permission, добавляем IsAuthenticated
    permission_classes = [IsAuthenticated, ProjectOwnerOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            return Project.objects.filter(user=user.id)
        else:
            # return Project.objects.none()
            return Project.objects.all()

class TaskModelViewSet(ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()
    # pagination_class = TaskLimitOffsetPagination
    filterset_fields = ["project",]

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            return Task.objects.filter(user=user.id)
        else:
            return Task.objects.none()
            # return Task.objects.all()
