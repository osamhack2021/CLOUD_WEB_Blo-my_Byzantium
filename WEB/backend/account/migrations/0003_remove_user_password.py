# Generated by Django 3.2.7 on 2021-10-02 01:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0002_auto_20210925_0015'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='password',
        ),
    ]
