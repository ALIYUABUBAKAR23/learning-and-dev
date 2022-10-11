# Generated by Django 3.2.6 on 2022-08-26 10:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("crm", "0001_initial"),
        ("business_analysis", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="project",
            name="starting_budget",
            field=models.FloatField(blank=True, default=0),
        ),
        migrations.AlterField(
            model_name="project",
            name="actual_cost",
            field=models.FloatField(blank=True),
        ),
        migrations.AlterField(
            model_name="project",
            name="current_budget",
            field=models.FloatField(blank=True),
        ),
        migrations.AlterField(
            model_name="project",
            name="description",
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name="project",
            name="estimated_cost",
            field=models.FloatField(blank=True),
        ),
        migrations.AlterField(
            model_name="project",
            name="owner",
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to="crm.customer"),
        ),
    ]
