from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import User, UserResetDetails
from django.contrib import messages
from django.shortcuts import redirect

class UsersAPI(APIView):
    def get(self, request):
        users = User.get_user_list(is_active=True, is_superuser=False)
        return Response(data=users, status=status.HTTP_200_OK)
    
class ProfileUpdateAPI(APIView):
    def change(self):
        if self.method == 'POST':
            profile = UserResetDetails(self.POST, instance=self.user)
            if profile.is_valid():
                profile.save()
                messages.success(self, 'Your profile is updated successfully')
                return redirect(to='users-profile')
        else:
            profile = UserResetDetails(instance=self.user)
        return Response(data=profile, status=status.HTTP_200_OK)
