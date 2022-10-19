# Generated by Django 3.2.6 on 2022-10-19 09:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hr', '0005_auto_20221019_0822'),
    ]

    operations = [
        migrations.AlterField(
            model_name='contract',
            name='id',
            field=models.IntegerField(db_index=True, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='department',
            name='id',
            field=models.IntegerField(db_index=True, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='location',
            name='id',
            field=models.IntegerField(db_index=True, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='staff',
            name='id',
            field=models.IntegerField(db_index=True, primary_key=True, serialize=False),
        ),
    ]
