# from email.mime import application
from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import JobApplications

class ApplicantAPI(APIView):
    def get(self, request):
        applicant_list = JobApplications.get_job_applications()
        return Response(data=applicant_list, status=status.HTTP_200_OK)
    
    def post(self, request):
        print(request.data)
        application = request.data
        applicant_list = JobApplications.create_application(**application)
        if applicant_list:
            return Response(data={"message": "Successfully created application."}, status=status.HTTP_200_OK)
        return Response(data={"message": "Failed to create application."}, status=status.HTTP_501_NOT_IMPLEMENTED)
    
    def put(self, request):
        applicant_list = request.data.get("id", None)
        if not applicant_list:
            return Response(data={"message": "No list Supplied."}, status=status.HTTP_501_NOT_IMPLEMENTED)
        application_data = request.data
        application_data.pop("id")
        application = application_data.update_application(applicant_list, **application_data)
        if application:
            return Response(data={"message": "Successfully updated application."}, status=status.HTTP_200_OK)
        return Response(data={"message": "Failed to update application."}, status=status.HTTP_501_NOT_IMPLEMENTED)
    
    def delete(self, request):
        application = JobApplications.delete
        if application is None:
            return Response(
                data={"message": "Failed to delete application."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        return Response(data={"message": "Successfully deleted application."}, status=status.HTTP_201_CREATED)