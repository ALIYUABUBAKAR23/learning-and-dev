from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from api.hr.models import Staff, Department, Contract, Location, Leave,Report
from .serializers import ReportSerializer



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
            return Response(data={"message": "Successfully created user profile."}, status=status.HTTP_201_CREATED)
        return Response(data={"message": "Failed to create user profile."}, status=status.HTTP_501_NOT_IMPLEMENTED)

    def put(self, request):
        profile_id = request.data.get("id", None)
        if not profile_id:
            return Response(data={"message": "No ID Supplied."}, status=status.HTTP_501_NOT_IMPLEMENTED)
        profile_data = request.data
        profile_data.pop("id")
        profile = Staff.update_profile(profile_id, **profile_data)
        if profile:
            return Response(data={"message": "Successfully updated profile."}, status=status.HTTP_201_CREATED)
        return Response(data={"message": "Failed to update profile."}, status=status.HTTP_501_NOT_IMPLEMENTED)


    def delete(self, request):
        # profile_id = request.data.get("id", None)
        # profile = Profile.delete_profile(profile_id)
        profile = Staff.delete_all_profiles()
        if profile is None:
            return Response(
                data={"message": "Failed to delete profile."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        return Response(data={"message": "Successfully deleted profile."}, status=status.HTTP_201_CREATED)


class DepartmentAPI(APIView):
    def get(self, request):
        department = Department.get_departments()
        return Response(data=department, status=status.HTTP_200_OK)

    def post(self, request):
        department = request.data
        department = Department.create_department(**department)
        if department:
            return Response(data={"message": "Successfully created department."}, status=status.HTTP_201_CREATED)
        return Response(data={"message": "Failed to create department."}, status=status.HTTP_501_NOT_IMPLEMENTED)

    def put(self, request):
        department_id = request.data.get("id", None)
        if not department_id:
            return Response(data={"message": "No ID Supplied."}, status=status.HTTP_501_NOT_IMPLEMENTED)
        department_data = request.data
        department_data.pop("id")
        department = Department.update_department(department_id, **department_data)
        if department:
            return Response(data={"message": "Successfully updated department."}, status=status.HTTP_201_CREATED)
        return Response(data={"message": "Failed to update department."}, status=status.HTTP_501_NOT_IMPLEMENTED)

    def delete(self, request):
        # department_id = request.data.get("id", None)
        # department = department.delete_department(department_id)
        department = Department.delete_all_departments()
        if department is None:
            return Response(
                data={"message": "Failed to delete department."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        return Response(data={"message": "Successfully deleted department."}, status=status.HTTP_201_CREATED)


class ContractAPI(APIView):
    def get(self, request):

        user = request.user
        print(f"user = {user}")
        print(f"user.id = {user.id}")
        contract = Contract.get_contracts(approved_by=user.id)
        return Response(data=contract, status=status.HTTP_200_OK)

    def post(self, request):
        contract = request.data
        contract["approved_by_id"] = request.user.id
        print(contract)

        contract = Contract.create_contract(**contract)
        if contract:
            return Response(data={"message": "Successfully created contract."}, status=status.HTTP_201_CREATED)
        return Response(data={"message": "Failed to create contract."}, status=status.HTTP_501_NOT_IMPLEMENTED)

    def put(self, request):
        contract_id = request.data.get("id", None)
        if not contract_id:
            return Response(data={"message": "No ID Supplied."}, status=status.HTTP_501_NOT_IMPLEMENTED)

        contract_data = request.data
        contract_data.pop("id")

        if "approved_by" in contract_data:
            contract_data.pop("approved_by")

        contract = Contract.update_contract(contract_id, **contract_data)
        if contract:
            return Response(data={"message": "Successfully updated contract."}, status=status.HTTP_201_CREATED)
        return Response(data={"message": "Failed to update contract."}, status=status.HTTP_501_NOT_IMPLEMENTED)

    def delete(self, request):
        contract_id = request.data["contract_id"]
        if contract_id is None:
            return Response(
                data={"message": "Failed to delete contract. NO ID supplied."},
                status=status.HTTP_404_NOT_FOUND,
            )
        contract = Contract.delete_contract(contract_id)
        if contract is None:
            return Response(
                data={"message": "Failed to delete contract."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        return Response(data={"message": "Successfully deleted contract."}, status=status.HTTP_201_CREATED)


class LocationAPI(APIView):
    def get(self, request):
        location = Location.get_locations()
        return Response(data=location, status=status.HTTP_200_OK)

    def post(self, request):
        location = request.data
        location = Location.create_location(**location)
        if location:
            return Response(data={"message": "Successfully created location."}, status=status.HTTP_201_CREATED)
        return Response(data={"message": "Failed to create location."}, status=status.HTTP_501_NOT_IMPLEMENTED)

    def put(self, request):
        location_id = request.data.get("id", None)
        if not location_id:
            return Response(data={"message": "No ID Supplied."}, status=status.HTTP_501_NOT_IMPLEMENTED)
        location_data = request.data
        location_data.pop("id")
        location = Location.update_location(location_id, **location_data)
        if location:
            return Response(data={"message": "Successfully updated location."}, status=status.HTTP_201_CREATED)
        return Response(data={"message": "Failed to update location."}, status=status.HTTP_501_NOT_IMPLEMENTED)

    def delete(self, request):
        # location_id = request.data.get("id", None)
        # location = location.delete_location(location_id)
        location = Location.delete_all_locations()
        if location is None:
            return Response(
                data={"message": "Failed to delete location."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        return Response(data={"message": "Successfully deleted location."}, status=status.HTTP_201_CREATED)

class LeaveAPI(APIView):
    def get(self, request):
        leave = Leave.get_leaves_list()

        return Response(data=leave, status=status.HTTP_200_OK)

    def post(self, request):
        leave_data = request.data        
        leave = Leave.create_leave(**leave_data)

        if leave is None:
            return Response(data={"message":"Leave failed to create."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        return Response(data={"message":"Leave created successfully."}, status=status.HTTP_201_CREATED)
    
    def put(self, request):
        leave_id = request.data.get("id", None)
        if leave_id is None:
            return Response(data={"message":"Failed to update Leave. No Leave ID was specified."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
   
        leave_data = request.data
        leave_data.pop("id")

        leave = Leave.update_leave(leave_id, **leave_data)
        if leave is None:
            return Response(data={"message":"Failed to update leave."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(data={"message":"Successfully updated leave."}, status=status.HTTP_201_CREATED)
    
    def delete(self, request):
        leave_id = request.data.get("leave_id", None)
        leave = Leave.delete_leave(leave_id)
        print(request.data)

        if leave is None:
            return Response(
                data={"message": "Failed to delete leave."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        return Response(data={"message": "Successfully deleted leave."}, status=status.HTTP_201_CREATED)

class ReportList(APIView):
    def get(self, request):
        queryset = Report.objects.all()
        serializer = ReportSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = ReportSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(data={"message": "created successfully"}, status=status.HTTP_201_CREATED)

class ReportDetail(APIView):
    def get(self, request, id):
        report = get_object_or_404(Report, pk=id)
        serializer = ReportSerializer(report)
        return Response(serializer.data)
 
    def put(self, request, id):
        report = get_object_or_404(Report, pk=id)
        serializer = ReportSerializer(report, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(data={"message": "updated successfully "}, status=status.HTTP_201_CREATED)
    
    def delete(self, request, id):
        report = get_object_or_404(Report, pk=id)
        report.delete()
        return Response(data={"message": "Successfully deleted"},status=status.HTTP_204_NO_CONTENT)
    

        