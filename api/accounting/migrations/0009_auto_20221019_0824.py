# Generated by Django 3.2.6 on 2022-10-19 09:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounting', '0008_auto_20221019_0823'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='ledger',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
