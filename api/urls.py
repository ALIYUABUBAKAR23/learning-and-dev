from django.urls import path, include
from business_analysis.views import ProjectAPI # new to test project model endpoints

from . import views

urlpatterns = [
    path('accounts/', include('api.accounting.urls')),
    path('', ProjectAPI.as_view()), # new to test project model endpoints
    path('messages/', include('api.broadcast.urls')),
    path('tasks/', include('api.tasks.urls')),
    path('customers/', include('api.crm.urls')),
    path('resources/', include('api.resources.urls')),
]
