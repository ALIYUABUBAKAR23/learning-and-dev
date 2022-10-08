from django.urls import path, re_path
import frontend.views as views

# All urls will point to same HTML template because it is SPA application
urlpatterns = [
    re_path(r"^(?:.*/)?$", views.index, name="home"),
    path("", views.index, name="home"),
]
