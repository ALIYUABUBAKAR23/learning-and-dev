from django.shortcuts import render
from rest_framework import filters, status
from rest_framework.views import APIView
from rest_framework.response import Response
from hr.models import Staff

# Create your views here.

class GetStaff(APIView):
    def get(self,request):
        staff = Staff.get_staff_list()
        # print(staff)
        return Response(data=staff, status=status.HTTP_200_OK)

class LoggedInStaff(APIView):
    def get(self,request):
        logged_in = Staff.logged_in()
        # print(logged_in)
        return Response(data=logged_in, status=status.HTTP_200_OK)
