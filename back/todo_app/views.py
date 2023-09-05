from rest_framework.viewsets import ModelViewSet
from .models import Project, ProjectUser, ToDo
from .serializers import ProjectUserSerializer, ProjectSerializer, ToDoSerializer


class ProjectModelViewSet(ModelViewSet):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()

    def get_object(self):
        obj = Project.objects.get(users=self.request.creator)
        return obj


class ProjectUserModelViewSet(ModelViewSet):
    serializer_class = ProjectUserSerializer
    queryset = ProjectUser.objects.all()


class ToDoModelViewSet(ModelViewSet):
    serializer_class = ToDoSerializer
    queryset = ToDo.objects.all()
