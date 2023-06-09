"""erp URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import include, path
from allauth.account.views import confirm_email
from rest_framework.authtoken.views import obtain_auth_token  # <-- Here
from django.conf.urls import url


urlpatterns = [
    path("api/", include("api.urls")),
    path("dj-rest-auth/", include("dj_rest_auth.urls")),
    path("api-token-auth/", obtain_auth_token, name="api_token_auth"),
    url(r"^rest-auth/", include("rest_auth.urls")),
    url(r"^rest-auth/registration/", include("rest_auth.registration.urls")),
    url(r"^account/", include("allauth.urls")),
    url(
        r"^accounts-rest/registration/account-confirm-email/(?P<key>.+)/$", confirm_email, name="account_confirm_email"
    ),
    path("", include("frontend.urls")),
]
