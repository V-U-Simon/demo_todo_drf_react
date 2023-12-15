from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static
from django.views.decorators.csrf import csrf_exempt

from rest_framework.routers import DefaultRouter
from rest_framework import permissions
from rest_framework.authtoken import views
from graphene_django.views import GraphQLView


from todo_app.views import (
    ProjectModelViewSet,
    TaskModelViewSet,
)

from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="Todo Application API",
        default_version="v1",
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)


router = DefaultRouter()

from authentication.views import (
    RegistrationViewSet,
    RefreshViewSet,
    LoginViewSet,
    UserViewSet,
)

# MODELS
router.register(r"users", UserViewSet)
router.register("projects", ProjectModelViewSet)
router.register("tasks", TaskModelViewSet)


# AUTHENTICATION (JWT token)
router.register(r"auth/login", LoginViewSet, basename="auth-login")
router.register(r"auth/register", RegistrationViewSet, basename="auth-register")
router.register(r"auth/refresh", RefreshViewSet, basename="auth-refresh")


# fmt: off
urlpatterns = [
    path("admin/", admin.site.urls),
    path("api-auth/", include("rest_framework.urls")), # standard drf authentication
    path("api/", include(router.urls)),
]


# ================================== SWAGGER =====================================
urlpatterns += path("swagger<format>/", schema_view.without_ui(cache_timeout=0), name="schema-json"),
urlpatterns += path("swagger/", schema_view.with_ui("swagger", cache_timeout=0), name="schema-swagger-ui",),
urlpatterns += path("redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),

# ================================== GRAPHENE (GPAPHQL) ==========================
urlpatterns += path("graphql/", csrf_exempt(GraphQLView.as_view(graphiql=True))),


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
# fmt: on
