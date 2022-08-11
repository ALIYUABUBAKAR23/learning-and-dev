from django.contrib import admin
from resources.models import Inventory
from resources.models import Item

# Register your models here.

admin.site.register(Inventory)
admin.site.register(Item)
