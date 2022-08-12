from django.urls import path, include
from business_analysis.views import ProjectAPI # new to test project model endpoints

from . import views

urlpatterns = [
    path('accounts/', include('api.accounting.urls')),
    path('', ProjectAPI.as_view()), # new to test project model endpoints
]
