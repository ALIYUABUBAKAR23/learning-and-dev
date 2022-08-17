from datetime import datetime
from django.test import TestCase
from django.db import models

from api.broadcast.models import Broadcast
from api.authentication.models import User
from api.hr.models import Department


class BroadcastModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):

        # Set up non-modified objects used by all test methods
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
            # department_id="1",
            spouse_name="Bestie",
            date_of_birth="1991-01-01",
            is_married=False
        )
        Department.create_department(
            name='Devs',
            description='Dev team'
        )
        cls.broadcast = Broadcast.create_broadcast(
            title='Unit tests 1',
            message='CRUD test 1',
            sender_id=1,
            reciever_id=1,
            file="good",
        )
        Broadcast.create_broadcast(
            title='Unit tests 2',
            message='CRUD test 2',
            sender_id=1,
            reciever_id=1,
            file="good",
        )
        Broadcast.create_broadcast(
            title='Unit tests 3',
            message='CRUD test 3',
            sender_id=1,
            reciever_id=1,
            file="good",
        )

    def test_broadcast_has_correct_fields(self):
        sender_field = Broadcast._meta.get_field("sender")
        reciever_field = Broadcast._meta.get_field("reciever")
        title_field = Broadcast._meta.get_field("title")
        message_field = Broadcast._meta.get_field("message")
        file_field = Broadcast._meta.get_field("file")
        self.assertTrue(isinstance(sender_field, models.ForeignKey))
        self.assertTrue(isinstance(reciever_field, models.ForeignKey))
        self.assertTrue(isinstance(title_field, models.CharField))
        self.assertTrue(isinstance(message_field, models.TextField))
        self.assertTrue(isinstance(file_field, models.CharField))
        self.assertIsInstance(self.broadcast.title, str)
        self.assertIsInstance(self.broadcast.message, str)
        self.assertIsInstance(self.broadcast.sender_id, int)
        self.assertIsInstance(self.broadcast.reciever_id, int)
        self.assertIsInstance(self.broadcast.file, str)

    def test_it_has_timestamps(self):
        self.assertIsInstance(self.broadcast.created_at, datetime)
        self.assertIsInstance(self.broadcast.updated_at, datetime)

    def test_create_broadcast_method(self):
        broadcast = Broadcast.objects.get(id=1)
        self.assertEqual(broadcast.title, 'Unit tests 1')
        self.assertEqual(broadcast.message, 'CRUD test 1')
        self.assertEqual(broadcast.sender_id, 1)
        self.assertEqual(broadcast.reciever_id, 1)
        self.assertEqual(broadcast.file, 'good')

    def test_get_broadcast_list_method(self):
        # broadcast_id=1
        broadcast = Broadcast.get_broadcast_list()
        self.assertEqual(len(broadcast), 3)

    def test_update_broadcast_method(self):
        broadcast_id = 1
        broadcast = Broadcast.update_broadcast(broadcast_id, message='See hafa')
        self.assertEqual(broadcast, 1)

    def test_delete_broadcast_method(self):
        broadcast_id = 1
        broadcast = Broadcast.delete_broadcast(broadcast_id)
        self.assertEqual(broadcast, (1, {'broadcast.Broadcast': 1}))

    # def test_first_name_max_length(self):
    #     broadcast = Broadcast.objects.get(id=1)
    #     max_length = broadcast._meta.get_field('first_name').max_length
    #     self.assertEqual(max_length, 100)

    # def test_object_name_is_last_name_comma_first_name(self):
    #     broadcast = Broadcast.objects.get(id=1)
    #     expected_object_name = f'{broadcast.last_name}, {broadcast.first_name}'
    #     self.assertEqual(str(broadcast), expected_object_name)

    # def test_get_absolute_url(self):
    #     broadcast = Broadcast.objects.get(id=1)
    #     # This will also fail if the urlconf is not defined.
    #     self.assertEqual(author.get_absolute_url(), '/catalog/author/1')
