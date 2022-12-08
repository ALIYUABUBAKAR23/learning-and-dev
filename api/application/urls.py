from django.urls import path
from .views import ApplicantAPI
urlpatterns = [
    path("application", ApplicantAPI.as_view(), name="application"),
    
]