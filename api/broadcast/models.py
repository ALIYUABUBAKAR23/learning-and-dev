from django.conf import settings

from django.db import models

from erp.models import BaseModel
from hr.models import Department

# Create your models here.

class Broadcast(BaseModel):
    title= models.CharField(max_length=200,blank=True,null=True)
    message= models.TextField(null=True, blank=True)
    sender= models.ForeignKey(settings.AUTH_USER_MODEL,
                             null=True, on_delete=models.SET_NULL, related_name='broadcast')
    reciever= models.ForeignKey(Department,
                             null=True, on_delete=models.SET_NULL, related_name='reciever')
    file= models.CharField(max_length=200,blank=True, null=True)


    class Meta:
        verbose_name = ("Broadcast")
        verbose_name_plural = ("Broadcasts")

    def __str__(self):
        return self.title

    @classmethod
    def get_broadcast(cls,**kwargs):
        broadcast= Broadcast.objects.all().values()
        return broadcast

    @classmethod
    def create_broadcast(cls,**kwargs):
        broadcast = None
        try:
            broadcast = Broadcast.objects.create(**kwargs)
        except Exception as e:
            print(f"Failed to create Broadcast Message. Error below: \n {e}")
        return broadcast

    @classmethod
    def update_broadcast(cls,broadcast_id,**kwargs):
        broadcast= None
        try:
            broadcast = Broadcast.objects.filter(id = broadcast_id).update(**kwargs)
        except Exception as e:
            print(f"Failed to update Broadcast Message. Error below: \n {e}")
        return broadcast

    @classmethod
    def delete_broadcast(cls,broadcast_id):
        broadcast= None
        try:
            broadcast = Broadcast.objects.filter(id= broadcast_id).delete()
        except Exception as e:
            print(f"Failed to delete Broadcast Message. Error below: \n {e}")
        return broadcast
        
    @classmethod
    def delete_all_broadcast(cls):
        broadcast = None
        try:
            broadcast = Broadcast.objects.all().delete()
        except Exception as e:
            print(f"Failed to delete broadcast. Error below: \n {e}")
        return broadcast
