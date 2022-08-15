from datetime import datetime
from django.test import TestCase

from api.tasks.models import Task
from api.authentication.models import User
from api.hr.models import Department

class TaskModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Set up non-modified objects used by all test methods
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
        cls.task = Task.create_task(
            name='Unit tests 1', 
            description='CRUD test 1',
            comment = 'Test comment',
            assigned_by_id = 1,
            assigned_to = {"id":2, "id":3},
            start_date = "2022-08-03 11:45",
            due_date = "2022-08-05 12:00",
            status = 'pending',
            priority = 'low'
        )
        Task.create_task(
            name='Unit tests 2', 
            description='CRUD test 2'
        )
        Task.create_task(
            name='Unit tests 3', 
            description='CRUD test 3'
        )

    def test_task_has_correct_fields(self):                   
        self.assertIsInstance(self.task.name, str)
        self.assertIsInstance(self.task.description, str)
        self.assertIsInstance(self.task.comment, str)
        self.assertIsInstance(self.task.assigned_by_id, int)
        self.assertIsInstance(self.task.assigned_to, dict)
        self.assertIsInstance(self.task.start_date, str)
        self.assertIsInstance(self.task.due_date, str)
        self.assertIsInstance(self.task.status, str)
        self.assertIsInstance(self.task.priority, str)

    def test_it_has_timestamps(self):                           
        self.assertIsInstance(self.task.created_at, datetime)
        self.assertIsInstance(self.task.updated_at, datetime)

    def test_create_task_method(self):
        task = Task.objects.get(id=1)
        self.assertEqual(task.name, 'Unit tests 1')
        task = Task.objects.get(id=2)
        self.assertEqual(task.description, 'CRUD test 2')

    def test_get_task_list_method(self):
        # task_id=1
        task = Task.get_task_list()
        self.assertEqual(len(task), 3)

    def test_update_task_method(self):
        task_id=1
        task = Task.update_task(task_id, comment='See hafa')
        self.assertEqual(task, 1)

    def test_delete_task_method(self):
        task_id=1
        task = Task.delete_task(task_id)
        self.assertEqual(task, (1, {'tasks.Task': 1}))

    # def test_first_name_max_length(self):
    #     task = Task.objects.get(id=1)
    #     max_length = task._meta.get_field('first_name').max_length
    #     self.assertEqual(max_length, 100)

    # def test_object_name_is_last_name_comma_first_name(self):
    #     task = Task.objects.get(id=1)
    #     expected_object_name = f'{task.last_name}, {task.first_name}'
    #     self.assertEqual(str(task), expected_object_name)

    # def test_get_absolute_url(self):
    #     task = Task.objects.get(id=1)
    #     # This will also fail if the urlconf is not defined.
    #     self.assertEqual(author.get_absolute_url(), '/catalog/author/1')
