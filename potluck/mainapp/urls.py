from django.urls import path
from . import views

app_name='mainapp'
urlpatterns = [
    path('', views.index, name='index'),
    path('potlucks', views.PotlucksView, name='potlucks'),
    path('potluck/<int:potluck_id>', views.PotluckView, name='potluck'),
    path('create', views.CreatePotluckView, name='create_potluck'),
    path('addrecord', views.addrecord, name='addrecord'),
    path('item_sign_up/<int:potluck_id>', views.item_sign_up, name='item_sign_up'),
    path('calendar', views.calendar, name='calendar'),
    path('all_events', views.all_events, name='all_events'),
]