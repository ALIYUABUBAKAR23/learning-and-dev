from django.urls import path
from . import views

urlpatterns = [

     path("inventory", views.InventoryAPI.as_view(), name="inventory"),
     path("item", views.ItemAPI.as_view(), name="item"),
 
]