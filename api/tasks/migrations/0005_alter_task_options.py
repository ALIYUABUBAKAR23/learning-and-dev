# Generated by Django 3.2.6 on 2022-11-21 12:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0004_alter_task_id'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='task',
            options={'ordering': ['-created_at'], 'permissions': [], 'verbose_name': 'task', 'verbose_name_plural': 'tasks'},
        ),
    ]