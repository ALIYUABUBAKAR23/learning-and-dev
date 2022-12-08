from django.db import models
from erp.models import BaseModel

# Create your models here.
class JobApplications(BaseModel):
    first_name = models.CharField(max_length=50, blank=True)
    last_name = models.CharField(max_length=50, blank=True)
    email = models.EmailField(("email address"), unique=True)
    phone_Number = models.IntegerField(null=True, blank=True)
    address = models.CharField(max_length=50, blank=True)
    city = models.CharField(max_length=50, blank=True)
    state = models.CharField(max_length=50, blank=True)
    postal_code = models.CharField(max_length=50, blank=True)
    country = models.CharField(max_length=50, blank=True)
    resume = models.CharField(max_length=50, blank=True)
    date_available = models.DateTimeField(null=False, blank=True)
    desired_pay = models.CharField(max_length=50, blank=True)
    website_blog_portfolio = models.CharField(max_length=50, blank=True)
    linkedin_Profile_URL = models.CharField(max_length=50, blank=True)
    resume = models.FileField(upload_to='uploads/')


    class Meta:
        verbose_name = "JobApplication"
        verbose_name_plural = "job_application"

    @classmethod
    def get_job_list(cls):
        applicant_list = JobApplications.objects.all().values()
        return applicant_list
    
    @classmethod
    def create_application(cls, **kwargs):
       applicant =  None
       try:
           applicant = JobApplications.objects.create(**kwargs)
       except Exception as e:
            return applicant

    @classmethod
    def update_application(cls, applicant_id, **kwargs):
        applicant = None
        try:
            applicant = JobApplications.objects.filter(id=applicant_id).update(**kwargs)
        except Exception as e:
            return applicant
        
    @classmethod
    def delete_applicant(cls, applicant_id):
        applicant = None
        try : 
            applicant = JobApplications.objects.filter(id=applicant_id).delete()
        except Exception as e:
            return applicant