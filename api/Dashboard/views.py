from django.shortcuts import render
from rest_framework import filters, status
from rest_framework.views import APIView
from rest_framework.response import Response
from api.tasks.models import TASK_STATUS 
from api.tasks.models import Task 

        
class DashboardView(APIView):
    def get(self, request):
        user = request.user
        task_data = dict(
            total_count_of_tasks_assigned_to_user= Task.total_count_of_tasks_assigned_to_user(user.id)
        )

# @login_required
# def tasks(required):
#     return render(request,'tasks')
# def counter(request):
#     test = request.GET['text']
#     tasks_assigned_to_a_user = len(text.split())
    
#     return render(request, 'dashboard/tasks.html',context)

# @login_required
# def tasks(required):
#     return render(request,'tasks')
# def counter(request):
#     test = request.GET['text']
#     tasks_assigned_to_a_user_completed = len(text.split())
    
#     return render(request, 'dashboard/tasks.html',context)

# @login_required
# def tasks(required):
#     return render(request,'tasks')
# def counter(request):
#     test = request.GET['text']
#     tasks_assigned_to_a_user_cancelled = len(text.split())
    
#     return render(request, 'dashboard/tasks.html',context)