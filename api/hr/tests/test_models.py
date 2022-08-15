from datetime import datetime
from django.test import TestCase

from api.authentication.models import User
from api.hr.models import Department


class DepartmentModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Set up non-modified objects used by all test methods
        # Department.create_department(name="ICT", description="GOgo")
        cls.user = User.objects.create(
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
            # department_id="1",
            spouse_name="Bestie",
            date_of_birth="1991-01-01",
            is_married=False
        )
        cls.department = Department.create_department(
            name='ICT',
            description='ICT guys',
            head_of_department_id=1
        )
        Department.create_department(
            name='Accounting',
            description='Bean counters',
            head_of_department_id=1
        )
        Department.create_department(
            name='Devs',
            description='Dev team'
        )

    def test_department_has_correct_fields(self):
        self.assertIsInstance(self.department.name, str)
        self.assertIsInstance(self.department.description, str)
        self.assertIsInstance(self.department.head_of_department_id, int)

    def test_it_has_timestamps(self):
        self.assertIsInstance(self.department.created_at, datetime)
        self.assertIsInstance(self.department.updated_at, datetime)

    def test_create_department_method(self):
        department = Department.objects.get(id=1)
        self.assertEqual(department.name, 'ICT')
        department = Department.objects.get(id=2)
        self.assertEqual(department.description, 'Bean counters')
        self.assertEqual(department.head_of_department_id, 1)

    def test_get_department_list_method(self):
        # department_id=1
        department = Department.get_department_list()
        self.assertEqual(len(department), 3)

    def test_update_department_method(self):
        department_id = 1
        department = Department.update_department(
            department_id, description='Network Engineers')
        self.assertEqual(department, 1)

    def test_delete_department_method(self):
        department_id = 1
        department = Department.delete_department(department_id)
        self.assertEqual(department, (1, {'departments.Department': 1}))

    # def test_first_name_max_length(self):
    #     department = Department.objects.get(id=1)
    #     max_length = department._meta.get_field('first_name').max_length
    #     self.assertEqual(max_length, 100)

    # def test_object_name_is_last_name_comma_first_name(self):
    #     department = Department.objects.get(id=1)
    #     expected_object_name = f'{department.last_name}, {department.first_name}'
    #     self.assertEqual(str(department), expected_object_name)

    # def test_get_absolute_url(self):
    #     department = Department.objects.get(id=1)
    #     # This will also fail if the urlconf is not defined.
    #     self.assertEqual(author.get_absolute_url(), '/catalog/author/1')
