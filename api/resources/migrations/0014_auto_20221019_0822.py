# Generated by Django 3.2.6 on 2022-10-19 09:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('resources', '0013_merge_20221007_1958'),
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