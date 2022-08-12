# Generated by Django 3.2.6 on 2022-08-12 08:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hr', '0001_initial'),
    ]

    operations = [
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
    ]
