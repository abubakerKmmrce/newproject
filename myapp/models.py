from django.db import models

# Create your models here.
from django.db import models
from taggit.managers import TaggableManager


class Doce(models.Model):
    upload = models.ImageField(upload_to='uploadedimages/')

    title = models.CharField(max_length=250)

    # description = models.TextField()
    # published = models.DateField(auto_now_add=True)
    # slug = models.SlugField(unique=True, max_length=100)
    # tags = TaggableManager()

    def __str__(self):
        return str(self.pk)
