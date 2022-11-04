from django.db import models

class Potluck(models.Model):
    name = models.CharField(max_length=200)
    date = models.DateTimeField('potluck date')
    def __str__(self):
        return self.name