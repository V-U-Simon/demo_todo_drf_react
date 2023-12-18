from rest_framework.serializers import ModelSerializer
from rest_framework import serializers

from .models import Project, Task
from django.contrib.auth import get_user_model

User = get_user_model()


class ProjectSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"

    user = serializers.PrimaryKeyRelatedField(
        read_only=True,
        default=serializers.CurrentUserDefault(),
    )

    def create(self, validated_data):
        user = User.objects.get(id=self.context["request"].user.id)
        validated_data["user"] = user
        return super().create(validated_data)


class TaskSerializer(ModelSerializer):
    class Meta:
        model = Task
        fields = "__all__"

    user = serializers.PrimaryKeyRelatedField(
        read_only=True,
        default=serializers.CurrentUserDefault(),
    )

    def create(self, validated_data):
        user = User.objects.get(id=self.context["request"].user.id)
        validated_data["user"] = user
        return super().create(validated_data)
