from django.db import models
from django.core.validators import RegexValidator
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.core.validators import RegexValidator
from django.core.exceptions import ValidationError
from phonenumbers import parse, is_valid_number, PhoneNumberFormat,format_number
from phonenumbers.phonenumberutil import NumberParseException

# Create your models here.

phone_regex = RegexValidator(
        regex=r'^\d{9,15}$', 
        message="Phone number must be between 9 and 15 digits."
    )


class task(models.Model):
    STATUS_CHOICES = [
        ("Pending", "Pending"),
        ("In Progress", "In Progress"),
        ("Completed", "Completed"),
    ]
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    due_date = models.DateField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="Pending")


class UserManager(BaseUserManager):
    def create_user(self, email=None, phone_number=None, password=None, **extra_fields):
        if not email and not phone_number:
            raise ValueError('Either email or phone number must be provided')

        # Normalize the email if provided
        if email:
            email = self.normalize_email(email)

        # Handle phone number validation if provided and not a superuser
        if phone_number and not extra_fields.get('is_superuser'):
            # Check if phone_number includes country code (e.g., +91 for India, +1 for USA)
            try:
                # Default country code if none provided (You can modify this based on your preference)
                country_code = extra_fields.get('country_code', '+91')  # Default to India if not provided
                full_number = f"{country_code}{phone_number}"

                parsed_number = parse(full_number, None)
                if not is_valid_number(parsed_number):
                    raise ValidationError("Invalid phone number.")

                phone_number = format_number(parsed_number, PhoneNumberFormat.E164)
            except NumberParseException:
                raise ValidationError("Invalid phone number format. Make sure to include the country code.")

        # Create and return the user object
        user = self.model(email=email, phone_number=phone_number, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
 
    def create_superuser(self, email=None, phone_number=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if email is None:
            raise ValueError('Superuser must have an email address.')

        return self.create_user(email=email, phone_number=phone_number, password=password, **extra_fields)


class User(AbstractBaseUser):
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True, null=True, blank=True)
    phone_number = models.CharField(max_length=15, unique=True,validators=[phone_regex], null=True, blank=True)

    USERNAME_FIELD = 'email'  # or 'phone_number' if you want to use phone number as username
    REQUIRED_FIELDS = []  # No extra required fields, other than email and password

    objects = UserManager()  # Assign the custom manager

    def __str__(self):
        return self.email if self.email else self.phone_number