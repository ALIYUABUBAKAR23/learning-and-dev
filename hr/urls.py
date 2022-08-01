from django.urls import path
from . import views

urlpatterns = [
      path("staff", views.GetStaff.as_view(), name="staff"),
      path("my_profile", views.GetProfile.as_view(), name="my_profile"),
      path("departments", views.GetDepartments.as_view(), name="departments"),   
]