# from rest_framework.pagination import LimitOffsetPagination
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.viewsets import GenericViewSet

from .models import MyUserModel
from .serializers import UserModelSerializer, UserModelSerializerV2


# class UserLimitOffsetPagination(LimitOffsetPagination):
#     default_limit = 20


class UserModelViewSet(
    ListModelMixin, RetrieveModelMixin, UpdateModelMixin, GenericViewSet
):
    queryset = MyUserModel.objects.all()

    serializer_class = UserModelSerializer
    # pagination_class = UserLimitOffsetPagination
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    vers = {"2.0": UserModelSerializerV2}

    def get_serializer_class(self):
        return self.vers.get(self.request.version, UserModelSerializer)


# ❯ curl \
#   -H "Accept: application/json; version=1.0" \
#   -H 'Authorization: Token 5c06bd0e8af4ddf0a67c89ef6dac8e99486a7c08' \
#   http://localhost:8000/api/users/
#
# или
#
# ❯ curl \
#   -H 'Authorization: Token 5c06bd0e8af4ddf0a67c89ef6dac8e99486a7c08' \
#   http://localhost:8000/api/users/
# [
#     {"id": 1, "age": 18, "username": "admin"},
#     {"id": 2, "age": 18, "username": "user"},
# ]


# ❯ curl \
#   -H "Accept: application/json; version=2.0" \
#   -H 'Authorization: Token 5c06bd0e8af4ddf0a67c89ef6dac8e99486a7c08' \
#   http://localhost:8000/api/users/
# [
#     {
#         "age": 18,
#         "username": "admin",
#         "first_name": "",
#         "last_name": "",
#         "email": "a@a.ru",
#         "phone": "",
#         "city": "",
#         "is_superuser": true,
#         "is_staff": true,
#     },
#     {
#         "age": 18,
#         "username": "user",
#         "first_name": "",
#         "last_name": "",
#         "email": "asdf@asdf.ri",
#         "phone": "",
#         "city": "",
#         "is_superuser": false,
#         "is_staff": false,
#     },
# ]
