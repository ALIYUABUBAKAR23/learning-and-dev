from django.contrib import admin
from .models import User, UserResetDetails

# Register your models here.

admin.site.register(User),
admin.site.register(UserResetDetails)
