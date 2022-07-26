from django.db import models
from django.urls import reverse
from django.contrib.auth.models import User

from erp.models import BaseModel


TASK_STATUS = (
    ('Open', 'open'),
    ('Pending', 'pending'),
    ('Suspended', 'suspended'),
    ('Postponed', 'postponed'),
    ('Completed', 'completed'),
    ('Incomplete', 'incomplete'),
    ('Cancelled', 'cancelled'),
)


class Task(BaseModel):
    """
    Task model for user created/assigned tasks.
    It will keep track of tasks assigned, completion status and so forth.
    """
    name = models.CharField(max_length=200, null=False, blank=True)
    description = models.TextField(null=False, blank=True)
    comment = models.TextField(null=False, blank=True)
    assigned_by = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
    assigned_to = models.JSONField(null=True, blank=True)
    start_date = models.DateTimeField(null=True, blank=True)
    due_date = models.DateTimeField(null=True, blank=True)
    status = models.CharField(choices=TASK_STATUS, max_length=200, null=True, blank=True)
    
    class Meta:
        verbose_name = ("task")
        verbose_name_plural = ("tasks")

    def __str__(self):
        return self.name
