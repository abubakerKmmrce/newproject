# Generated by Django 4.0.4 on 2022-05-18 12:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0002_image_delete_doc'),
    ]

    operations = [
        migrations.CreateModel(
            name='Doc',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('upload', models.ImageField(upload_to='uploadedimages/')),
            ],
        ),
        migrations.DeleteModel(
            name='Image',
        ),
    ]
