from django.urls import path

from .views import ProjectAPI

urlpatterns = [
    path("projects", ProjectAPI.as_view(), name="projects"),
]
