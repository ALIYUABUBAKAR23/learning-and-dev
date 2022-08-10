from django.db import models
from django.conf import settings

# Create your models here.
CONDITION=(
    ('Excellent','excellent'),
    ('Good','good'),
    ('Bad','bad'),
)

class Inventory(models.Model):
     name = models.CharField(max_length=200, blank=True, null=True)
     type = models.CharField(max_length=200, blank=True, null=True)
     date_of_purchase = models.CharField(max_length=200, blank=True, null=True)
     purchase_condition = models.CharField(max_length=200, blank=True, null=True)
     current_condition = models.CharField(max_length=200, blank=True, null=True)
     current_location = models.CharField(max_length=200, blank=True)
     model_number = models.CharField(max_length=200, blank=True)
     serial_number = models.CharField(max_length=200, blank=True)

     class Meta:
        verbose_name =("inventory")
        verbose_name_plural = ("inventory")

     def __str__(self):
        return self.name

     @classmethod
     def get_inventory(cls, **kwargs):
        inventory = Inventory.objects.all().values()
        return inventory
     
     @classmethod
     def create_inventory(cls, **kwargs):
        inventory = None
        try:             
            inventory = Inventory.objects.create(**kwargs)
        except Exception as e:
            print(f"Failed to create inventory. Error below: \n {e}")
        return inventory
    
     @classmethod
     def update_inventory(cls, inventory_id, **kwargs):
        inventory = None
        try:
            inventory= Inventory.objects.filter(id = inventory_id).update(**kwargs)
        except Exception as e:
            print(f"Failed to update inventory. Error below: \n {e}")
        return inventory
    
     @classmethod
     def delete_inventory(cls, inventory_id):
        inventory = None
        try:
            inventory = Inventory.objects.filter(id=inventory_id).delete()
        except Exception as e:
            print(f"Failed to delete inventory. Error below: \n {e}")
        return inventory

     @classmethod
     def delete_all_inventory(cls):
        inventory = None
        try:
            inventory = Inventory.objects.all().delete()
        except Exception as e:
            print(f"Failed to delete all inventory. Error below: \n {e}")
        return inventory
            
    