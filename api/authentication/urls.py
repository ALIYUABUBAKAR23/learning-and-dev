from django.urls import path

from .views import UsersAPI, ProfileUpdateAPI

urlpatterns = [
    path("", UsersAPI.as_view(), name="users"),
    path("", ProfileUpdateAPI.as_view(), name="profile"),
    
]
