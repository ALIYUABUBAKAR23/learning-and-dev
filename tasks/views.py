from django.shortcuts import render
from rest_framework import filters, status
from rest_framework.views import APIView
from rest_framework.response import Response
from datetime import datetime

from tasks.models import Task


class TasksAPI(APIView):
    def get(self, request):
        user = request.user
        print(f'user = {user}')
        print(f'user.id = {user.id}')
        tasks = Task.get_task_list(assigned_by=user.id)
        # tasks = Task.get_task_list(assigned_to__contains={'id': user.id})
        return Response(data=tasks, status=status.HTTP_200_OK)

    def post(self, request):
        task_data = request.data

        task_data['start_date'] = datetime.strptime(task_data['start_date'], '%Y-%m-%d %H:%M')
        task_data['due_date'] = datetime.strptime(task_data['due_date'], '%Y-%m-%d %H:%M')
        
        task = Task.create_task(**task_data)
        if task is None:
            return Response(data={"message":"Task failed to create. Please Try again later."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(data={"message":"Task created successfully."}, status=status.HTTP_201_CREATED)

    def put(self, request):
        task_id = request.data.get("id", None)
        if task_id is None:
            return Response(data={"message":"Failed to update task. No task ID was specified."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
   
        task_data = request.data
        task_data.pop("id")

        if 'start_date' in task_data: 
            task_data['start_date'] = datetime.strptime(task_data['start_date'], '%Y-%m-%d %H:%M')
        if 'due_date' in task_data: 
            task_data['due_date'] = datetime.strptime(task_data['due_date'], '%Y-%m-%d %H:%M')

        task = Task.update_task(task_id, **task_data)
        if task is None:
            return Response(data={"message":"Failed to update task."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(data={"message":"Successfully updated task."}, status=status.HTTP_201_CREATED)

    def delete(self, request):
        # task_id = request.data.get("id", None)
        # task = Task.delete_task(task_id)
        task = Task.delete_all_tasks()
        if task is None:
            return Response(data={"message":"Failed to delete task."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(data={"message":"Successfully deleted task."}, status=status.HTTP_201_CREATED)


"""
  {
    "name": "test post request",
    "description": "test the post request to the backend",
    "comment": "done by lex, raees and chiz",
    "assigned_by_id": 1,
    "assigned_to": {"id":"2","id":"3"},
    "start_date": "2022-08-03 11:45",
    "due_date": "2022-08-05 12:00",
    "status": "pending"
  }
"""

"""
  {
    "id": 2,
    "name": "test post request",
    "description": "test the post request to the backend",
    "comment": "done by lex, raees and chiz",
    "assigned_by_id": 1,
    "assigned_to": {"id":"2","id":"3"},
    "start_date": "2022-08-03 11:45",
    "due_date": "2022-08-05 12:00",
    "status": "pending"
  }
"""

"""
    {    
        "contract_type": "new",
        "date_issued": "01/01/1000",
        "contract_length": "1 day",
        "contract_details": "super long",
        "contract_document": "important",
        "end_date": "01/02/1000",  
        "user": "",
        "approved_by": ""
    }

"""