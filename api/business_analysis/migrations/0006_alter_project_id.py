# Generated by Django 3.2.6 on 2022-10-19 09:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('business_analysis', '0005_alter_project_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='id',
            field=models.IntegerField(db_index=True, primary_key=True, serialize=False),
        ),
    ]