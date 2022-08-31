from datetime import datetime
from django.test import TestCase
from django.db import models
from faker import Faker

from api.business_analysis.models import *
from api.crm.models import Customer

dummy = Faker()

first_name_1 = dummy.first_name()
middle_name_1 = dummy.first_name()
last_name_1 = dummy.last_name()
date_of_birth_1 = dummy.date()
address_1 = dummy.address()
occupation_1 = dummy.job()
company_1 = dummy.company()
phone_number_1 = dummy.phone_number()
email_1 = dummy.email()

first_name_2 = dummy.first_name()
middle_name_2 = dummy.first_name()
last_name_2 = dummy.last_name()
date_of_birth_2 = dummy.date()
address_2 = dummy.address()
occupation_2 = dummy.job()
company_2 = dummy.company()
phone_number_2 = dummy.phone_number()
email_2 = dummy.email()


class CustomerModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Set up non-modified objects used by all test methods
        cls.customer = Customer.create_customer(
            first_name= first_name_1,
            middle_name= middle_name_1,
            last_name= last_name_1,
            date_of_birth= date_of_birth_1,
            address= address_1,
            occupation= occupation_1,
            company= company_1,
            phone_number= phone_number_1,
            email= email_1,
        )

        Customer.create_customer(
            first_name= first_name_2,
            middle_name= middle_name_2,
            last_name= last_name_2,
            date_of_birth= date_of_birth_2,
            address= address_2,
            occupation= occupation_2,
            company= company_2,
            phone_number= phone_number_2,
            email= email_2,
        )

    def test_customer_has_correct_fields(self):
        first_name_field = Customer._meta.get_field("first_name")
        middle_name_field = Customer._meta.get_field("middle_name")
        last_name_field = Customer._meta.get_field("last_name")
        date_of_birth_field = Customer._meta.get_field("date_of_birth")
        address_field = Customer._meta.get_field("address")
        occupation_field = Customer._meta.get_field("occupation")
        company_field = Customer._meta.get_field("company")
        phone_number_field = Customer._meta.get_field("phone_number")
        email_field = Customer._meta.get_field("email")

        self.assertTrue(isinstance(first_name_field, models.CharField))
        self.assertTrue(isinstance(middle_name_field, models.CharField))
        self.assertTrue(isinstance(last_name_field, models.CharField))
        self.assertTrue(isinstance(date_of_birth_field, models.DateField))
        self.assertTrue(isinstance(address_field, models.CharField))
        self.assertTrue(isinstance(occupation_field, models.CharField))
        self.assertTrue(isinstance(company_field, models.CharField))
        self.assertTrue(isinstance(phone_number_field, models.CharField))
        self.assertTrue(isinstance(email_field, models.CharField))

        self.assertIsInstance(self.customer.first_name, str)
        self.assertIsInstance(self.customer.middle_name, str)
        self.assertIsInstance(self.customer.last_name, str)
        self.assertIsInstance(self.customer.date_of_birth, str)
        self.assertIsInstance(self.customer.address, str)
        self.assertIsInstance(self.customer.occupation, str)
        self.assertIsInstance(self.customer.company, str)
        self.assertIsInstance(self.customer.phone_number, str)
        self.assertIsInstance(self.customer.email, str)

    def test_it_has_timestamps(self):
        self.assertIsInstance(self.customer.created_at, datetime)
        self.assertIsInstance(self.customer.updated_at, datetime)

    def test_create_customer_method(self):
        # my_date_string = "Mar 11 2011 11:31AM"

        # dob = datetime.strptime(date_of_birth_1, '%Y-%b-%d')        
        customer = Customer.objects.get(id=1)
        dob = customer.date_of_birth.strftime("%Y-%m-%d")
        self.assertEqual(customer.first_name, first_name_1)
        self.assertEqual(customer.middle_name, middle_name_1)
        self.assertEqual(customer.last_name, last_name_1)
        self.assertEqual(dob, date_of_birth_1)
        self.assertEqual(customer.address, address_1)
        self.assertEqual(customer.occupation, occupation_1)
        self.assertEqual(customer.company, company_1)
        self.assertEqual(customer.phone_number, phone_number_1)
        self.assertEqual(customer.email, email_1)

    def test_get_customer_list_method(self):
        # customer_id=1
        customer = Customer.get_customer_list()
        self.assertEqual(len(customer), 2)

    def test_update_customer_method(self):
        customer_id = 1
        customer = Customer.update_customer(customer_id, first_name='Kalalu')
        self.assertEqual(customer, 1)

    def test_delete_customer_method(self):
        customer_id = 1
        customer = Customer.delete_customer(customer_id)
        self.assertEqual(customer, (1, {'crm.Customer': 1}))

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
