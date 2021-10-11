#views.py

from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import urllib.request
import requests
import json
from lxml import html
from rest_framework import serializers
from .models import Firearm
from .serializers import *
from rest_framework.parsers import JSONParser


API_URL = "http://localhost:9090/" 




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
def seeFireArmAssetWithSerialNum(request,SerialNum):                            #내부데이터용
    if request.method == 'GET':
        query_set = Firearm.objects.filter(SerialNumber = SerialNum)
        serializer = ModelSerializer(query_set, many=True)
        return response_allow_header(JsonResponse(serializer.data, safe=False))



@csrf_exempt
def approve(request):
    if request.method == 'GET':
        query_set = Firearm.objects.all()
        serializer = ModelSerializer(query_set, many=True)

        if serializer.data[0]["opType"] == "createdata":                    #데이터 생성 api 호출
            REQUEST_URL = API_URL + "createFirearm/" + serializer.data[0]["SerialNumber"] + "/" + \
            "K2C" + "/" + serializer.data[0]["Owner"] + "/" + serializer.data[0]["Affiliated_Unit"] + "/" + \
            "현재상태" + "/" + serializer.data[0]["UpdateReason"]

            requests.get(REQUEST_URL)
            Firearm.objects.first().delete()

            return response_allow_header(JsonResponse({'opType' : 'createdata'}, safe=False))
            


        
        

        return response_allow_header(JsonResponse(serializer.data[0], safe=False))


    

@csrf_exempt
def querySerialNumber(request,SerialNum):
    if request.method == 'GET':
        REQUEST_URL = API_URL + "query/" + str(SerialNum)
        req = requests.get(REQUEST_URL)
        return response_allow_header(JsonResponse(req.json(), safe=False))




@csrf_exempt
def changeMisc(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = changeMiscSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return response_allow_header(JsonResponse(serializer.data, status=201))
        return response_allow_header(JsonResponse(serializer.errors, status=400))





@csrf_exempt
def changeLocation(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = changeLocationSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return response_allow_header(JsonResponse(serializer.data, status=201))
        return response_allow_header(JsonResponse(serializer.errors, status=400))





"""

@csrf_exempt
def changeFirearmOwner(request,OwnerSearch):
    

    
@csrf_exempt
def seeFireArmAssetWithOwn(request):

"""



def response_allow_header(jsonrequest):                                 #강제 CORS 헤더 허용
    jsonrequest["Access-Control-Allow-Origin"] = '*'
    return jsonrequest
