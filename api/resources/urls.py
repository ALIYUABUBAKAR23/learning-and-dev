from django.urls import path
from .views import AuditAPI, Inventory, InventoryAPI, Item, ItemAPI

urlpatterns = [
    path("inventory", InventoryAPI.as_view(), name="inventory"),
    path("item", ItemAPI.as_view(), name="item"),
    path("Audit", AuditAPI.as_view(), name="item"),
]
