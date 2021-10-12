# Generated by Django 3.2.7 on 2021-10-12 06:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('firearm', '0003_alter_firearm_misc'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='firearm',
            name='Misc',
        ),
        migrations.AddField(
            model_name='firearm',
            name='Weapon_Model',
            field=models.CharField(default='-', max_length=50),
        ),
        migrations.AddField(
            model_name='firearm',
            name='status',
            field=models.TextField(default='-'),
        ),
        migrations.AlterField(
            model_name='firearm',
            name='Affiliated_Unit',
            field=models.TextField(default='-'),
        ),
        migrations.AlterField(
            model_name='firearm',
            name='Owner',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='firearm',
            name='SerialNumber',
            field=models.CharField(default='-', max_length=50),
        ),
        migrations.AlterField(
            model_name='firearm',
            name='UpdateReason',
            field=models.TextField(default='-'),
        ),
        migrations.AlterField(
            model_name='firearm',
            name='opType',
            field=models.TextField(),
        ),
    ]
