# Generated by Django 4.1.2 on 2022-12-01 21:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0006_remove_potluck_date_potluck_end_date_time_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='dietary_needs',
            field=models.CharField(choices=[('none', '-- None --'), ('dairy', 'Dairy Free'), ('nuts', 'Nut Free'), ('gluten', 'Gluten Free'), ('vegetarian', 'Vegetarian'), ('vegan', 'Vegan'), ('kosher', 'Kosher')], default='none', max_length=12),
        ),
        migrations.AddField(
            model_name='profile',
            name='mobile_phone',
            field=models.CharField(blank=True, max_length=12, null=True),
        ),
    ]
