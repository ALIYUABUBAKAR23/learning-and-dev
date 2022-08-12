from django.urls import path

from business_analysis.views import ProjectAPI

urlpatterns = [
    path("fetch_projects", ProjectAPI.as_view(), name="fetch_projects"),
]
