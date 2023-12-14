from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static
from django.views.decorators.csrf import csrf_exempt

from rest_framework.routers import DefaultRouter
from rest_framework import permissions
from rest_framework.authtoken import views
from graphene_django.views import GraphQLView

from users_app.views import UserModelViewSet
from todo_app.views import (
    ProjectModelViewSet,
    ProjectUserModelViewSet,
    ToDoModelViewSet,
)

from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="ToDo Application API",
        default_version="v1",
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)


router = DefaultRouter()

# Here will registered viewsets
# router.register(r"users", UserModelViewSet)
# router.register("users", UserModelViewSet)
router.register("users", ProjectUserModelViewSet)
router.register("projects", ProjectModelViewSet)
router.register("todo", ToDoModelViewSet)



# fmt: off
urlpatterns = [
    path("admin/", admin.site.urls),
    path("api-auth/", include("rest_framework.urls")), # standard drf authentication
    path("api-auth-token/", views.obtain_auth_token), # JWT token authentication
    path("api/", include(router.urls)),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += path("swagger<format>/", schema_view.without_ui(cache_timeout=0), name="schema-json"),
    urlpatterns += path("swagger/", schema_view.with_ui("swagger", cache_timeout=0), name="schema-swagger-ui",),
    urlpatterns += path("redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),
    urlpatterns += path("graphql", csrf_exempt(GraphQLView.as_view(graphiql=True))),
# fmt: on
