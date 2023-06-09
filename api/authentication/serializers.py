# serializers.py in the users Django app
from django.db import transaction
from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer
from rest_auth.models import TokenModel
from django.contrib.auth.models import Permission, Group as PermissionGroup
from django.contrib.contenttypes.models import ContentType

from .models import STATES, SEX, User, UserResetDetails


class CustomRegisterSerializer(RegisterSerializer):

    middle_name = serializers.CharField(max_length=200)
    first_name = serializers.CharField(max_length=200)
    last_name = serializers.CharField(max_length=200)
    sex = serializers.ChoiceField(choices=SEX)
    state_of_origin = serializers.ChoiceField(choices=STATES)
    address = serializers.CharField(max_length=500)
    phone_number = serializers.CharField(max_length=14)
    twitter = serializers.CharField(max_length=50)
    tnstagram = serializers.CharField(max_length=50)
    linkedIn = serializers.CharField(max_length=50)
    staff_id = serializers.CharField(max_length=50)
    commencement_date = serializers.DateField()
    salary = serializers.IntegerField()
    role = serializers.CharField(max_length=200)
    bank_name = serializers.CharField(max_length=100)
    bank_account = serializers.CharField(max_length=20)
    department_id = serializers.IntegerField()
    spouse_name = serializers.CharField(max_length=100)
    date_of_birth = serializers.DateField()
    is_married = serializers.BooleanField()

    # Define transaction.atomic to rollback the save operation in case of error
    @transaction.atomic
    def save(self, request):
        user = super().save(request)
        user.sex = self.data.get("sex")
        user.middle_name = self.data.get("middle_name")
        user.first_name = self.data.get("first_name")
        user.last_name = self.data.get("last_name")
        user.state_of_origin = self.data.get("state_of_origin")
        user.address = self.data.get("address")
        user.phone_number = self.data.get("phone_number")
        user.twitter = self.data.get("twitter")
        user.tnstagram = self.data.get("tnstagram")
        user.linkedIn = self.data.get("linkedIn")
        user.staff_id = self.data.get("staff_id")
        user.commencement_date = self.data.get("commencement_date")
        user.salary = self.data.get("salary")
        user.role = self.data.get("role")
        user.bank_name = self.data.get("bank_name")
        user.bank_account = self.data.get("bank_account")
        user.department_id = self.data.get("department_id")
        user.spouse_name = self.data.get("spouse_name")
        user.date_of_birth = self.data.get("date_of_birth")
        user.is_married = self.data.get("is_married")
        user.save()
        return user


class UserInfoSerializer(serializers.ModelSerializer):
    department = serializers.StringRelatedField()

    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "first_name",
            "last_name",
            "middle_name",
            "sex",
            "state_of_origin",
            "address",
            "phone_number",
            "twitter",
            "tnstagram",
            "linkedIn",
            "staff_id",
            "commencement_date",
            "salary",
            "role",
            "bank_name",
            "bank_account",
            "department",
            "spouse_name",
            "date_of_birth",
            "is_married",
        ]

class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserResetDetails
        fields = [
            "id",
            "email",
            "first_name",
            "last_name",
            "middle_name",
            "state_of_origin",
            "address",
            "date_of_birth",
        ]

# This is to allow you to override the UserDetailsSerializer at any time.
# If you're sure you won't, you can skip this and use DefaultUserDetailsSerializer directly
# rest_auth_serializers = getattr(settings, 'REST_AUTH_SERIALIZERS', {})
# UserDetailsSerializer = import_callable(
#     rest_auth_serializers.get('USER_DETAILS_SERIALIZER', DefaultUserDetailsSerializer)
# )


class TokenSerializer(serializers.ModelSerializer):
    user = UserInfoSerializer(read_only=True)

    class Meta:
        model = TokenModel
        fields = ("key", "user")
        
class ContentTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContentType
        fields = '__all__'

class PermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permission
        fields = '__all__'

    def to_representation(self, instance):
        response = super(PermissionSerializer, self).to_representation(instance)
        response['content_type'] = ContentTypeSerializer(instance.content_type).data
        response['model_name'] = instance.content_type.name
        return response

class PermissionGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = PermissionGroup
        fields = '__all__'



"""
{
    "username": "lexx",
    "email": "lex@gmail.com",
    "password1": "lexxlexx",
    "password2": "lexxlexx",
    "middle_name": "john",
    "first_name": "lex",
    "last_name": "lu",
    "sex": "Male",
    "state_of_origin": "Benue",
    "address": "servent leader lane",
    "phone_number": "09012345678",
    "twitter": "@superlex",
    "tnstagram": "@mrlex",
    "linkedIn": "lexx",
    "staff_id": "RC1007",
    "commencement_date": "2022-01-01",
    "salary": 500000,
    "role": "Full Stack Developer",
    "bank_name": "UBA",
    "bank_account": "1234567890",
    "department_id": "1",
    "spouse_name": "Bestie",
    "date_of_birth": "1991-01-01",
    "is_married": false
}
"""
