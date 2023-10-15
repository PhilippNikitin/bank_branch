# Generated by Django 4.2.5 on 2023-10-08 19:56

from django.db import migrations, models
import search.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Bank',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=256)),
                ('address', models.TextField()),
                ('latitude', models.CharField(max_length=25)),
                ('longitude', models.CharField(max_length=25)),
                ('work_schedule', models.JSONField(default=search.models.shedule)),
                ('services', models.JSONField(default=search.models.mock_services)),
            ],
        ),
    ]
