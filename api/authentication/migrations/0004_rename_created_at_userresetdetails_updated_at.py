# Generated by Django 3.2.6 on 2022-10-28 03:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0003_userresetdetails'),
    ]

    operations = [
        migrations.RenameField(
            model_name='userresetdetails',
            old_name='created_at',
            new_name='updated_at',
        ),
    ]