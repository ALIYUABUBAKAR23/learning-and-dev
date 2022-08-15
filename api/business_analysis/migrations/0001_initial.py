# Generated by Django 3.2.6 on 2022-08-15 12:26

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.IntegerField(db_index=True, primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(blank=True, max_length=200)),
                ('description', models.CharField(blank=True, max_length=200)),
                ('owner', models.CharField(blank=True, max_length=200)),
                ('actual_start_date', models.DateField(blank=True)),
                ('expected_start_date', models.DateField(blank=True)),
                ('actual_end_date', models.DateField(blank=True)),
                ('expected_end_date', models.DateField(blank=True)),
                ('estimated_cost', models.IntegerField(blank=True)),
                ('actual_cost', models.IntegerField(blank=True)),
                ('current_budget', models.IntegerField(blank=True)),
                ('location', models.CharField(blank=True, max_length=200)),
                ('project_lead', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Project',
                'verbose_name_plural': 'Projects',
            },
        ),
    ]
