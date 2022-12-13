from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from datetime import datetime

DIETARY_NEEDS = (
    ('none','-- None --'),
    ('dairy','Dairy Free'),
    ('nuts','Nut Free'),
    ('gluten','Gluten Free'),
    ('vegetarian', 'Vegetarian'),
    ('vegan','Vegan'),
    ('kosher','Kosher'),
)

class Potluck(models.Model):
    name = models.CharField(max_length=64)
    start_date_time = models.DateTimeField(default=datetime.now)
    end_date_time = models.DateTimeField(default=datetime.now)
    host = models.CharField(max_length=64, blank=True, null=True)
    def __str__(self):
        return self.name
    
class Item(models.Model):
    potluck = models.ForeignKey(Potluck, on_delete=models.CASCADE)
    item = models.CharField(max_length=64, blank=True, null=True)
    contributor = models.CharField(max_length=64, blank=True, null=True)
    contributor_email = models.EmailField(max_length=64, blank=True, null=True)
    def __str__(self):
        return self.item
    
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    mobile_phone = models.CharField(max_length=12, blank=True, null=True)
    dietary_needs = models.CharField(max_length=12, choices=DIETARY_NEEDS, default='none')
    def __str__(self):
        return str(self.user.username)

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()