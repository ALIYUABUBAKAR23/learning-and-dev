# Generated by Django 3.2.6 on 2022-08-11 21:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("resources", "0002_auto_20220811_2018"),
    ]

    operations = [
        migrations.CreateModel(
            name="Item",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("name", models.CharField(blank=True, max_length=200, null=True)),
                ("description", models.CharField(blank=True, max_length=200, null=True)),
                ("serial_number", models.CharField(blank=True, max_length=200)),
                ("date_of_purchase", models.DateField(blank=True)),
                ("cost", models.IntegerField(blank=True)),
                ("purchase_quantity", models.IntegerField(blank=True)),
                ("quantity", models.IntegerField(blank=True)),
                (
                    "inventory",
                    models.ForeignKey(
                        null=True, on_delete=django.db.models.deletion.SET_NULL, to="resources.inventory"
                    ),
                ),
            ],
            options={
                "verbose_name": "item",
                "verbose_name_plural": "items",
            },
        ),
    ]
