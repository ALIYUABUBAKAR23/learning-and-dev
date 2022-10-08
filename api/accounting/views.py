from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Account, Ledger


class LedgerAPI(APIView):
    def get(self, request):
        ledger = Ledger.get_ledgers()
        # print(user_profile)
        return Response(data=ledger, status=status.HTTP_200_OK)

    def post(self, request):
        ledger_entry = request.data
        if "cr" in ledger_entry and ledger_entry["cr"] != "":
            entry = float(ledger_entry["cr"])
            ledger_entry["cr"] = format(entry, ".2f")
        else:
            ledger_entry.pop("cr")
        if "dr" in ledger_entry and ledger_entry["dr"] != "":
            entry = float(ledger_entry["dr"])
            ledger_entry["dr"] = format(entry, ".2f")
        else:
            ledger_entry.pop("dr")
        ledger_entry = Ledger.create_ledger(**ledger_entry)
        if ledger_entry:
            return Response(data={"message": "Successfully created ledger."}, status=status.HTTP_201_CREATED)
        return Response(data={"message": "Failed to create ledger."}, status=status.HTTP_501_NOT_IMPLEMENTED)

    def put(self, request):
        ledger_id = request.data.get("id", None)
        if not ledger_id:
            return Response(data={"message": "No ID Supplied."}, status=status.HTTP_501_NOT_IMPLEMENTED)
        ledger_data = request.data
        ledger_data.pop("id")
        ledger = Ledger.update_ledger(ledger_id, **ledger_data)
        if ledger:
            return Response(data={"message": "Successfully updated ledger."}, status=status.HTTP_201_CREATED)
        return Response(data={"message": "Failed to update ledger."}, status=status.HTTP_501_NOT_IMPLEMENTED)

    # def delete(self, request):
    #     # profile_id = request.data.get("id", None)
    #     # profile = Profile.delete_profile(profile_id)
    #     ledger = Ledger.delete_all_ledgers()
    #     if ledger is None:
    #         return Response(data={"message": "Failed to delete ledger."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    #     return Response(data={"message": "Successfully deleted ledger."}, status=status.HTTP_201_CREATED)

    def delete(self, request):
        ledger_id = request.data.get("ledger_id", None)
        ledger = Ledger.delete_ledger(ledger_id)
        print(request.data)

        if ledger is None:
            return Response(
                data={"message": "Failed to delete account."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        return Response(data={"message": "Successfully deleted account."}, status=status.HTTP_201_CREATED)


class AccountAPI(APIView):
    def get(self, request):
        account = Account.get_accounts()
        return Response(data=account, status=status.HTTP_200_OK)

    def post(self, request):
        account = request.data
        account = Account.create_account(**account)
        if account:
            return Response(data={"message": "Successfully created account."}, status=status.HTTP_201_CREATED)
        return Response(data={"message": "Failed to create account."}, status=status.HTTP_501_NOT_IMPLEMENTED)

    def put(self, request):
        account_id = request.data.get("id", None)

        if not account_id:
            return Response(data={"message": "No ID Supplied."}, status=status.HTTP_501_NOT_IMPLEMENTED)

        account_data = request.data
        account_data.pop("id")
        account = Account.update_account(account_id, **account_data)

        if account:
            return Response(data={"message": "Successfully updated account."}, status=status.HTTP_201_CREATED)

        return Response(data={"message": "Failed to update account."}, status=status.HTTP_501_NOT_IMPLEMENTED)

    def delete(self, request):
        account_id = request.data.get("account_id", None)
        account = Account.delete_account(account_id)
        print(request.data)

        if account is None:
            return Response(
                data={"message": "Failed to delete account."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        return Response(data={"message": "Successfully deleted account."}, status=status.HTTP_201_CREATED)

    def delete_all(self, request):
        # account_id = request.data.get("id", None)
        # account = account.delete_account(account_id)
        account = Account.delete_all_account()
        if account is None:
            return Response(
                data={"message": "Failed to delete account."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        return Response(data={"message": "Successfully deleted account."}, status=status.HTTP_201_CREATED)


class TrialBalanceAPI(APIView):
    def post(self, request):
        accounts = request.data
        trial_balance = Ledger.create_trial_balance(accounts=accounts)
        if trial_balance:
            return Response(
                data={"message": "Successfully created trial balance.", "trial_balance": trial_balance},
                status=status.HTTP_201_CREATED,
            )
        return Response(data={"message": "Failed to create trial balance."}, status=status.HTTP_501_NOT_IMPLEMENTED)

    def delete(self, request):
        # contract_id = request.data.get("id", None)
        # contract = contract.delete_contract(contract_id)
        ledger = Ledger.delete_all_ledgers()
        if ledger is None:
            return Response(data={"message": "Failed to delete ledger."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(data={"message": "Successfully deleted ledger."}, status=status.HTTP_201_CREATED)
