from django.shortcuts import render
from rest_framework import filters, status
from rest_framework.views import APIView
from rest_framework.response import Response
from hr.models import Staff, Department
import datetime
from datetime import datetime

# Create your views here.

class StaffAPI(APIView):
    def get(self,request):
        staff = Staff.get_staff_list()
        # print(staff)
        return Response(data=staff, status=status.HTTP_200_OK)

    def post(self,request):
        staff_data = request.data

        staff_data['dob'] = datetime.strptime(staff_data['dob'],'%Y-%m-%d')
        staff_data['commencement_date'] = datetime.strptime(staff_data['commencement_date'],'%Y-%m-%d %H:%M')

        staff = Staff.create_staff(**staff_data)
        if staff is None:
            return Response(data={'message':'Staff failed to be created. Please try again.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(data={'message':'Staff created successfully'}, status=status.HTTP_201_CREATED)

    def put(self,request):
        staff_id= request.data.get("id", None)
        if staff_id is None:
            return Response(data={"message":"Failed to update staff. No staff ID was specified."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        staff_data = request.data
        staff_data.pop("id")

        if 'dob' in staff_data:
            staff_data['dob'] = datetime.strptime(staff_data['dob'],'%Y-%m-%d')
        if 'commencement_date' in staff_data:
            staff_data['commencement_date'] = datetime.strptime(staff_data['commencement_date'],'%Y-%m-%d %H:%M')

        staff = Staff.update_staff(staff_id, **staff_data)
        if staff is None:
            return Response(data={"message":"Failed to update staff."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(data={"message":"Successfully updated staff."}, status=status.HTTP_201_CREATED)

    def delete(self,request):
        staff = Staff.delete_all_staff()
        if staff is None:
            return Response(data={"message":"Failed to delete staff."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(data={"message":"Successfully deleted staff."}, status=status.HTTP_201_CREATED)



class GetProfile(APIView):
    def get(self,request):
        user = request.user
        user_profile = Staff.get_user_profile(user_id=user.id)
        # print(user_profile)
        return Response(data=user_profile, status=status.HTTP_200_OK)



class DepartmentAPI(APIView):
    def get(self,request):
        depts =Department.get_deptartments()
        return Response(data=depts, status=status.HTTP_200_OK)

    def post(self,request):
        department_data = request.data
        
        department = Department.create_department(**department_data)
        if department is None:
            return Response(data={'message':'department failed to be created. Please try again.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(data={'message':'department created successfully'}, status=status.HTTP_201_CREATED)

    def put(self,request):
        department_id= request.data.get("id", None)
        if department_id is None:
            return Response(data={"message":"Failed to update department. No department ID was specified."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        department_data = request.data
        department_data.pop("id")

        department = Department.update_department(department_id, **department_data)
        if department is None:
            return Response(data={"message":"Failed to update department."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(data={"message":"Successfully updated department."}, status=status.HTTP_201_CREATED)

    def delete(self,request):
        department = Department.delete_all_department()
        if department is None:
            return Response(data={"message":"Failed to delete department."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(data={"message":"Successfully deleted department."}, status=status.HTTP_201_CREATED)



'''
{
    "id" : 1,
    "first_name" : "Ihechere" ,
    "last_name" : "Chizimuzo" ,
    "full_name" : "Ihechere Arnold Chizimuzo" ,
    "sex" : "male" ,
    "dob" : "2002-02-07" ,
    "state_of_origin" : "imo" ,
    "address" : "house 4" ,
    "phone_no" : "08180889162" ,
    "email" : "chizi.ihechere@gmail.com" ,
    "twitter" : "sy" ,
    "instagram" : "sy" ,
    "linkedIn" : "sy" ,
    "staff_id" : 123456 ,
    "commencement_date" : "2022-06-24 8:00" ,
    "salary" : 200000 ,
    "role" : "developer"
}
'''
'''
{
    "name" : "Developers" ,
    "description" : "Django Developer" ,
    "head_of_department_id" : 2
}
'''