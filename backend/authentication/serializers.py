from rest_framework import serializers

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.settings import api_settings

from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth.models import update_last_login
from django.contrib.auth import get_user_model

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "age",
            "first_name",
            "last_name",
            "phone",
            "city",
            "is_active",
            "created",
            "updated",
        ]
        read_only_field = ["is_active", "created", "updated"]


class UserSerializerV2(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
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


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Add additional data to custom claims
    (https://django-rest-framework-simplejwt.readthedocs.io/en/latest/customizing_token_claims.html)
    """

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token["username"] = user.username  # add this data

        return token


class LoginSerializer(MyTokenObtainPairSerializer):
    """
    Add additional data to response (near to token)
    (Also using custom token serializer which add some extra data)
    """

    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)

        data["user"] = UserSerializer(self.user).data  # add this data
        data["refresh"] = str(refresh)
        data["access"] = str(refresh.access_token)

        if api_settings.UPDATE_LAST_LOGIN:
            update_last_login(None, self.user)

        return data


class RegisterSerializer(UserSerializer):
    password = serializers.CharField(
        max_length=128,
        min_length=8,
        write_only=True,
        required=True,
    )
    email = serializers.EmailField(
        required=True,
        write_only=True,
        max_length=128,
    )

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "password",
            "is_active",
            "created",
            "updated",
        ]

    def create(self, validated_data):
        """Create a new user only if already NOT EXIST with same emial (can't get the user by email)"""
        try:
            user = User.objects.get(email=validated_data["email"])
        except ObjectDoesNotExist:
            user = User.objects.create_user(**validated_data)
        return user
