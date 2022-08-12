import profile
from django.shortcuts import render
from rest_framework import filters, status
from rest_framework.views import APIView
from rest_framework.response import Response

from hr.models import Staff, Department, Contract


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
        user_profile = Staff.create_profile(**user_profile)
        if user_profile: 
            return Response(data={"message":"Successfully created user profile."}, status=status.HTTP_201_CREATED)
        return Response(data={"message":"Failed to create user profile."}, status=status.HTTP_501_NOT_IMPLEMENTED) 
    
    def put(self, request):
        profile_id = request.data.get("id", None)
        if not profile_id:
            return Response(data={"message":"No ID Supplied."}, status=status.HTTP_501_NOT_IMPLEMENTED)
        profile_data = request.data 
        profile_data.pop("id")
        profile = Staff.update_profile(profile_id, **profile_data)
        if profile:
            return Response(data={"message":"Successfully updated profile."}, status=status.HTTP_201_CREATED)
        return Response(data={"message":"Failed to update profile."}, status=status.HTTP_501_NOT_IMPLEMENTED)

    def delete(self, request):
        # profile_id = request.data.get("id", None)
        # profile = Profile.delete_profile(profile_id)
        profile = Staff.delete_all_profiles()
        if profile is None:
            return Response(data={"message":"Failed to delete profile."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(data={"message":"Successfully deleted profile."}, status=status.HTTP_201_CREATED)
    

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
    
    def delete(self, request):
        # department_id = request.data.get("id", None)
        # department = department.delete_department(department_id)
        department = Department.delete_all_departments()
        if department is None:
            return Response(data={"message":"Failed to delete department."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(data={"message":"Successfully deleted department."}, status=status.HTTP_201_CREATED)  


class ContractAPI(APIView):
    def get(self, request):
        depts = Contract.get_contracts()
        return Response(data=depts, status=status.HTTP_200_OK)
    
    def post(self, request):
        contract = request.data
        contract = Contract.create_contract(**contract) 
        if contract: 
            return Response(data={"message":"Successfully created contract."}, status=status.HTTP_201_CREATED)
        return Response(data={"message":"Failed to create contract."}, status=status.HTTP_501_NOT_IMPLEMENTED)    
    
    def put(self, request):
        contract_id = request.data.get("id", None)
        if not contract_id:
            return Response(data={"message":"No ID Supplied."}, status=status.HTTP_501_NOT_IMPLEMENTED)
        contract_data = request.data 
        contract_data.pop("id")
        contract = Contract.update_contract(contract_id, **contract_data)
        if contract:
            return Response(data={"message":"Successfully updated contract."}, status=status.HTTP_201_CREATED)
        return Response(data={"message":"Failed to update contract."}, status=status.HTTP_501_NOT_IMPLEMENTED)  
    
    def delete(self, request):
        # contract_id = request.data.get("id", None)
        # contract = contract.delete_contract(contract_id)
        contract = Contract.delete_all_contracts()
        if contract is None:
            return Response(data={"message":"Failed to delete contract."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(data={"message":"Successfully deleted contract."}, status=status.HTTP_201_CREATED)


'''
  {
    "name": 2,
    "description": "DO PR BEFORE THE END OF THE DAY"
  }
'''