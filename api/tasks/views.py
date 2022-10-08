# Create your views here.
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from datetime import datetime

from .models import Task


class TasksAPI(APIView):
    def get(self, request):
        # print(request.META)
        user = request.user
        print(f"user = {user}")
        print(f"user.id = {user.id}")
        tasks = Task.get_task_list(assigned_by=user.id)
        # tasks = Task.get_task_list(assigned_to__contains={'id': user.id})
        return Response(data=tasks, status=status.HTTP_200_OK)

    def post(self, request):
        task_data = request.data
        task_data["start_date"] = datetime.fromisoformat(task_data["start_date"])
        task_data["due_date"] = datetime.fromisoformat(task_data["due_date"])
        task_data["assigned_by_id"] = request.user.id
        print(task_data)
        # return Response(data={"message":"Task recieved successfully."}, status=status.HTTP_200_OK)

        task = Task.create_task(**task_data)
        if task is None:
            return Response(
                data={"message": "Task failed to create. Please Try again later."},
                status=status.HTTP_404_NOT_FOUND,
            )
        return Response(
            data={"message": "Task created successfully."},
            status=status.HTTP_201_CREATED,
        )

    def put(self, request):
        task_id = request.data.get("id", None)
        if task_id is None:
            return Response(
                data={"message": "Failed to update task. No task ID was specified."},
                status=status.HTTP_404_NOT_FOUND,
            )

        task_data = request.data
        task_data.pop("id")

        if "start_date" in task_data:
            try:
                task_data["start_date"] = datetime.fromisoformat(task_data["start_date"])
            except ValueError:
                print("Invalid isoformat string, but we are on it.")
                pass

        if "due_date" in task_data:
            try:
                task_data["due_date"] = datetime.fromisoformat(task_data["due_date"])
            except ValueError:
                print("Invalid isoformat string, but we are on it.")
                pass

        if "assigned_by" in task_data:
            task_data.pop("assigned_by")

        task = Task.update_task(task_id, **task_data)
        if task is None:
            return Response(
                data={"message": "Failed to update task."},
                status=status.HTTP_404_NOT_FOUND,
            )
        return Response(
            data={"message": "Successfully updated task."},
            status=status.HTTP_201_CREATED,
        )

    def delete(self, request):
        task_id = request.data["task_id"]
        if task_id is None:
            return Response(
                data={"message": "Failed to delete task. No ID supplied."},
                status=status.HTTP_404_NOT_FOUND,
            )
        # task = Task.delete_task(task_id)
        task = Task.delete_task(task_id)
        if task is None:
            return Response(
                data={"message": "Failed to delete task. Task not found."},
                status=status.HTTP_404_NOT_FOUND,
            )
        return Response(
            data={"message": "Successfully deleted task."},
            status=status.HTTP_204_NO_CONTENT,
        )


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
        "date_issued": "01-01-1000",
        "contract_length": "1 day",
        "contract_details": "super long",
        "contract_document": "important",
        "end_date": "01-02-1000",  
        "user": "",
        "approved_by": ""
    }

"""

"""
{
    "name": "John Smith",
    "address":"Number 17, Spice Street",
    "state": "Kano"    
}

"""
