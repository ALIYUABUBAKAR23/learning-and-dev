# Create your models here.
from django.conf import settings
from django.db import models

from erp.models import BaseModel
from api.authentication.models import User


TASK_STATUS = (
    ("Open", "open"),
    ("Pending", "pending"),
    ("Suspended", "suspended"),
    ("Postponed", "postponed"),
    ("Completed", "completed"),
    ("Incomplete", "incomplete"),
    ("Cancelled", "cancelled"),
)

TASK_PRIORITY = (
    ("High", "high"),
    ("Medium", "medium"),
    ("Low", "low"),
)


class Task(BaseModel):
    """
    Task model for user created/assigned tasks.
    It will keep track of tasks assigned, completion status and so forth.
    """

    name = models.CharField(max_length=200, null=False, blank=True)
    description = models.TextField(null=False, blank=True)
    comment = models.TextField(null=False, blank=True)
    assigned_by = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, on_delete=models.SET_NULL)
    assigned_to = models.JSONField(null=True, blank=True)
    start_date = models.DateTimeField(null=True, blank=True)
    due_date = models.DateTimeField(null=True, blank=True)
    status = models.CharField(choices=TASK_STATUS, max_length=200, null=True, blank=True)
    priority = models.CharField(choices=TASK_PRIORITY, max_length=200, null=True, blank=True)

    class Meta:
        verbose_name = "task"
        verbose_name_plural = "tasks"
        ordering = ['-created_at']
        permissions = []

    def __str__(self):
        return self.name

    @classmethod
    def get_task_list(cls, **kwargs):
        """
        This method fetches a users list of tasks using key word arguments i.e kwargs
        """
        tasks = Task.objects.filter(**kwargs).values()
        # Compute the values list "manually".
        for task in tasks:
            user = User.objects.filter(id=task["assigned_by_id"]).get()
            task["assigned_by"] = f"{user.first_name} {user.middle_name} {user.last_name}"
        return tasks

    @classmethod
    def create_task(cls, **kwargs):
        task = None
        try:
            task = Task.objects.create(**kwargs)
        except Exception as e:
            print(f"Failed to create task. Error below: \n {e}")
        return task

    @classmethod
    def update_task(cls, task_id, **kwargs):
        task = None
        try:
            task = Task.objects.filter(id=task_id).update(**kwargs)
        except Exception as e:
            print(f"Failed to create task. Error below: \n {e}")
        return task

    @classmethod
    def delete_task(cls, task_id):
        task = None
        try:
            task = Task.objects.filter(id=task_id).delete()
        except Exception as e:
            print(f"Failed to create task. Error below: \n {e}")
        return task

    @classmethod
    def delete_all_tasks(cls):
        task = None
        try:
            task = Task.objects.all().delete()
        except Exception as e:
            print(f"Failed to create task. Error below: \n {e}")
        return task

    @classmethod
    def total_count_of_tasks_assigned_to_user(cls, id):
        return Task.objects.filter(assigned_by_id=id).count()

    @classmethod
    def total_count_of_tasks_assigned_to_user_completed(cls, id):
        return Task.objects.filter(assigned_by_id=id, status="completed").count()

    @classmethod
    def total_count_of_tasks_assigned_to_user_cancelled(cls, id):
        return Task.objects.filter(assigned_by_id=id, status="cancelled").count()

    @classmethod
    def total_count_of_tasks_assigned_to_user_pending(cls, id):
        return Task.objects.filter(assigned_by_id=id, status="pending").count()

    @classmethod
    def total_count_of_tasks_assigned_to_user_Postponed(cls, id):
        return Task.objects.filter(assigned_by_id=id, status="Postponed").count()
