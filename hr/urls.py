from django.urls import path
from . import views

urlpatterns = [
      path("staff", views.StaffAPI.as_view(), name="staff"),
      path("profile", views.ProfileAPI.as_view(), name="my_profile"),
      path("departments", views.DepartmentAPI.as_view(), name="departments"),   
]