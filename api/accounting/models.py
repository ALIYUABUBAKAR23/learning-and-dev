from django.conf import settings
from django.db import models, transaction
from django.db.models import Sum

from erp.models import BaseModel


ACCOUNT_CLASS = (
    ('revenue', 'Revenue'),
    ('equity', 'Equity'),
    ('other income', 'Other Income'),
    ('other expense', 'Other Expense'),
)

ACCOUNT_TYPE = (
    ('cr', 'CR'),
    ('dr', 'DR'),
)


class Account(BaseModel):
    code = models.IntegerField(null=True, blank=True)
    description = models.TextField(null=False, blank=True)
    account_class = models.CharField(
        choices=ACCOUNT_CLASS, max_length=20, blank=True)
    type = models.CharField(
        choices=ACCOUNT_TYPE, max_length=20, null=True, blank=True)

    class Meta:
        verbose_name = ("Account")
        verbose_name_plural = ("Accounts")

    def __str__(self):
        return self.code

    @classmethod
    def get_accounts(cls, **kwargs):
        account = Account.objects.all().values("code","description","account_class","type")
        return account

    @classmethod
    def create_account(cls, **kwargs):
        account = None
        try:
            account = Account.objects.create(**kwargs)
        except Exception as e:
            print(f"Failed to create account. Error below: \n {e}")
        return account

    @classmethod
    def update_account(cls, account_id, **account_data):
        account = None
        try:
            account = Account.objects.filter(
                id=account_id).update(**account_data)
        except Exception as e:
            print(f"Failed to update account. Error below: \n {e}")
        return account

    @classmethod
    def delete_all_account(cls):
        account = None
        try:
            account = Account.objects.all().delete()
        except Exception as e:
            print(f"The account could not b deleted. Error below: /n {e}")
        return account


class Ledger(BaseModel):
    account = models.ForeignKey(Account, null=True, on_delete=models.SET_NULL)
    transaction_date = models.DateField(null=True)
    account_code = models.CharField(max_length=5, null=True)
    description = models.TextField(null=False, blank=True)
    dr = models.FloatField(max_length=12, null=True, blank=True)
    cr = models.FloatField(max_length=12, null=True, blank=True)
    agent_organization = models.CharField(
        max_length=200, null=True, blank=True)
    type = models.CharField(max_length=200, null=True, blank=True)
    reference_number = models.CharField(max_length=20, null=False, blank=True)

    class Meta:
        verbose_name = ("Ledger")
        verbose_name_plural = ("Ledgers")

    def __str__(self):
        return self.account

    @classmethod
    def get_ledgers(cls, **kwargs):
        ledger = Ledger.objects.all().values("account__account_class","account_id","transaction_date","account_code","description","dr","cr","agent_organization","type","reference_number")
        return ledger

    @classmethod
    def create_ledger(cls, **kwargs):
        ledger = None
        print(type(kwargs['cr']))
        with transaction.atomic():
            ledger = Ledger.objects.create(**kwargs)
            if not ledger:
                transaction.set_rollback(True)
                print(f"Failed to create ledger.")
            return ledger

    @classmethod
    def delete_ledger(cls, ledger_id):
        ledger = None
        try: 
            ledger = Ledger.objects.filter(id=ledger_id).delete() 
        except Exception as e:
            print(f"Failed to delete ledger. Error below: \n {e}")
        return ledger       

    @classmethod
    def create_trial_balance(cls, accounts=None, **kwargs):
        """
        This function creates a trial balance report 'data'.
        It returns a list of ledgers representing each account's financial data summed up.
        It recieves a list of accounts. Then loops through each.
        It then sums up the debit/credit of the account.
        Includes additional info for each accounts trial balance entry.
        """
        if accounts is None:
            return
        trial_balance = []
        for account in accounts:
            if account['account_type'] == 'cr':
                entry = Ledger.objects.filter(account_code=account['account_code']).aggregate(
                    cr=Sum(account['account_type']))
                if entry:
                    associated_account = Ledger.objects.filter(account_code=account['account_code']).values(
                        'account__code', 'account__type', 'account__description', 'account__account_class').first()
                    balance = associated_account
                    balance['cr'] = entry['cr']
                    trial_balance.append(balance)
            if account['account_type'] == 'dr':
                entry = Ledger.objects.filter(account_code=account['account_code']).aggregate(
                    dr=Sum(account['account_type']))
                if entry:
                    associated_account = Ledger.objects.filter(account_code=account['account_code']).values(
                        'account__code', 'account__type', 'account__description', 'account__account_class').first()
                    balance = associated_account
                    balance['dr'] = entry['dr']
                    trial_balance.append(balance)
        return trial_balance

    @classmethod
    def update_ledger(cls, ledger_id, **ledger_data):
        ledger = None
        with transaction.atomic():
            ledger = Ledger.objects.filter(
                id=ledger_id).update(**ledger_data)
            if not ledger:
                transaction.set_rollback(True)
                print(f"Failed to update ledger.")
        return ledger

    @classmethod
    def delete_all_ledger(cls):
        ledger = None
        try:
            ledger = Ledger.objects.all().delete()
        except Exception as e:
            print(f"The ledger could not be deleted. Error below: /n {e}")
        return ledger

# class TrialBalance(BaseModel):
#     account = models.ForeignKey(Account, null=True, on_delete=models.SET_NULL)
#     transaction_date = models.DateField(null=True)
#     account_code = models.CharField(max_length=5, null=True)
#     description = models.TextField(null=False, blank=True)
#     dr = models.IntegerField(null=True, blank=True)
#     cr = models.IntegerField(null=True, blank=True)
#     agent_organization = models.CharField(max_length=200, null=True, blank=True)
#     type = models.CharField(max_length=200, null=True, blank=True)
#     reference_number = models.CharField(max_length=200, null=False, blank=True)

#     class Meta:
#         verbose_name = ("Ledger")
#         verbose_name_plural = ("Ledgers")

#     def __str__(self):
#         return self.account


"""
{
    "account": "",
    "transaction_date": "",
    "account_code": "",
    "description": "",
    "dr": "",
    "cr": "",
    "agent_organization": "",
    "type": "",
    "reference_number": ""
}

{
    "account_id": "1",
    "transaction_date": "2022-07-07",
    "account_code": "7007",
    "description": "beans",
    "dr": "",
    "cr": "5000",
    "agent_organization": "sss",
    "type": "cr",
    "reference_number": "rc11111"
}

{
    "account_code": 7007,
    "account_type": "cr",
}
[
    {
        "account_code": 7007,
        "account_type": "cr"
    }
]
"""
