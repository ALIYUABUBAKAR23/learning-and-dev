from django.urls import path, include
from api.business_analysis.views import ProjectAPI # new to test project model endpoints
from . import views

urlpatterns = [
    path('accounts/', include('api.accounting.urls')),
    path('', ProjectAPI.as_view()), # new to test project model endpoints
    path('projects/', include('api.business_analysis.urls')),
    path('messages/', include('api.broadcast.urls')),
    path('tasks/', include('api.tasks.urls')),
    path('customers/', include('api.crm.urls')),
    path('resources/', include('api.resources.urls')),
    # path('hr/', include('api.hr.urls')),
    path('users/', include('api.authentication.urls')),
]
