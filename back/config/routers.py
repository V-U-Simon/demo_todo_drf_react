from rest_framework.routers import DefaultRouter
from todo_app.views import (
    ProjectModelViewSet,
    ProjectUserModelViewSet,
    ToDoModelViewSet,
)

from users_app.views import UserModelViewSet


router = DefaultRouter()

# Here will registered viewsets
router.register(r"users", UserModelViewSet)
router.register("projects", ProjectModelViewSet)
router.register("users", ProjectUserModelViewSet)
router.register("todo", ToDoModelViewSet)

urlpatterns = router.urls
