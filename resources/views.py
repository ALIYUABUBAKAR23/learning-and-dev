from django.shortcuts import render
from rest_framework import filters, status
from rest_framework.views import APIView
from rest_framework.response import Response

from resources.models import Inventory

class InventoryAPI(APIView):
    def get(self, request):
        inventory = Inventory.get_inventory()
        return Response(data=inventory, status=status.HTTP_200_OK)
    
    def post(self, request):
        inventory = request.data
        inventory = Inventory.create_inventory(**inventory) 
        if inventory: 
            return Response(data={"message":"Successfully created inventory."}, status=status.HTTP_201_CREATED)
        return Response(data={"message":"Failed to create inventory."}, status=status.HTTP_501_NOT_IMPLEMENTED)    
    
    def put(self, request):
        inventory_id = request.data.get("id", None)
        if not inventory_id:
            return Response(data={"message":"No ID Supplied."}, status=status.HTTP_501_NOT_IMPLEMENTED)
        inventory_data = request.data 
        inventory_data.pop("id")
        inventory = Inventory.update_inventory(inventory_id, **inventory_data)
        if inventory:
            return Response(data={"message":"Successfully updated inventory."}, status=status.HTTP_201_CREATED)
        return Response(data={"message":"Failed to update inventory."}, status=status.HTTP_501_NOT_IMPLEMENTED)  
    
    def delete(self, request):
        inventory = Inventory.delete_all_inventory()
        if inventory is None:
            return Response(data={"message":"Failed to delete department."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(data={"message":"Successfully deleted department."}, status=status.HTTP_201_CREATED)  
