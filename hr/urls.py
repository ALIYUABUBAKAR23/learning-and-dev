from django.urls import path
from . import views 

urlpatterns = [
      path("staff", views.GetStaff.as_view(), name="staff_name"),
      path("my_profile", views.LoggedInStaff.as_view(), name="staff_name"),
    
]