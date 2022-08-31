from datetime import datetime
from django.test import TestCase
from django.db import models

from api.business_analysis.models import *
from api.crm.models import Customer
from api.authentication.models import User
from api.hr.models import Department

class ProjectModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Set up non-modified objects used by all test methods
        Customer.create_customer(
            first_name="We",
            middle_name="Test",
            last_name="Mi",
            date_of_birth="2022-01-01",
            address="Test Man Str",
            occupation="CEO Test Man",
            company="test customer",
            phone_number="09012345678",
            email="test@test.com",
        )
        Department.create_department(name="ICT", description="GOgo")
        User.objects.create(
            email="lex@gmail.com",
            password="lexxlexx",
            middle_name="john",
            first_name="lex",
            last_name="lu",
            sex="Male",
            state_of_origin="Benue",
            address="servent leader lane",
            phone_number="09012345678",
            twitter="@superlex",
            tnstagram="@mrlex",
            linkedIn="lexx",
            staff_id="RC1007",
            commencement_date="2022-01-01",
            salary=500000,
            role="Full Stack Developer",
            bank_name="UBA",
            bank_account="1234567890",
            department_id="1",
            spouse_name="Bestie",
            date_of_birth="1991-01-01",
            is_married=False    
        )

        cls.project = Project.create_project(
            name='Unit tests 1',
            description='CRUD test 1',
            owner_id=1,
            actual_start_date="2022-08-03",
            expected_start_date='2022-08-05',
            actual_end_date="2022-08-05",
            expected_end_date='2022-08-08',
            estimated_cost=500000.00,
            actual_cost=450000.00,
            current_budget=300000.00,
            starting_budget=600000.00,
            project_lead_id=1,
            location='Blessing Ville',
        )
        Project.create_project(
            name='Unit tests 2',
            description='CRUD test 2',
            owner_id=1,
            actual_start_date="2022-08-03",
            expected_start_date='2022-08-05',
            actual_end_date="2022-08-05",
            expected_end_date='2022-08-08',
            estimated_cost=500000.00,
            actual_cost=450000.00,
            current_budget=300000.00,
            starting_budget=600000.00,
            project_lead_id=1,
            location='Blessing Ville',
        )
        Project.create_project(
            name='Unit tests 3',
            description='CRUD test 3',
            owner_id=1,
            actual_start_date="2022-08-03",
            expected_start_date='2022-08-05',
            actual_end_date="2022-08-05",
            expected_end_date='2022-08-08',
            estimated_cost=500000.00,
            actual_cost=450000.00,
            current_budget=300000.00,
            starting_budget=600000.00,
            project_lead_id=1,
            location='Blessing Ville',
        )

    def test_project_has_correct_fields(self):
        name_field = Project._meta.get_field("name")
        description_field = Project._meta.get_field("description")
        owner_field = Project._meta.get_field("owner")
        actual_start_date_field = Project._meta.get_field("actual_start_date")
        expected_start_date_field = Project._meta.get_field("expected_start_date")
        actual_end_date_field = Project._meta.get_field("actual_end_date")
        expected_end_date_field = Project._meta.get_field("expected_end_date")
        estimated_cost_field = Project._meta.get_field("estimated_cost")
        actual_cost_field = Project._meta.get_field("actual_cost")
        current_budget_field = Project._meta.get_field("current_budget")
        project_lead_field = Project._meta.get_field("project_lead")
        location_field = Project._meta.get_field("location")
        self.assertTrue(isinstance(name_field, models.CharField))
        self.assertTrue(isinstance(description_field, models.TextField))
        self.assertTrue(isinstance(owner_field, models.ForeignKey))
        self.assertTrue(isinstance(actual_start_date_field, models.DateField))
        self.assertTrue(isinstance(expected_start_date_field, models.DateField))
        self.assertTrue(isinstance(actual_end_date_field, models.DateField))
        self.assertTrue(isinstance(expected_end_date_field, models.DateField))
        self.assertTrue(isinstance(estimated_cost_field, models.FloatField))
        self.assertTrue(isinstance(actual_cost_field, models.FloatField))
        self.assertTrue(isinstance(current_budget_field, models.FloatField))
        self.assertTrue(isinstance(project_lead_field, models.ForeignKey))
        self.assertTrue(isinstance(location_field, models.CharField))

        self.assertIsInstance(self.project.name, str)
        self.assertIsInstance(self.project.description, str)
        self.assertIsInstance(self.project.owner_id, int)
        self.assertIsInstance(self.project.actual_start_date, str)
        self.assertIsInstance(self.project.expected_start_date, str)
        self.assertIsInstance(self.project.actual_end_date, str)
        self.assertIsInstance(self.project.expected_end_date, str)
        self.assertIsInstance(self.project.estimated_cost, float)
        self.assertIsInstance(self.project.actual_cost, float)
        self.assertIsInstance(self.project.current_budget, float)
        self.assertIsInstance(self.project.starting_budget, float)
        self.assertIsInstance(self.project.project_lead_id, int)
        self.assertIsInstance(self.project.location, str)

    def test_it_has_timestamps(self):
        self.assertIsInstance(self.project.created_at, datetime)
        self.assertIsInstance(self.project.updated_at, datetime)

    def test_create_project_method(self):
        project = Project.objects.get(id=1)
        self.assertEqual(project.name, 'Unit tests 1')

    def test_get_project_list_method(self):
        # project_id=1
        project = Project.get_project_list()
        self.assertEqual(len(project), 3)

    def test_update_project_method(self):
        project_id = 1
        project = Project.update_project(project_id, description='See hafa')
        self.assertEqual(project, 1)

    def test_delete_project_method(self):
        project_id = 1
        project = Project.delete_project(project_id)
        self.assertEqual(project, (1, {'business_analysis.Project': 1}))

    # def test_first_name_max_length(self):
    #     inventory = Inventory.objects.get(id=1)
    #     max_length = inventory._meta.get_field('first_name').max_length
    #     self.assertEqual(max_length, 100)

    # def test_object_name_is_last_name_comma_first_name(self):
    #     inventory = Inventory.objects.get(id=1)
    #     expected_object_name = f'{inventory.last_name}, {inventory.first_name}'
    #     self.assertEqual(str(inventory), expected_object_name)

    # def test_get_absolute_url(self):
    #     inventory = Inventory.objects.get(id=1)
    #     # This will also fail if the urlconf is not defined.
    #     self.assertEqual(author.get_absolute_url(), '/catalog/author/1')


