# Generated by Django 3.2.6 on 2022-08-16 11:02

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
            name='Department',
            fields=[
                ('id', models.IntegerField(db_index=True, primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(blank=True, max_length=200, null=True)),
                ('description', models.CharField(blank=True, max_length=500, null=True)),
                ('head_of_department', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='head_of_department', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Department',
                'verbose_name_plural': 'Departments',
            },
        ),
        migrations.CreateModel(
            name='Location',
            fields=[
                ('id', models.IntegerField(db_index=True, primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(blank=True, max_length=200)),
                ('address', models.CharField(blank=True, max_length=200)),
                ('state', models.CharField(blank=True, max_length=200)),
            ],
            options={
                'verbose_name': 'Location',
                'verbose_name_plural': 'Locations',
            },
        ),
        migrations.CreateModel(
            name='Staff',
            fields=[
                ('id', models.IntegerField(db_index=True, primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('first_name', models.CharField(blank=True, max_length=200)),
                ('last_name', models.CharField(blank=True, max_length=200)),
                ('full_name', models.CharField(blank=True, max_length=200)),
                ('sex', models.CharField(blank=True, choices=[('Male', 'male'), ('Female', 'female')], max_length=10)),
                ('dob', models.DateField(blank=True)),
                ('state_of_origin', models.CharField(blank=True, choices=[('Abia', 'abia'), ('Adamawa', 'adamawa'), ('Akwa Ibom', 'akwa Ibom'), ('Anambra', 'anambra'), ('Bauchi', 'bauchi'), ('Bayelsa', 'bayelsa'), ('Benue', 'benue'), ('Borno', 'borno'), ('Cross River', 'cross river'), ('Delta', 'delta'), ('Ebonyi', 'ebonyi'), ('Edo', 'edo'), ('Ekiti', 'ekiti'), ('Enugu', 'enugu'), ('Gombe', 'gombe'), ('Imo', 'imo'), ('Jigawa', 'jigawa'), ('Kaduna', 'kaduna'), ('Kano', 'kano'), ('Katsina', 'katsina'), ('Kebbi', 'kebbi'), ('Kogi', 'kogi'), ('Kwara', 'kwara'), ('Lagos', 'lagos'), ('Nasarawa', 'nasarawa'), ('Niger', 'niger'), ('Ogun', 'ogun'), ('Ondo', 'ondo'), ('Osun', 'osun'), ('Oyo', 'oyo'), ('Plateau', 'plateau'), ('Rivers', 'rivers'), ('Sokoto', 'sokoto'), ('Taraba', 'taraba'), ('Yobe', 'yobe'), ('Zamfara', 'zamfara')], max_length=20)),
                ('address', models.CharField(blank=True, max_length=500)),
                ('phone_no', models.CharField(blank=True, max_length=14)),
                ('email', models.EmailField(blank=True, max_length=200)),
                ('twitter', models.CharField(blank=True, max_length=200, null=True)),
                ('instagram', models.CharField(blank=True, max_length=200, null=True)),
                ('linkedIn', models.CharField(blank=True, max_length=200, null=True)),
                ('staff_id', models.CharField(blank=True, max_length=200)),
                ('commencement_date', models.DateTimeField(blank=True, max_length=200)),
                ('salary', models.IntegerField(blank=True)),
                ('role', models.CharField(blank=True, max_length=200)),
                ('department', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='hr.department')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'staff',
                'verbose_name_plural': 'staff',
            },
        ),
        migrations.CreateModel(
            name='Contract',
            fields=[
                ('id', models.IntegerField(db_index=True, primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('contract_type', models.CharField(blank=True, max_length=200)),
                ('date_issued', models.DateField(blank=True)),
                ('contract_length', models.CharField(blank=True, max_length=200)),
                ('contract_details', models.CharField(blank=True, max_length=200)),
                ('contract_document', models.CharField(blank=True, max_length=200)),
                ('end_date', models.CharField(blank=True, max_length=200)),
                ('approved_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='approved_by', to=settings.AUTH_USER_MODEL)),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Contract',
                'verbose_name_plural': 'Contracts',
            },
        ),
    ]