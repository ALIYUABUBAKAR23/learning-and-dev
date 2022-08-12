from django.shortcuts import render
from rest_framework import filters, status
from rest_framework.views import APIView
from rest_framework.response import Response
from datetime import datetime

from crm.models import Customer
# Create your views here.

class GetCustomers(APIView):
    def get(self,request):
        customer = None
        customer_id = request.query_params.get('customer_id', None)
      #or  customer_id = request.GET.get('customer_id', None)
        if customer_id:
            customer = Customer.get_customer(id=customer_id)
        else:
            customer = Customer.get_all_customers()
        return Response(data=customer, status=status.HTTP_200_OK)

    def post(self,request):
        customer_data = request.data
        print(customer_data)
        
        customer_data['date_of_birth'] = datetime.strptime(customer_data['date_of_birth'], '%Y-%m-%d')

        customer_data = Customer.create_customer(**customer_data)
        if customer_data is None:
             return Response(data={"message":"could not create customer profile.Try again"}, status=status.HTTP_501_NOT_IMPLEMENTED)
        return Response(data={"message":"Successfully created customer profile"}, status=status.HTTP_200_OK)
       
    def put(self, request):
        customer_id = request.data.get("id", None)
        if customer_id is None:
            return Response(data={"mesage":"Failed to update. No Customer id was specified"})

        customer_data = request.data
        customer_data.pop('id')

        if 'date_of_birth' in customer_data:
            customer_data['date_of_birth'] = datetime.strptime(customer_data['date_of_birth'], '%Y-%m-%d')
        
        customer= Customer.update_customer(customer_id, **customer_data)
        if customer is None:
            return Response(data={"message":"Failed to update customer profile."}, status=status.HTTP_501_NOT_IMPLEMENTED)
        return Response(data={"message":"Successfully updated customer profile."}, status=status.HTTP_201_CREATED)
        
    def delete(self, request):
        customer = None
        customer_id = request.GET.get('customer_id', None)
        if customer_id:
            customer = Customer.delete_customer(customer_id)
        else:
            customer = Customer.delete_all_customers()
        if customer is None:
                return Response(data={"message":"Failed to delete customer profile."}, status=status.HTTP_501_NOT_IMPLEMENTED)
        return Response(data={"message":"Successfully deleted customer profile."}, status=status.HTTP_201_CREATED)


"""
  {
    "first_name": "Chizi",
    "middle_name": "Arnold",
    "last_name": "Ihechere",
    "date_of_birth": "2002-02-07",
    "address": "Emerald Garden",
    "occupation": "BackEnd Developer",
    "company": "RightClick IT solutions",
    "phone_number": "08180889162",
    "email": "chizi.ihechere@gmail.com"
  }
"""
