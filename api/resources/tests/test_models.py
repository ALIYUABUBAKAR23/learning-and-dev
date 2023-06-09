from datetime import datetime
from django.test import TestCase
from django.db import models
from api.authentication.models import User
from api.hr.models import Department

from api.resources.models import Inventory, Item, AuditTrail


class InventoryModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Set up non-modified objects used by all test methods
        cls.inventory = Inventory.create_inventory(
            name="Unit tests 1",
            type="CRUD test 1",
            date_of_purchase="2022-08-03",
            purchase_condition="excellent",
            current_condition="good",
            current_location="kub",
            model_number="2222",
            serial_number="pending-1111",
        )
        Inventory.create_inventory(
            name="Unit tests 2",
            type="CRUD test 2",
            date_of_purchase="2022-08-03",
            purchase_condition="good",
            current_condition="good",
            current_location="kub",
            model_number="2222",
            serial_number="pending-1111",
        )
        Inventory.create_inventory(
            name="Unit tests 3",
            type="CRUD test 3",
            date_of_purchase="2022-08-03",
            purchase_condition="good",
            current_condition="good",
            current_location="kub",
            model_number="2222",
            serial_number="pending-1111",
        )

    def test_inventory_has_correct_fields(self):
        date_of_purchase_field = Inventory._meta.get_field("date_of_purchase")
        self.assertTrue(isinstance(date_of_purchase_field, models.DateField))

        self.assertIsInstance(self.inventory.name, str)
        self.assertIsInstance(self.inventory.type, str)
        self.assertIsInstance(self.inventory.date_of_purchase, str)
        self.assertIsInstance(self.inventory.purchase_condition, str)
        self.assertIsInstance(self.inventory.current_condition, str)
        self.assertIsInstance(self.inventory.current_location, str)
        self.assertIsInstance(self.inventory.model_number, str)
        self.assertIsInstance(self.inventory.serial_number, str)

    def test_it_has_timestamps(self):
        self.assertIsInstance(self.inventory.created_at, datetime)
        self.assertIsInstance(self.inventory.updated_at, datetime)

    def test_create_inventory_method(self):
        inventory = Inventory.objects.get(id=1)
        self.assertEqual(inventory.name, "Unit tests 1")

    def test_get_inventory_list_method(self):
        # inventory_id=1
        inventory = Inventory.get_inventory_list()
        self.assertEqual(len(inventory), 3)

    def test_update_inventory_method(self):
        inventory_id = 1
        inventory = Inventory.update_inventory(inventory_id, type="See hafa")
        self.assertEqual(inventory, 1)

    def test_delete_inventory_method(self):
        inventory_id = 1
        inventory = Inventory.delete_inventory(inventory_id)
        self.assertEqual(inventory, (1, {"resources.Inventory": 1}))

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


class ItemModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Set up non-modified objects used by all test methods
        Inventory.create_inventory(
            name="Unit tests 2",
            type="CRUD test 2",
            date_of_purchase="2022-08-03",
            purchase_condition="good",
            current_condition="good",
            current_location="kub",
            model_number="2222",
            serial_number="pending-1111",
        )
        cls.item = Item.create_item(
            name="Unit tests 1",
            description="CRUD test 1",
            serial_number="56566",
            date_of_purchase="2022-08-03",
            cost=20000.00,
            inventory_id=1,
            purchase_quantity=20,
            quantity=10,
        )
        Item.create_item(
            name="Unit tests 2",
            description="CRUD test 2",
            serial_number="3232",
            date_of_purchase="2022-08-03",
            cost=20000.00,
            inventory_id=1,
            purchase_quantity=20,
            quantity=10,
        )
        Item.create_item(
            name="Unit tests 2",
            description="CRUD test 2",
            serial_number="32322",
            date_of_purchase="2022-08-03",
            cost=20000.00,
            inventory_id=1,
            purchase_quantity=20,
            quantity=10,
        )

    def test_item_has_correct_fields(self):
        description_field = Item._meta.get_field("description")
        self.assertTrue(isinstance(description_field, models.TextField))
        date_of_purchase_field = Item._meta.get_field("date_of_purchase")
        self.assertTrue(isinstance(date_of_purchase_field, models.DateField))
        cost_field = Item._meta.get_field("cost")
        self.assertTrue(isinstance(cost_field, models.FloatField))
        self.assertIsInstance(self.item.name, str)
        self.assertIsInstance(self.item.description, str)
        self.assertIsInstance(self.item.serial_number, str)
        self.assertIsInstance(self.item.date_of_purchase, str)
        self.assertIsInstance(self.item.cost, float)
        self.assertIsInstance(self.item.inventory_id, int)
        self.assertIsInstance(self.item.purchase_quantity, int)
        self.assertIsInstance(self.item.quantity, int)

    def test_it_has_timestamps(self):
        self.assertIsInstance(self.item.created_at, datetime)
        self.assertIsInstance(self.item.updated_at, datetime)

    def test_create_item_method(self):
        item = Item.objects.get(id=1)
        self.assertEqual(item.name, "Unit tests 1")
        item = Item.objects.get(id=2)
        self.assertEqual(item.description, "CRUD test 2")

    def test_get_item_list_method(self):
        # item_id=1
        item = Item.get_item_list()
        self.assertEqual(len(item), 3)

    def test_update_item_method(self):
        item_id = 1
        item = Item.update_item(item_id, cost=565656)
        self.assertEqual(item, 1)

    def test_delete_item_method(self):
        item_id = 1
        item = Item.delete_item(item_id)
        self.assertEqual(item, (1, {"resources.Item": 1}))


class AuditTrailModelTest(TestCase):
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
            is_married=False,
        )

        Inventory.create_inventory(
            name="Unit tests 2",
            type="CRUD test 2",
            date_of_purchase="2022-08-03",
            purchase_condition="good",
            current_condition="good",
            current_location="kub",
            model_number="2222",
            serial_number="pending-1111",
        )

        Item.create_item(
            name="Unit tests 2",
            description="CRUD test 2",
            serial_number="3232",
            date_of_purchase="2022-08-03",
            cost=20000.00,
            inventory_id=1,
            purchase_quantity=20,
            quantity=10,
        )

        cls.audit = Audit.create_audit_trail(item_id=1, action_type="move", event=f"Item was moved", user_id=1)
        Audit.create_audit_trail(item_id=1, action_type="remove", event=f"Item was removed", user_id=1)
        Audit.create_audit_trail(item_id=1, action_type="create", event=f"Item was created", user_id=1)

    def test_audit_has_correct_fields(self):
        item_field = AuditTrail._meta.get_field("item")
        user_field = AuditTrail._meta.get_field("user")
        action_type_field = AuditTrail._meta.get_field("action_type")
        event_field = AuditTrail._meta.get_field("event")
        self.assertTrue(isinstance(item_field, models.ForeignKey))
        self.assertTrue(isinstance(user_field, models.ForeignKey))
        self.assertTrue(isinstance(action_type_field, models.CharField))
        self.assertTrue(isinstance(event_field, models.CharField))
        self.assertIsInstance(self.audit.item_id, int)
        self.assertIsInstance(self.audit.action_type, str)
        self.assertIsInstance(self.audit.event, str)
        self.assertIsInstance(self.audit.user_id, int)

    def test_it_has_timestamps(self):
        self.assertIsInstance(self.audit.created_at, datetime)
        self.assertIsInstance(self.audit.updated_at, datetime)

    def test_create_audit_method(self):
        audit = AuditTrail.objects.get(id=1)
        self.assertEqual(audit.item_id, 1)
        self.assertEqual(audit.action_type, "move")
        self.assertEqual(audit.event, "Item was moved")
        self.assertEqual(audit.user_id, 1)
        audit = AuditTrail.objects.get(id=2)
        self.assertEqual(audit.item_id, 1)
        self.assertEqual(audit.action_type, "remove")
        self.assertEqual(audit.event, "Item was removed")
        self.assertEqual(audit.user_id, 1)
