from django.shortcuts import render
from rest_framework import filters, status
from rest_framework.views import APIView
from rest_framework.response import Response

from datetime import datetime

from .models import User

class UsersAPI(APIView):
    def get(self, request):
        users = User.get_user_list(is_active=True, is_superuser=False)
        return Response(data=users, status=status.HTTP_200_OK)

