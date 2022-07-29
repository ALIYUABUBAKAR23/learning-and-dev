from django.shortcuts import render
from rest_framework import filters, status
from rest_framework.views import APIView
from rest_framework.response import Response

from tasks.models import Task


class GetTasks(APIView):
    def get(self, request):
        user = request.user
        # print(f'user na {user.id}')
        tasks = Task.get_task_list(assigned_by=user.id)
        # tasks = Task.get_task_list(assigned_to__contains={'id': user.id})
        return Response(data=tasks, status=status.HTTP_200_OK)
