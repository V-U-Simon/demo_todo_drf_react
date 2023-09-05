from rest_framework.routers import DefaultRouter

from users_app.views import UserModelViewSet


router = DefaultRouter()

# Here will registered viewsets
router.register(r"users", UserModelViewSet)

urlpatterns = router.urls
