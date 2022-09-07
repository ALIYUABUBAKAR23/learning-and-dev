from django.urls import path

from .views import ProjectAPI, SingleProjectAPI

urlpatterns = [
    path("projects", ProjectAPI.as_view(), name="projects"),
    path('projects/<int:pk>/', SingleProjectAPI),
]
