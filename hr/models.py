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

DEPARTMENTS=(
    ('Accounting','accounting'),
    ('Human Resources','human resources'),
    ('Developers','developers'),
    ('Business Analysis','business analysis'),
    ('Business Development','business development'),
)



class Staff(BaseModel):
    first_name = models.CharField(max_length=200, blank=True)
    last_name = models.CharField(max_length=200, blank=True)
    full_name = models.CharField(max_length=200, blank=True)
    sex = models.CharField(choices=SEX, max_length=10, blank=True )
    dob = models.DateField(null=False, blank=True)
    state_of_origin = models.CharField(choices=STATES, max_length=20, blank=True)
    address = models.CharField(max_length=500, blank=True)
    phone_no = models.IntegerField(blank=True)
    email = models.EmailField(max_length=200, blank=True)
    twitter = models.CharField(max_length=200, null=True, blank=True)
    tnstagram = models.CharField(max_length=200, null=True, blank=True)
    linkedIn = models.CharField(max_length=200, null=True, blank=True)
    staff_ID = models.CharField(max_length=200, blank=True)
    commencement_Date = models.DateTimeField(max_length=200,blank=True)
    salary = models.IntegerField(blank=True)
    role = models.CharField(max_length=200, blank=True)
    department = models.CharField(choices=DEPARTMENTS, max_length=200, null=True, blank=True)
    user = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)

    class Meta:
        verbose_name = ("staff")
        verbose_name_plural = ("staff")

    def __str__(self):
        return f'{self.first_name} {self.last_name}'

    @classmethod
    def get_staff_list(cls, **kwargs):
        # full_name= f'{Staff.first_name} {Staff.first_name}' 
        # all_staff1 = list(Staff.objects.all().values_list('first_name', flat=True)) 
        # all_staff2 = list(Staff.objects.all().values_list('last_name', flat=True)) 
        all_staff = Staff.objects.all().values_list('full_name', flat= True)
        # return full_name
        # return f'{all_staff1} {all_staff2}'
        return all_staff

    @classmethod 
    def logged_in(cls, **kwargs):
        logged_in_staff = Staff.objects.all().values_list('user', flat=True)
        return logged_in_staff

        