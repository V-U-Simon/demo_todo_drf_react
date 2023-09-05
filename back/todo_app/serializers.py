from rest_framework.serializers import ModelSerializer
from rest_framework.relations import StringRelatedField
from rest_framework import serializers

from .models import Project, ProjectUser, ToDo


class ProjectSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"

    creator = serializers.HiddenField(default=serializers.CurrentUserDefault())


class ProjectUserSerializer(ModelSerializer):
    user = StringRelatedField()
    project = StringRelatedField()

    class Meta:
        model = ProjectUser
        fields = "__all__"


class ToDoSerializer(ModelSerializer):
    class Meta:
        model = ToDo
        fields = "__all__"

    created_by = serializers.HiddenField(default=serializers.CurrentUserDefault())
