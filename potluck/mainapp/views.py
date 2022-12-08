#from json import JsonResponse

from django.http import HttpResponse, HttpResponseRedirect, Http404, JsonResponse
from django.shortcuts import render, redirect
from django.template import loader
from django.urls import reverse
from django.views import generic
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from datetime import timedelta, datetime
from .forms import EditProfileForm, EditUserForm

# imports the potluck models to query from
# from .models import Potlucks
from .models import Potluck, Item

def index(request):
    """View function for home page of site."""

    # Render the HTML template index.html with the data in the context variable
    return render(request, 'index.html')

# should be a generic list view (generic.ListView)
# view of the potlucks
@login_required
def PotlucksView(request):
    mypotlucks = Potluck.objects.all().values()
    template = loader.get_template("pots/potlucks.html")
    context = {
        'mypotlucks': mypotlucks,
    }
    return HttpResponse(template.render(context, request))

# for creating a potluck
@login_required
def CreatePotluckView(request):
    potluck_list = Potluck.objects
    template_name = "pots/create_potluck.html"
    return render(request, template_name, {})

@login_required
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
    y = request.POST['start_date']
    w = request.POST['end_date']
    z = request.POST['host']

    
    potluck = Potluck(name=x, start_date_time=y, end_date_time=w, host=z)
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

    people = request.POST.dict()

    items = Item.objects.filter(potluck__pk = potluck_id)                                   

    for it in items:
        try:
            p = people.pop(it.item)
            if p == 'on':
                it.contributor = request.user.first_name
                it.contributor_email = request.user.email
                it.save()
        except KeyError:
            pass

    return HttpResponseRedirect(reverse('mainapp:potluck', args=(potluck_id,)))

@login_required
def calendar(request):
    all_events = Potluck.objects.all()
    context = {
        "events":all_events,
    }
    return render(request,'calendar.html',context)

def all_events(request):                                                                                                 
    all_events = Potluck.objects.all()                                                                                    
    out = []                                                                                                             
    for event in all_events:                                                                                         
        out.append({                                                                                                     
            'title': event.name,
            'start': event.start_date_time.strftime("%m/%d/%Y, %H:%M:%S"),
            'end' : event.end_date_time.strftime("%m/%d/%Y, %H:%M:%S"),
            'host': event.host,      
            'id': Potluck.objects.filter(name=event.name).values('id')[0]['id'],                                                       
        })                                                                                                                                                                                                                         
    return JsonResponse(out, safe=False)

# Create your views here.
#def edit_profile(request):
#	context ={}
#	context['form']= EditProfileForm()
#	return render(request, "profile.html", context)

# adapted from https://dev.to/earthcomfy/django-update-user-profile-33ho
@login_required
def profile(request):
    if request.method == 'POST':
        user_form = EditUserForm(request.POST, instance=request.user)
        profile_form = EditProfileForm(request.POST, request.FILES, instance=request.user.profile)
        if user_form.is_valid() and profile_form.is_valid():
            user_form.save()
            profile_form.save()
            return HttpResponseRedirect(reverse('mainapp:index'))
    else:
        user_form = EditUserForm(instance=request.user)
        profile_form = EditProfileForm(instance=request.user.profile)

    return render(request, 'profile.html', {'user_form': user_form, 'profile_form': profile_form})