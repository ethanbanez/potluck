from django.http import HttpResponse
from django.shortcuts import render
from django.views import generic

# imports the potluck models to query from
# from .models import Potlucks
from .models import Potluck

def index(request):
    """View function for home page of site."""

    # Render the HTML template index.html with the data in the context variable
    return render(request, 'index.html')

# should be a generic list view (generic.ListView)
# view of the potlucks
def PotlucksView(request):
    # filler template name but not a bad idea I think
    template_name = "pots/potlucks.html"
    return render(request, template_name, {})

# for creating a potluck
def CreatePotluckView(request):
    potlucks_list = Potluck.objects
    template_name = "pots/create_potluck.html"
    return render(request, template_name, {})
