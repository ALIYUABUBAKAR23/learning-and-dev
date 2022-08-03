from django.shortcuts import render
from rest_framework import filters, status
from rest_framework.views import APIView
from rest_framework.response import Response

from hr.models import Staff, Department


class GetStaff(APIView):
    def get(self, request):
        staff = Staff.get_staff_list()
        # print(staff)
        return Response(data=staff, status=status.HTTP_200_OK)


class ProfileAPI(APIView):
    def get(self, request):
        user = request.user
        user_profile = Staff.get_user_profile(user_id=user.id)
        # print(user_profile)
        return Response(data=user_profile, status=status.HTTP_200_OK)

    def post(self, request):
        user_profile = request.data 
        return Response(data=user_profile, status=status.HTTP_200_OK)
    

class DepartmentAPI(APIView):
    def get(self, request):
        depts = Department.get_departments()
        return Response(data=depts, status=status.HTTP_200_OK)
    
    def post(self, request):
        department = request.data
        department = Department.create_department(**department) 
        if department: 
            return Response(data={"message":"Successfully created department."}, status=status.HTTP_201_CREATED)
        return Response(data={"message":"Failed to create department."}, status=status.HTTP_501_NOT_IMPLEMENTED)    
    
    def put(self, request):
        department_id = request.data.get("id", None)
        if not department_id:
            return Response(data={"message":"No ID Supplied."}, status=status.HTTP_501_NOT_IMPLEMENTED)
        department_data = request.data 
        department_data.pop("id")
        department = Department.update_department(department_id, **department_data)
        if department:
            return Response(data={"message":"Successfully updated department."}, status=status.HTTP_201_CREATED)
        return Response(data={"message":"Failed to update department."}, status=status.HTTP_501_NOT_IMPLEMENTED)  
    
        
