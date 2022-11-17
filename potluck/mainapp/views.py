from django.http import HttpResponse, HttpResponseRedirect, Http404
from django.shortcuts import render
from django.template import loader
from django.urls import reverse
from django.views import generic

# imports the potluck models to query from
# from .models import Potlucks
from .models import Potluck, Item

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

def PotluckView(request, potluck_id):
    try:
        potluck=Potluck.objects.get(pk=potluck_id)
    except Potluck.DoesNotExist:
        raise Http404("Potluck does not exist.")

    try:
        items=Item.objects.filter(potluck__pk = potluck_id)
    except Item.DoesNotExist:
        raise Http404("No items found")
    template = loader.get_template("pots/potluck.html")
    context={
        'potluck': potluck,
        'items': items,
    }
    return HttpResponse(template.render(context, request))

def addrecord(request):
    x = request.POST['name']
    y = request.POST['date']
    z = request.POST['host']
    potluck = Potluck(name=x, date=y, host=z)
    potluck.save()

    #iterate through foods
    items = request.POST.dict()
    item_arr = []
    for key, value in items.items():
        if key.startswith('food'):
            item_arr.append(value)

    for food in item_arr:
        item = Item(potluck=potluck, item=food)
        item.save()
        
    return HttpResponseRedirect(reverse('mainapp:potlucks'))

def item_sign_up(request, potluck_id):

    people = request.POST.copy()

    items = Item.objects.filter(potluck__pk = potluck_id)                                   

    for it in items:
        try:
            p = people.pop(it.item)
            it.contributor = p[0]
            it.contributor_email = p[1]
            it.save()
        except KeyError:
            pass

    return HttpResponseRedirect(reverse('mainapp:potluck', args=(potluck_id,)))