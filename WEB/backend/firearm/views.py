#views.py

from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import serializers
from .models import Firearm
from .serializers import *
from rest_framework.parsers import JSONParser




@csrf_exempt
def showalldata(request):
    if request.method == 'GET':
        query_set = Firearm.objects.all()
        serializer = ModelSerializer(query_set, many=True)
        return response_allow_header(JsonResponse(serializer.data, safe=False))




@csrf_exempt
def createdata(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = CreatedataSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return response_allow_header(JsonResponse(serializer.data, status=201))
        return response_allow_header(JsonResponse(serializer.errors, status=400))



@csrf_exempt
def seeFireArmAssetWithSerialNum(request,SerialNum):
    if request.method == 'GET':
        query_set = Firearm.objects.filter(SerialNumber = SerialNum)
        serializer = ModelSerializer(query_set, many=True)
        return response_allow_header(JsonResponse(serializer.data, safe=False))






"""

@csrf_exempt
def changeFirearmOwner(request,OwnerSearch):

@csrf_exempt
def changeMisc(request):



@csrf_exempt
def changeLocation(request):

    
@csrf_exempt
def approve(request):

    
@csrf_exempt
def seeFireArmAssetWithOwn(request):





"""



def response_allow_header(jsonrequest):                                 #강제 CORS 헤더 허용
    jsonrequest["Access-Control-Allow-Origin"] = '*'
    return jsonrequest