# Generated by Django 3.2.6 on 2022-08-12 10:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('resources', '0005_merge_20220812_0910'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='inventory',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='resources.inventory'),
        ),
    ]
