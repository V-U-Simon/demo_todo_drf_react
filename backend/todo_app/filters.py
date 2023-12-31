from django_filters import rest_framework as filters

from .models import Project


class ProjectContainsFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr="contains")

    class Meta:
        model = Project
        fields = ["name"]
