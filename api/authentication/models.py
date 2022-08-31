from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _

from api.hr.models import Department

from .managers import CustomUserManager

STATES = (
    ('Abia', 'abia'),
    ('Adamawa', 'adamawa'),
    ('Akwa Ibom', 'akwa Ibom'),
    ('Anambra', 'anambra'),
    ('Bauchi', 'bauchi'),
    ('Bayelsa', 'bayelsa'),
    ('Benue', 'benue'),
    ('Borno', 'borno'),
    ('Cross River', 'cross river'),
    ('Delta', 'delta'),
    ('Ebonyi', 'ebonyi'),
    ('Edo', 'edo'),
    ('Ekiti', 'ekiti'),
    ('Enugu', 'enugu'),
    ('Gombe', 'gombe'),
    ('Imo', 'imo'),
    ('Jigawa', 'jigawa'),
    ('Kaduna', 'kaduna'),
    ('Kano', 'kano'),
    ('Katsina', 'katsina'),
    ('Kebbi', 'kebbi'),
    ('Kogi', 'kogi'),
    ('Kwara', 'kwara'),
    ('Lagos', 'lagos'),
    ('Nasarawa', 'nasarawa'),
    ('Niger', 'niger'),
    ('Ogun', 'ogun'),
    ('Ondo', 'ondo'),
    ('Osun', 'osun'),
    ('Oyo', 'oyo'),
    ('Plateau', 'plateau'),
    ('Rivers', 'rivers'),
    ('Sokoto', 'sokoto'),
    ('Taraba', 'taraba'),
    ('Yobe', 'yobe'),
    ('Zamfara', 'zamfara'),
)

SEX = (
    ('Male', 'male'),
    ('Female', 'female'),
)


class User(AbstractUser):
    username = None
    email = models.EmailField(_('email address'), unique=True)
    middle_name = models.CharField(max_length=200, null=True, blank=True)
    sex = models.CharField(choices=SEX, max_length=10, null=True, blank=True)
    state_of_origin = models.CharField(
        choices=STATES, max_length=20, null=True, blank=True)
    address = models.CharField(max_length=200, null=True, blank=True)
    phone_number = models.CharField(max_length=14, null=True, blank=True)
    twitter = models.CharField(max_length=50, null=True, blank=True)
    tnstagram = models.CharField(max_length=50, null=True, blank=True)
    linkedIn = models.CharField(max_length=50, null=True, blank=True)
    staff_id = models.CharField(max_length=50, null=True, blank=True)
    commencement_date = models.DateField(max_length=200, null=True, blank=True)
    salary = models.IntegerField(blank=True, null=True)
    role = models.CharField(max_length=200, null=True, blank=True)
    bank_name = models.CharField(max_length=100, null=True, blank=True)
    bank_account = models.CharField(max_length=20, null=True, blank=True)
    department = models.ForeignKey(
        Department, null=True, on_delete=models.SET_NULL)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    spouse_name = models.CharField(blank=True, null=True, max_length=100)
    date_of_birth = models.DateField(blank=True, null=True)
    is_married = models.BooleanField(
        _('marital status'),
        default=False,
        help_text=_('Designates whether the user is married or not.'),
    )

    def __str__(self):
        return self.email

    @classmethod
    def get_user_list(cls, **kwargs):
        """
        This method fetches a users list of tasks using key word arguments i.e kwargs
        """
        users = User.objects.filter(**kwargs).values("first_name","last_name","middle_name","id",)
        return users