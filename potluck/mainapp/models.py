from django.db import models

class Potluck(models.Model):
    name = models.CharField(max_length=64)
    date = models.DateTimeField()
    host = models.CharField(max_length=64, blank=True, null=True)
    def __str__(self):
        return self.name
    
class Item(models.Model):
    potluck = models.ForeignKey(Potluck, on_delete=models.CASCADE)
    item = models.CharField(max_length=64, blank=True, null=True)
    def __str__(self):
        return self.item