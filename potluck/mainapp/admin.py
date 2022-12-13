from django.contrib import admin

from .models import Potluck, Item, Profile

admin.site.register(Potluck)
admin.site.register(Item)
admin.site.register(Profile)