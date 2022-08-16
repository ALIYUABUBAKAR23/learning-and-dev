from django.contrib import admin

from api.hr.models import Department, Contract, Location


# Register your models here.

# admin.site.register(Staff)
admin.site.register(Department)
admin.site.register(Contract)
admin.site.register(Location)