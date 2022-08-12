from django.urls import path
from . import views

urlpatterns = [

      path("staff", views.GetStaff.as_view(), name="staff"),
      path("my_profile", views.ProfileAPI.as_view(), name="my_profile"),
      path("departments", views.DepartmentAPI.as_view(), name="departments"),   
      path("contracts", views.ContractAPI.as_view(), name="contracts"),
      path("locations", views.LocationAPI.as_view(), name="locations"), 
]