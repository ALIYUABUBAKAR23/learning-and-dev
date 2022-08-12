from django.urls import path, include

from . import views

urlpatterns = [
    path('accounts/', include('api.accounting.urls')),
    path('tasks/', include('api.tasks.urls')),
]
