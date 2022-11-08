from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('potlucks', views.PotlucksView, name='potlucks'),
    path('create', views.CreatePotluckView, name='create_potluck'),
    path('addrecord', views.addrecord, name='addrecord'),
]
