# Generated by Django 3.2.6 on 2022-12-19 10:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('application', '0003_alter_jobApplications_options'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='jobApplications',
            options={'verbose_name': 'JobApplication', 'verbose_name_plural': 'JobApplications'},
        ),
    ]