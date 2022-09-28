from rest_framework import serializers
from .models import Project

class ProjectSerializer(serializers.ModelSerializer):

    class Meta:
        model = Project
        fields = ('id', 'name','description','owner','actual_start_date','expected_start_date','actual_end_date','expected_end_date','estimated_cost','actual_cost','current_budget','income','starting_budget','project_lead','people','location')