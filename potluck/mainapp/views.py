from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.template import loader
from django.urls import reverse
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
    mypotlucks = Potluck.objects.all().values()
    template = loader.get_template("pots/potlucks.html")
    context = {
        'mypotlucks': mypotlucks,
    }
    return HttpResponse(template.render(context, request))

# for creating a potluck
def CreatePotluckView(request):
    potluck_list = Potluck.objects
    template_name = "pots/create_potluck.html"
    return render(request, template_name, {})

def addrecord(request):
    x = request.POST['name']
    y = request.POST['date']
    potluck = Potluck(name=x, date=y)
    potluck.save()
    return HttpResponseRedirect(reverse('potlucks'))