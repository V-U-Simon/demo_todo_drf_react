from rest_framework.routers import DefaultRouter

from users_app.views import UserModelViewSet
from todo_app.views import (
    ProjectModelViewSet,
    ProjectUserModelViewSet,
    ToDoModelViewSet,
)


router = DefaultRouter()

# Here will registered viewsets
# router.register(r"users", UserModelViewSet)
# router.register("users", UserModelViewSet)
router.register("users", ProjectUserModelViewSet)
router.register("projects", ProjectModelViewSet)
router.register("todo", ToDoModelViewSet)

urlpatterns = router.urls
