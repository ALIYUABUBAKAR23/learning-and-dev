from django.db import models

from erp.models import BaseModel

# Create your models here.


class Customer(BaseModel):
    first_name = models.CharField(max_length=200, null=True, blank=True)
    middle_name = models.CharField(max_length=200, null=True, blank=True)
    last_name = models.CharField(max_length=200, null=True, blank=True)
    date_of_birth = models.DateField(max_length=200, null=True, blank=True)
    address = models.CharField(max_length=200, null=True, blank=True)
    occupation = models.CharField(max_length=200, null=True, blank=True)
    company = models.CharField(max_length=200, null=True, blank=True)
    phone_number = models.CharField(max_length=200, null=True, blank=True)
    email = models.EmailField(max_length=200, null=True, blank=True)

    class Meta:
        verbose_name = "customer"
        verbose_name_plural = "customers"

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    @classmethod
    def get_all_customers(cls):
        customers = Customer.objects.all().values()
        return customers

    @classmethod
    def get_customer(cls, **kwargs):
        customer = Customer.objects.filter(**kwargs).values()
        return customer

    @classmethod
    def create_customer(cls, **kwargs):
        customer = None
        try:
            customer = Customer.objects.create(**kwargs)
        except Exception as e:
            print(f"Failed to create customer. Error below: \n {e}")
        return customer

    @classmethod
    def update_customer(cls, customer_id, **kwargs):
        customer = None
        try:
            customer = Customer.objects.filter(id=customer_id).update(**kwargs)
        except Exception as e:
            print(f"Failed to update customer. Error below: \n {e}")
        return customer

    @classmethod
    def delete_customer(cls, customer_id):
        customer = None
        try:
            customer = Customer.objects.filter(id=customer_id).delete()
        except Exception as e:
            print(f"Failed to delete customer. Error below: \n {e}")
        return customer

    @classmethod
    def delete_all_customers(cls):
        customer = None
        try:
            customer = Customer.objects.all().delete()
        except Exception as e:
            print(f"Failed to delete customer. Error below: \n {e}")
        return customer
