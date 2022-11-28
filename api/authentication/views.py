from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from api.authentication.serializers import PermissionSerializer, PermissionGroupSerializer
from django.contrib.auth.models import Permission, Group as PermissionGroup

from .models import User, UserResetDetails
from django.contrib import messages
from django.shortcuts import redirect
from django.core.mail import send_mail

class UsersAPI(APIView):
    def get(self, request):
        users = User.get_user_list(is_active=True, is_superuser=False)
        return Response(data=users, status=status.HTTP_200_OK)
    
class ProfileUpdateAPI(APIView):
    def change(self):
        if self.method == 'POST':
            profile = UserResetDetails(self.POST, instance=self.user)
            if profile.is_valid():
                send_mail(subject ='profile reset',
                          message ='profile reset sucess', 
                          from_email ='', 
                          recipient_list =[''], 
                          fail_silently=False)    
                profile.save()
                messages.success(self, 'Your profile is updated successfully')
                return redirect(to='users-profile')
        else:
            profile = UserResetDetails(instance=self.user)
        return Response(data=profile, status=status.HTTP_200_OK)
    
class PermissionView(APIView):
    serializer_class = PermissionSerializer
    queryset = Permission.objects.all()
    permission_classes = []


class PermissionGroupView(APIView):
    serializer_class = PermissionGroupSerializer
    queryset = PermissionGroup.objects.all()
    permission_classes = []

