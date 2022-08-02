from django.urls import path
import frontend.views as views

# All urls will point to same HTML template because it is SPA application
urlpatterns = [
    path('', views.index, name='index'),
]
