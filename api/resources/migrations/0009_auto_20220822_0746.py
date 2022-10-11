# Generated by Django 3.2.6 on 2022-08-22 08:46

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ("resources", "0008_alter_inventory_options"),
    ]

    operations = [
        migrations.AddField(
            model_name="inventory",
            name="created_at",
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="inventory",
            name="updated_at",
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AddField(
            model_name="item",
            name="created_at",
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="item",
            name="updated_at",
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name="inventory",
            name="id",
            field=models.IntegerField(db_index=True, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name="item",
            name="id",
            field=models.IntegerField(db_index=True, primary_key=True, serialize=False),
        ),
    ]
