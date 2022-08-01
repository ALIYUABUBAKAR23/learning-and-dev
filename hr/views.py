from django.shortcuts import render
from rest_framework import filters, status
from rest_framework.views import APIView
from rest_framework.response import Response
from hr.models import Staff, Department

# Create your views here.

class GetStaff(APIView):
    def get(self,request):
        staff = Staff.get_staff_list()
        # print(staff)
        return Response(data=staff, status=status.HTTP_200_OK)

class GetProfile(APIView):
    def get(self,request):
        user = request.user
        user_profile = Staff.get_user_profile(user_id=user.id)
        # print(user_profile)
        return Response(data=user_profile, status=status.HTTP_200_OK)

class GetDepartments(APIView):
    def get(self,request):
        depts =Department.get_deptartments()
        return Response(data=depts, status=status.HTTP_200_OK)