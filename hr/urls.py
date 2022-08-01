from django.urls import path
from . import views 

urlpatterns = [
      path("staff_name", views.GetStaff.as_view(), name="staff_name"),
      path("logged_in", views.LoggedInStaff.as_view(), name="staff_name"),
    
]