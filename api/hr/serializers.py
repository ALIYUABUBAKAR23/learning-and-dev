from rest_framework import serializers
from api.hr.models import Report


class ReportSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Report
        fields = "__all__"
        