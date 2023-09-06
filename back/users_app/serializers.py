from rest_framework.serializers import ModelSerializer
from .models import MyUserModel


class UserModelSerializer(ModelSerializer):
    class Meta:
        model = MyUserModel
        fields = [
            "id",
            "age",
            "username",
        ]


class UserModelSerializerV2(ModelSerializer):
    class Meta:
        model = MyUserModel
        fields = [
            "age",
            "username",
            "first_name",
            "last_name",
            "email",
            "phone",
            "city",
            "is_superuser",
            "is_staff",
        ]
