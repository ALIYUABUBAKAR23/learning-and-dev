# Generated by Django 3.2.6 on 2022-08-02 15:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('hr', '0004_auto_20220801_1540'),
    ]

    operations = [
        migrations.RenameField(
            model_name='staff',
            old_name='tnstagram',
            new_name='instagram',
        ),
    ]
