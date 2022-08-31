from django.urls import path

from .views import UsersAPI

urlpatterns = [
      path("", UsersAPI.as_view(), name="users"),
]