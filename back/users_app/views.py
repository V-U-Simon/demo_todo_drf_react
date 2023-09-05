from rest_framework.viewsets import ModelViewSet
from .models import MyUserModel
from .serializers import UserModelSerializer


class UserModelViewSet(ModelViewSet):
    queryset = MyUserModel.objects.all()
    serializer_class = UserModelSerializer
