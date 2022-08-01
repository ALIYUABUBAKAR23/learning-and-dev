from email.headerregistry import Address
from django.db import models
from django.contrib.auth.models import User

from erp.models import BaseModel


# Create your models here.

STATES = (
    ('Abia','abia'),
    ('Adamawa','adamawa'),
    ('Akwa Ibom','akwa Ibom'),
    ('Anambra','anambra'),
    ('Bauchi','bauchi'),
    ('Bayelsa','bayelsa'),
    ('Benue','benue'),
    ('Borno','borno'),
    ('Cross River','cross river'),
    ('Delta','delta'),
    ('Ebonyi','ebonyi'),
    ('Edo','edo'),
    ('Ekiti','ekiti'),
    ('Enugu','enugu'),
    ('Gombe','gombe'),
    ('Imo','imo'),
    ('Jigawa','jigawa'),
    ('Kaduna','kaduna'),
    ('Kano','kano'),
    ('Katsina','katsina'),
    ('Kebbi','kebbi'),
    ('Kogi','kogi'),
    ('Kwara','kwara'),
    ('Lagos','lagos'),
    ('Nasarawa','nasarawa'),
    ('Niger','niger'),
    ('Ogun','ogun'),
    ('Ondo','ondo'),
    ('Osun','osun'),
    ('Oyo','oyo'),
    ('Plateau','plateau'),
    ('Rivers','rivers'),
    ('Sokoto','sokoto'),
    ('Taraba','taraba'),
    ('Yobe','yobe'),
    ('Zamfara','zamfara'),
)

SEX=(
    ('Male','male'),
    ('Female','female'),
)

# DEPARTMENTS=(
#     ('Accounting','accounting'),
#     ('Human Resources','human resources'),
#     ('Developers','developers'),
#     ('Business Analysis','business analysis'),
#     ('Business Development','business development'),
# )

class Department(models.Model):
    name= models.CharField(max_length=200, blank=True, null=True)
    description= models.CharField(max_length=500, blank=True, null=True)
    head_of_department= models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)

    class Meta:
        verbose_name =("Department")
        verbose_name_plural =("Departments")

    def __str__(self):
        return self.name

    @classmethod
    def get_deptartments(cls, **kwargs):
        dept = Department.objects.all().values('name')
        return dept

class Staff(BaseModel):
    first_name = models.CharField(max_length=200, blank=True)
    last_name = models.CharField(max_length=200, blank=True)
    full_name = models.CharField(max_length=200, blank=True)
    sex = models.CharField(choices=SEX, max_length=10, blank=True )
    dob = models.DateField(null=False, blank=True)
    state_of_origin = models.CharField(choices=STATES, max_length=20, blank=True)
    address = models.CharField(max_length=500, blank=True)
    phone_no = models.CharField(max_length=14, blank=True)
    email = models.EmailField(max_length=200, blank=True)
    twitter = models.CharField(max_length=200, null=True, blank=True)
    tnstagram = models.CharField(max_length=200, null=True, blank=True)
    linkedIn = models.CharField(max_length=200, null=True, blank=True)
    staff_id = models.CharField(max_length=200, blank=True)
    commencement_date = models.DateTimeField(max_length=200,blank=True)
    salary = models.IntegerField(blank=True)
    role = models.CharField(max_length=200, blank=True)
    department = models.ForeignKey(Department, null=True, on_delete=models.SET_NULL)
    # department = models.CharField(choices=DEPARTMENTS, max_length=20, blank=True )
    user = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)

    class Meta:
        verbose_name = ("staff")
        verbose_name_plural = ("staff")

    def __str__(self):
        return f'{self.first_name} {self.last_name}'

    # @classmethod
    # def full_name(self):
    #     return f" {self.first_name} {self.last_name} "

    @classmethod
    def get_staff_list(cls, **kwargs):
        all_staff = Staff.objects.all().values('first_name','last_name')
        return all_staff

    @classmethod 
    def get_user_profile(cls, **kwargs):
        user_profile = Staff.objects.filter(**kwargs).values()
        return user_profile

