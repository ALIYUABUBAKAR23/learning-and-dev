from django.urls import path

from .views import BroadcastAPI

urlpatterns = [
    path("broadcasts", BroadcastAPI.as_view(), name="broadcasts")
]
