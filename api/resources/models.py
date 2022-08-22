from django.db import models
from erp.models import BaseModel


class Inventory(BaseModel):
     name = models.CharField(max_length=200, blank=True, null=True)
     type = models.CharField(max_length=200, blank=True, null=True)
     date_of_purchase = models.DateField(null=False, blank=True)
     purchase_condition = models.CharField(max_length=200, blank=True, null=True)
     current_condition = models.CharField(max_length=200, blank=True, null=True)
     current_location = models.CharField(max_length=200, blank=True)
     model_number = models.CharField(max_length=200, blank=True)
     serial_number = models.CharField(max_length=200, blank=True)

     class Meta:
        verbose_name =("inventory")
        verbose_name_plural = ("inventories")

     def __str__(self):
        return self.name

     @classmethod
     def get_inventory_list(cls, **kwargs):
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
            
# Items class and functions
class Item(BaseModel):
     name = models.CharField(max_length=200, blank=True, null=True)
     description = models.TextField(null=False, blank=True)
     serial_number = models.CharField(max_length=200, blank=True)
     date_of_purchase = models.DateField(null=False, blank=True)
     cost = models.FloatField(blank=True)
     inventory = models.ForeignKey(Inventory, null=True, on_delete=models.SET_NULL)
     purchase_quantity = models.IntegerField(blank=True)
     quantity = models.IntegerField(blank=True)

     class Meta:
        verbose_name =("item")
        verbose_name_plural = ("items")

     def __str__(self):
        return self.name

     @classmethod
     def get_item_list(cls, **kwargs):
        item = Item.objects.all().values()
        return item
     
     @classmethod
     def create_item(cls, **kwargs):
        item = None
        try:             
            item = Item.objects.create(**kwargs)
        except Exception as e:
            print(f"Failed to create item. Error below: \n {e}")
        return item
    
     @classmethod
     def update_item(cls, item_id, **kwargs):
        item = None
        try:
            item= Item.objects.filter(id = item_id).update(**kwargs)
        except Exception as e:
            print(f"Failed to update item. Error below: \n {e}")
        return item
    
     @classmethod
     def delete_item(cls, item_id):
        item = None
        try:
            item = Item.objects.filter(id=item_id).delete()
        except Exception as e:
            print(f"Failed to delete item. Error below: \n {e}")
        return item

     @classmethod
     def delete_all_items(cls):
        item = None
        try:
            item = Item.objects.all().delete()
        except Exception as e:
            print(f"Failed to delete all items. Error below: \n {e}")
        return item
