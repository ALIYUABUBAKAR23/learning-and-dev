from email.headerregistry import Address
from django.conf import settings

from django.db import models

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
    head_of_department= models.ForeignKey(settings.AUTH_USER_MODEL, related_name='head_of_department', on_delete=models.SET_NULL, null=True, blank=True)

    class Meta:
        verbose_name =("Department")
        verbose_name_plural =("Departments")

    def __str__(self):
        return self.name

    @classmethod
    def get_departments(cls, **kwargs):
        dept = Department.objects.all().values('name')
        return dept
    
    @classmethod
    def create_department(cls, **kwargs):
        department = None
        try:             
            department = Department.objects.create(**kwargs)
        except Exception as e:
            print(e)
        return department
    
    @classmethod
    def update_department(cls, department_id, **kwargs):
        department = None
        try:
            department= Department.objects.filter(id = department_id).update(**kwargs)
        except Exception as e:
            print(e)
        return department
    
    @classmethod
    def delete_department(cls, department_id):
        department = None
        try:
            department = Department.objects.filter(id=department_id).delete()
        except Exception as e:
            print(f"Failed to create department. Error below: \n {e}")
        return department

    @classmethod
    def delete_all_departments(cls):
        department = None
        try:
            department = Department.objects.all().delete()
        except Exception as e:
            print(f"Failed to create department. Error below: \n {e}")
        return department
            
    

    @classmethod
    def create_department(cls, **kwargs):
        department = None
        try:
            department = Department.objects.create(**kwargs)
        except Exception as e:
            print(f"Failed to create department. Error below: \n {e}")
        return department

    @classmethod
    def update_department(cls,department_id,**department_data):
        department = None
        try:
            department = Department.objects.filter(id=department_id).update(**department_data)
        except Exception as e:
            print(f"Failed to update department. Error below: \n {e}")
        return department

    @classmethod
    def delete_all_department(cls):
        department = None
        try:
            department = Department.objects.all().delete()
        except Exception as e:
            print (f"The department could not b deleted. Error below: /n {e}")
        return department

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
    instagram = models.CharField(max_length=200, null=True, blank=True)
    linkedIn = models.CharField(max_length=200, null=True, blank=True)
    staff_id = models.CharField(max_length=200, blank=True)
    commencement_date = models.DateTimeField(max_length=200,blank=True)
    salary = models.IntegerField(blank=True)
    role = models.CharField(max_length=200, blank=True)
    department = models.ForeignKey(Department, null=True, on_delete=models.SET_NULL)
    # department = models.CharField(choices=DEPARTMENTS, max_length=20, blank=True )
    user = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, on_delete=models.SET_NULL)

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
        all_staff = Staff.objects.all().values()
        return all_staff

    @classmethod 
    def get_user_profile(cls, **kwargs):
        user_profile = Staff.objects.filter(**kwargs).values()
        return user_profile

class Contract(BaseModel):
    contract_type = models.CharField(max_length=200, blank=True)
    date_issued = models.DateField(null=False, blank=True)
    contract_length = models.CharField(max_length=200, blank=True)
    contract_details = models.CharField(max_length=200, blank=True)
    contract_document = models.CharField(max_length=200, blank=True)
    end_date = models.CharField(max_length=200, blank=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, on_delete=models.SET_NULL)
    approved_by = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, on_delete=models.SET_NULL, related_name='approved_by')
    
    class Meta:
        verbose_name =("Contract")
        verbose_name_plural =("Contracts")

    def __str__(self):
        return self.name

    @classmethod
    def get_contracts(cls, **kwargs):
        dept = Contract.objects.all().values()
        return dept
    
    @classmethod
    def create_contract(cls, **kwargs):
        contract = None
        try:             
            contract = Contract.objects.create(**kwargs)
        except Exception as e:
            print(e)
        return contract
    
    @classmethod
    def update_contract(cls, contract_id, **kwargs):
        contract = None
        try:
            contract= Contract.objects.filter(id = contract_id).update(**kwargs)
        except Exception as e:
            print(e)
        return contract
    
    @classmethod
    def delete_contract(cls, contract_id):
        contract = None
        try:
            contract = Contract.objects.filter(id=contract_id).delete()
        except Exception as e:
            print(f"Failed to create contract. Error below: \n {e}")
        return contract

    @classmethod
    def delete_all_contracts(cls):
        contract = None
        try:
            contract = Contract.objects.all().delete()
        except Exception as e:
            print(f"Failed to create contract. Error below: \n {e}")
        return contract
        

    @classmethod
    def create_contract(cls, **kwargs):
        contract = None
        try:
            contract = Contract.objects.create(**kwargs)
        except Exception as e:
            print(f"Failed to create contract. Error below: \n {e}")
        return contract

    @classmethod
    def update_contract(cls,contract_id,**contract_data):
        contract = None
        try:
            contract = Contract.objects.filter(id=contract_id).update(**contract_data)
        except Exception as e:
            print(f"Failed to update contract. Error below: \n {e}")
        return contract

    @classmethod
    def delete_all_contract(cls):
        contract = None
        try:
            contract = Contract.objects.all().delete()
        except Exception as e:
            print (f"The contract could not b deleted. Error below: /n {e}")
        return contract