# Generated by Django 3.2.6 on 2022-10-19 09:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('resources', '0015_auto_20221019_0823'),
    ]

    operations = [
        migrations.AlterField(
            model_name='audittrail',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='inventory',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='item',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]