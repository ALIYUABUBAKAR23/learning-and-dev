# Generated by Django 3.2.6 on 2022-11-21 12:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('business_analysis', '0007_alter_project_id'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='project',
            options={'ordering': ['-created_at'], 'permissions': [], 'verbose_name': 'Project', 'verbose_name_plural': 'Projects'},
        ),
    ]
