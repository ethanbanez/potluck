from django import forms

from django.contrib.auth.models import User
from .models import Profile

DIETARY_NEEDS = (
    ('dairy','Dairy Free'),
    ('nuts','Nut Free'),
    ('gluten','Gluten Free'),
    ('vegetarian', 'Vegetarian'),
    ('vegan','Vegan'),
    ('kosher','Kosher'),
)

# from https://dev.to/earthcomfy/django-update-user-profile-33ho
# creating a form
class EditProfileForm(forms.ModelForm):
    mobile_phone = forms.CharField(max_length=12)
    dietary_needs = forms.MultipleChoiceField(choices=DIETARY_NEEDS, widget=forms.CheckboxSelectMultiple())
    
    class Meta:
        model = Profile
        fields = ['mobile_phone', 'dietary_needs']
        
class EditUserForm(forms.ModelForm):
    username = forms.CharField(max_length=100,
                               required=True,
                               widget=forms.TextInput(attrs={'class': 'form-control', 'disabled':'true'}))
    email = forms.EmailField(required=True,
                             widget=forms.TextInput(attrs={'class': 'form-control'}))

    class Meta:
        model = User
        fields = ['username', 'email']
