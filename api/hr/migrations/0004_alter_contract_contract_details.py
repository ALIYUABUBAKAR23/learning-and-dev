# Generated by Django 3.2.6 on 2022-08-16 13:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hr', '0003_alter_contract_contract_length'),
    ]

    operations = [
        migrations.AlterField(
            model_name='contract',
            name='contract_details',
            field=models.TextField(blank=True, null=True),
        ),
    ]