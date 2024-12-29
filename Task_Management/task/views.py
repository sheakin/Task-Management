from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import task
from .serializers import TaskSerializer
from .serializers import RegisterSerializer,LoginSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import login

class TaskAPIView(APIView):

    def get(self, request):
        status_filter = request.query_params.get('status', None)  # Get 'status' query parameter

        if status_filter:
            tasks = task.objects.filter(status=status_filter)  # Filter tasks by status
        else:
            tasks = task.objects.all()  # Get all tasks if no filter is provided
        
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        """
        Create a new task.
        """
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id):
        try:
            task_instance = task.objects.get(id=id)  # Rename to task_instance to avoid conflict
        except task.DoesNotExist:
            return Response({"error": "Task not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = TaskSerializer(task_instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def delete(self, request, id):
        """
        Delete an existing task.
        """
        tasks = task.objects.get( id=id)
        tasks.delete()
        return Response({"message": "Task deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
    
class taskidAPIView(APIView):
    def get(self, request, id=None):
        """
        Retrieve details of a specific task by ID.
        """
        try:
            task_instance = task.objects.get(id=id)  # Fetch the task with the given ID
        except task.DoesNotExist:
            return Response({"error": "Task not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = TaskSerializer(task_instance)
        return Response(serializer.data, status=status.HTTP_200_OK)



class RegisterAPIView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()  # Create the user
            return Response(
                {
                    "message": "User registered successfully.",
                    "user_id": user.id,
                    "email": user.email
                    
                },
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class LoginAPIView(APIView):
    def post(self, request):
        # Deserialize the request data with the LoginSerializer
        serializer = LoginSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.validated_data['user']  # Retrieve the user object after successful validation

            # Log the user in using Django's login function
            login(request, user)

            # Generate JWT tokens using the `RefreshToken` class
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)

            # Return the response with user details and the generated JWT tokens
            return Response(
                {
                    "message": "Login successful.",
                    "user_id": user.id,
                    "email": user.email,
                    "access_token": access_token,
                    "refresh_token": str(refresh),
                },
                status=status.HTTP_200_OK
            )

        # If the serializer is not valid, return the errors
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 