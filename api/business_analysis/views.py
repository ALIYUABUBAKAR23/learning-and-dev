from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Project

from .serializers import ProjectSerializer
from rest_framework.decorators import api_view
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser


"""
GET POST PUT & DELETE

1. Fetch all instances of the model
2. Fetch a single instance of the model
3. Create an instance of the model
4. Update an instance of the model
5. Delete an instance of the model

"""


class ProjectAPI(APIView):
    def get(self, request):
        projects = Project.get_project_list()
        #   print(projects)
        return Response(data=projects, status=status.HTTP_200_OK)

    def get_project(self, request):
        project_id = request.data.get("id", None)

        if not project_id:
            return Response(data={"message": "No ID Supplied."}, status=status.HTTP_501_NOT_IMPLEMENTED)

        project_data = request.data
        project_data.pop("id")
        project = Project.get_project(project_id, **project_data)

        return Response(data=project, status=status.HTTP_200_OK)

    def post(self, request):
        new_project = request.data
        new_project = Project.create_project(**new_project)

        if new_project:
            return Response(data={"message": "Successfully created Project."}, status=status.HTTP_201_CREATED)
        return Response(data={"message": "Failed to create new Project."}, status=status.HTTP_501_NOT_IMPLEMENTED)

    def put(self, request):
        project_id = request.data.get("id", None)

        if not project_id:
            return Response(data={"message": "No ID Supplied."}, status=status.HTTP_501_NOT_IMPLEMENTED)

        project_data = request.data
        project_data.pop("id")
        project = Project.update_project(project_id, **project_data)

        if project:
            return Response(data={"message": "Successfully updated project."}, status=status.HTTP_201_CREATED)
        return Response(data={"message": "Failed to update project."}, status=status.HTTP_501_NOT_IMPLEMENTED)

    def delete(self, request):
        project_id = request.data.get("project_id", None)
        project = Project.delete_project(project_id)
        print(request.data)

        if project is None:
            return Response(
                data={"message": "Failed to delete project."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        return Response(data={"message": "Successfully deleted project."}, status=status.HTTP_201_CREATED)


# class SingleProjectAPI(generics.RetrieveAPIView):
#     queryset = Project.objects.all()
#     serializer_class = ProjectSerializer


@api_view(["GET", "PUT", "DELETE"])
def SingleProjectAPI(request, pk):
    # find project by pk (id)
    try:
        project = Project.objects.get(pk=pk)

        # Delete Project by Id
        if request.method == "DELETE":
            project.delete()
            return JsonResponse({"message": "Tutorial was deleted successfully!"}, status=status.HTTP_204_NO_CONTENT)

        # Update Project
        elif request.method == "PUT":
            project_data = JSONParser().parse(request)
            project_serializer = ProjectSerializer(project, data=project_data)

            if project_serializer.is_valid():
                project_serializer.save()
                return JsonResponse(project_serializer.data)
            return JsonResponse(project_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except Project.DoesNotExist:
        return JsonResponse({"message": "The project does not exist"}, status=status.HTTP_404_NOT_FOUND)

    # GET / PUT / DELETE tutorial
