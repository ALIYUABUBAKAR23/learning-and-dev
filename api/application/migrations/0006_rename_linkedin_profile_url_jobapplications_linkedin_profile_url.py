# Generated by Django 3.2.6 on 2023-01-26 16:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('application', '0005_rename_date_available_jobapplications_date'),
    ]

    operations = [
        migrations.RenameField(
            model_name='jobapplications',
            old_name='linkedin_Profile_URL',
            new_name='linkedin_profile_url',
        ),
    ]