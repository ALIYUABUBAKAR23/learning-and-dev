import profile
from django.shortcuts import render
from rest_framework import filters, status
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Broadcast

# Create your views here.
class BroadcastAPI(APIView):
    def get(self, request):
        broadcast= Broadcast.get_broadcast()
        return Response(data=broadcast, status = status.HTTP_200_OK)

    def post(self, request):
        broadcast_message = request.data
        broadcast_message = Broadcast.create_broadcast(**broadcast_message)
        if broadcast_message:
            return Response(data={"message":"Broadcast message sent"}, status = status.HTTP_201_CREATED)
        else:
            return Response(data={"message":"could not send Broadcast message. Try again"}, status = status.HTTP_501_NOT_IMPLEMENTED)
    
    def put(self, request):
        broadcast_id= request.data.get("id", None)
        if not broadcast_id:
            return Response(data={"message":"No Broadcast message id specified"}, status = status.HTTP_501_NOT_IMPLEMENTED)

        broadcast_message= request.data
        broadcast_message.pop("id")

        broadcast = Broadcast.update_broadcast(broadcast_id, **broadcast_message)
        if broadcast:
            return Response(data={"message":"Broadcast message updated"}, status = status.HTTP_201_CREATED)
        return Response(data={"message":"could not update Broadcast message"}, status = status.HTTP_501_NOT_IMPLEMENTED)

    def delete(self,request):
        broadcast = None
        broadcast_id= request.data.get("id", None)
        if broadcast_id:
            broadcast = Broadcast.delete_broadcast(broadcast_id)
        else:
            broadcast = Broadcast.delete_all_broadcast()
        if broadcast:
            return Response(data={"message":"Successfully deleted broadcast."}, status=status.HTTP_201_CREATED)
        return Response(data={"message":"Failed to delete broadcast."}, status=status.HTTP_501_NOT_IMPLEMENTED)



'''
  {
    "title": "DO PR BEFORE THE END OF THE DAY",
    "message": "Make sure you do your prs with pro comments",
    "sender_id": 1,
    "to_id": 1,
    "file": "isabicode.txt"
  }
'''

'''
  {
    "id": 2,
    "title": "DO PR BEFORE THE END OF THE DAY",
    "message": "Make sure you do your prs with pro comments",
    "sender_id": 1,
    "to_id": 1,
    "file": "isabicode.txt"
  }
'''

