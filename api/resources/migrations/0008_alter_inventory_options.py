# Generated by Django 3.2.6 on 2022-08-22 08:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('resources', '0007_merge_20220812_2225'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='inventory',
            options={'verbose_name': 'inventory', 'verbose_name_plural': 'inventories'},
        ),
    ]
