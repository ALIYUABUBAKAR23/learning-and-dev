from django.db import models

class BaseModel(models.Model):
    id = models.IntegerField(db_index=True, primary_key=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True
