from django.contrib import admin
from .models import Contract, Department, Location, Staff

# Register your models here.

admin.site.register(Department)
admin.site.register(Staff)
admin.site.register(Contract)
admin.site.register(Location)
