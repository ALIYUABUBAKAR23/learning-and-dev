from datetime import datetime
from django.test import TestCase
from django.db.models import TextField, IntegerField

from api.authentication.models import User
from api.hr.models import Department


class DepartmentModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Set up non-modified objects used by all test methods
        # Department.create_department(name="ICT", description="GOgo")
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

    def test_get_departments_method(self):
        # department_id=1
        department = Department.get_departments()
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


class ContractModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Set up non-modified objects used by all test methods
        # Contract.create_contract(name="ICT", description="GOgo")
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
        cls.contract = Contract.create_contract(
            contract_type='Full Time',
            date_issued='1991-01-01',
            contract_length=24,
            contract_details="These are the details of the contract",
            contract_document="a url link to the document",
            end_date='1993-01-01',
            user_id=1,
            approved_by_id=1
        )
        Contract.create_contract(
            contract_type='Part Time',
            date_issued='1991-01-01',
            contract_length=21,
            contract_details="These are the details of the contract",
            contract_document="a url link to the document",
            end_date='1993-01-01',
            user_id=1,
            approved_by_id=1
        )
        Contract.create_contract(
            contract_type='Full Time',
            date_issued='1995-01-01',
            contract_length=12,
            contract_details="These are the details of the contract",
            contract_document="a url link to the document",
            end_date='1996-01-01',
            user_id=1,
            approved_by_id=1
        )

    def test_contract_has_correct_fields(self):
        contract_length_field = Contract._meta.get_field("contract_length")
        contract_details_field = Contract._meta.get_field("contract_details")
        self.assertTrue(isinstance(contract_length_field, IntegerField))    
        self.assertTrue(isinstance(contract_details_field, TextField))    
        self.assertIsInstance(self.contract.contract_type, str)
        self.assertIsInstance(self.contract.date_issued, datetime)
        self.assertIsInstance(self.contract.contract_length, int)
        self.assertIsInstance(self.contract.contract_details, str)
        self.assertIsInstance(self.contract.contract_document, str)
        self.assertIsInstance(self.contract.end_date, datetime)
        self.assertIsInstance(self.contract.user_id, int)
        self.assertIsInstance(self.contract.approved_by_id, int)

    def test_it_has_timestamps(self):
        self.assertIsInstance(self.contract.created_at, datetime)
        self.assertIsInstance(self.contract.updated_at, datetime)

    def test_create_contract_method(self):
        contract = Contract.objects.get(id=1)
        self.assertEqual(contract.contract_details, 'These are the details of the contract')

    def test_get_contracts_method(self):
        # contract_id=1
        contract = Contract.get_contracts()
        self.assertEqual(len(contract), 3)

    def test_update_contract_method(self):
        contract_id = 1
        contract = Contract.update_contract(
            contract_id, contract_details='Network Engineers')
        self.assertEqual(contract, 1)

    def test_delete_contract_method(self):
        contract_id = 1
        contract = Contract.delete_contract(contract_id)
        self.assertEqual(contract, (1, {'contracts.Contract': 1}))

    # def test_first_name_max_length(self):
    #     contract = Contract.objects.get(id=1)
    #     max_length = contract._meta.get_field('first_name').max_length
    #     self.assertEqual(max_length, 100)

    # def test_object_name_is_last_name_comma_first_name(self):
    #     contract = Contract.objects.get(id=1)
    #     expected_object_name = f'{contract.last_name}, {contract.first_name}'
    #     self.assertEqual(str(contract), expected_object_name)

    # def test_get_absolute_url(self):
    #     contract = Contract.objects.get(id=1)
    #     # This will also fail if the urlconf is not defined.
    #     self.assertEqual(author.get_absolute_url(), '/catalog/author/1')


class LocationModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Set up non-modified objects used by all test methods
        # Location.create_location(name="ICT", description="GOgo")
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
        cls.location = Location.create_location(
            name='Jabi',
            address='Jabi way',
            state="fct",
        )
        Location.create_location(
            name='Utako',
            address='Utako way',
            state="fct",
        )
        Location.create_location(
            name='Nyanya',
            address='Nyanya way',
            state="fct",
        )

    def test_location_has_correct_fields(self):
        self.assertIsInstance(self.location.name, str)
        self.assertIsInstance(self.location.address, str)
        self.assertIsInstance(self.location.state, str)

    def test_it_has_timestamps(self):
        self.assertIsInstance(self.location.created_at, datetime)
        self.assertIsInstance(self.location.updated_at, datetime)

    def test_create_location_method(self):
        location = Location.objects.get(id=1)
        self.assertEqual(location.name, 'Jabi')

    def test_get_locations_method(self):
        # location_id=1
        location = Location.get_locations()
        self.assertEqual(len(location), 3)

    def test_update_location_method(self):
        location_id = 1
        location = Location.update_location(
            location_id, name='Jahi')
        self.assertEqual(location, 1)

    def test_delete_location_method(self):
        location_id = 1
        location = Location.delete_location(location_id)
        self.assertEqual(location, (1, {'locations.Location': 1}))

    # def test_first_name_max_length(self):
    #     location = Location.objects.get(id=1)
    #     max_length = location._meta.get_field('first_name').max_length
    #     self.assertEqual(max_length, 100)

    # def test_object_name_is_last_name_comma_first_name(self):
    #     location = Location.objects.get(id=1)
    #     expected_object_name = f'{location.last_name}, {location.first_name}'
    #     self.assertEqual(str(location), expected_object_name)

    # def test_get_absolute_url(self):
    #     location = Location.objects.get(id=1)
    #     # This will also fail if the urlconf is not defined.
    #     self.assertEqual(author.get_absolute_url(), '/catalog/author/1')
