from django.shortcuts import render, redirect
from django.views import View
from django.views.generic import TemplateView
from django.http import HttpResponse, JsonResponse
from .models import Doce
from django.views.generic.base import TemplateView
from django.shortcuts import render
from django.template.defaultfilters import slugify


# Create your views here.

class Home(TemplateView):
    template_name = 'upload.html'


def file_upload(request):
    if request.method == "POST":
        my_file = request.FILES.get('file')
        title = request.FILES.get('title')
        Doce.objects.create(upload=my_file, title=title)

        return HttpResponse('')


def media_view(request):
    # context = {}
    # context["images"] = Doc.objects.all()
    image = Doce.objects.all()
    context = {"images": image}

    return render(request, "media.html", context)

# def media_view(request):
#
#     return render(request, "media.html")

# class MyView(View):
#
#     def get(self, request):
#         # <view logic>
#         return HttpResponse('result')

# def my_view(request):
#     if request.method == 'GET':
#         # <view logic>
#         return HttpResponse('result')
