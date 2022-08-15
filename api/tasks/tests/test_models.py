from django.test import TestCase

from api.tasks.models import Task

class TaskModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Set up non-modified objects used by all test methods
        Task.create_task(name='Unit tests', description='CRUD test')

    def test_create_task_method(self):
        task = Task.objects.get(id=1)
        self.assertEqual(task.name, 'Unit tests')

    def test_update_task_method(self):
        task = Task.update_task(task_id=1, comment='See hafa')
        self.assertEqual(task, 1)

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
