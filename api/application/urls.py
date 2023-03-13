from django.urls import path
from .views import ApplicantAPI
urlpatterns = [
    path("", ApplicantAPI.as_view(), name="applications"),
    
]