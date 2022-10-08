from django.urls import path

from .views import AccountAPI, LedgerAPI, TrialBalanceAPI

urlpatterns = [
    path("accounts/", AccountAPI.as_view(), name="accounts"),
    path("ledgers/", LedgerAPI.as_view(), name="ledgers"),
    path("trial_balance/", TrialBalanceAPI.as_view(), name="trial_balance"),
]
