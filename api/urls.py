from django.urls import path, include

from . import views

urlpatterns = [
    path('accounts/', include('api.accounting.urls')),
]
