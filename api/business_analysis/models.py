from django.db import models
from api.crm.models import Customer
from api.hr.models import Staff

from erp.models import BaseModel
from django.conf import settings


# Create your models here.
class Project(BaseModel):
    name = models.CharField(max_length=200, blank=True)
    description = models.TextField(null=False, blank=True)
    owner = models.ForeignKey(Customer, null=True, on_delete=models.SET_NULL)
    people = models.ForeignKey(Staff, null=True, on_delete=models.SET_NULL)
    actual_start_date = models.DateField(null=False, blank=True)
    expected_start_date = models.DateField(null=False, blank=True)
    actual_end_date = models.DateField(null=False, blank=True)
    expected_end_date = models.DateField(null=False, blank=True)
    estimated_cost = models.FloatField(blank=True)
    actual_cost = models.FloatField(blank=True)
    current_budget = models.FloatField(blank=True)
    income = models.FloatField(blank=True)
    starting_budget = models.FloatField(blank=True, default=0)
    project_lead = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, on_delete=models.SET_NULL)
    location = models.CharField(max_length=200, blank=True)

    class Meta:
        verbose_name = "Project"
        verbose_name_plural = "Projects"
        ordering = ['-created_at']
        permissions = []

    def __str__(self):
        return self.name

    @classmethod
    def get_project_list(cls, **kwargs):
        all_projects = Project.objects.all().values()
        return all_projects

    @classmethod
    def get_project(cls, project_id, **kwargs):
        project = None

        try:
            project = Project.objects.filter(id=project_id)
        except Exception as e:
            print(e)
        return project

    @classmethod
    def create_project(cls, **kwargs):
        project = None
        try:
            project = Project.objects.create(**kwargs)
        except Exception as e:
            print(f"Failed to create project. Error below: \n {e}")
        return project

    @classmethod
    def update_project(cls, project_id, **kwargs):
        project = None
        try:
            project = Project.objects.filter(id=project_id).update(**kwargs)
        except Exception as e:
            print(f"Failed to update project. Error below: \n {e}")
        return project

    @classmethod
    def delete_project(cls, project_id):
        project = None
        try:
            project = Project.objects.filter(id=project_id).delete()
        except Exception as e:
            print(f"Failed to delete project. Error below: \n {e}")
        return project
