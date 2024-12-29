from rest_framework import serializers
from task.models import task
from django.contrib.auth import authenticate
from task.models import User
from django.contrib.auth.password_validation import validate_password


# serializer for task management
class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = task
        fields = '__all__'

    def validate_title(self, value):
        if not value.strip():
            raise serializers.ValidationError("Title cannot be empty.")
        return value

    def validate_due_date(self, value):
        from datetime import date
        if value < date.today():
            raise serializers.ValidationError("Due date cannot be in the past.")
        return value

# serializer for register
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password_confirm = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['name', 'email', 'phone_number', 'password', 'password_confirm']
        extra_kwargs = {
            'email': {'required': False},  # Email is optional
            'phone_number': {'required': False}  # Phone number is optional
        }

    def validate(self, data):
        # Ensure passwords match
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError("Passwords do not match.")

        return data

    def create(self, validated_data):
        validated_data.pop('password_confirm')  # Remove password_confirm field
        user = User.objects.create_user(**validated_data)
        return user

#  serializer for login
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=False, allow_blank=True)
    phone_number = serializers.CharField(required=False, allow_blank=True)
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        """
        Validate user credentials (either email or phone number).
        """
        email = data.get('email')
        phone_number = data.get('phone_number')
        password = data.get('password')

        if not email and not phone_number:
            raise serializers.ValidationError("Email or phone number is required.")

        user = None
        if email:
            user = authenticate(email=email, password=password)
        elif phone_number:
            user = authenticate(phone_number=phone_number, password=password)
        
        if not user:
            raise serializers.ValidationError("Invalid credentials.")
        
        return {'user': user}  # Return the user object as part of validated data