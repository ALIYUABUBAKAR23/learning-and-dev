from django.urls import path
from . import views

urlpatterns = [
      path("customers", views.GetCustomers.as_view(), name="customers"), 
]