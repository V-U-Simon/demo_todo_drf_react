from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.authtoken import views
from graphene_django.views import GraphQLView
from django.views.decorators.csrf import csrf_exempt

from .routers import urlpatterns as routes

from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="ToDo Application API",
        default_version="v0.9",
        description="Test description",
        contact=openapi.Contact(email="contact@snippets.local"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

# fmt: off
urlpatterns = [
    path("admin/", admin.site.urls),
    path("api-auth/", include("rest_framework.urls")),
    path("api-auth-token/", views.obtain_auth_token),
    path("api/", include(routes)),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += path("swagger<format>/", schema_view.without_ui(cache_timeout=0), name="schema-json"),
    urlpatterns += path("swagger/", schema_view.with_ui("swagger", cache_timeout=0), name="schema-swagger-ui",),
    urlpatterns += path("redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),
    urlpatterns += path("graphql", csrf_exempt(GraphQLView.as_view(graphiql=True))),
# fmt: on
