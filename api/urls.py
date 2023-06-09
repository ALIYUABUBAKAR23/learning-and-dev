from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path("accounts/", include("api.accounting.urls")),
    path("business_analysis/", include("api.business_analysis.urls")),
    path("messages/", include("api.broadcast.urls")),
    path("tasks/", include("api.tasks.urls")),
    path("customers/", include("api.crm.urls")),
    path("resources/", include("api.resources.urls")),
    path('hr/', include('api.hr.urls')),
    path("users/", include("api.authentication.urls")),
    path("application/", include("api.application.urls")),
    path("admin/", admin.site.urls),
]
