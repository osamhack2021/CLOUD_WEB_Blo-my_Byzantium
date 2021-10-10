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


API_URL = "https://osamhack2021-cloud-web-blo-my-byzantium-q96vvq5p24w9x-9090.githubpreview.dev" 

#fabric의 로컬 API의 URL이므로, 매 환경마다 변경해야합니다
username = 'beomsun0829'
token = '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'



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
def seeFireArmAssetWithSerialNum(request,SerialNum):                #내부데이터용
    if request.method == 'GET':
        query_set = Firearm.objects.filter(SerialNumber = SerialNum)
        serializer = ModelSerializer(query_set, many=True)
        return response_allow_header(JsonResponse(serializer.data, safe=False))


    

@csrf_exempt
def querySerialNumber(request,SerialNum):
    if request.method == 'GET':
        params = {'param1' : '/query/','param2' : str(SerialNum)}
        se = requests.Session()
        req = se.get(API_URL, params = params)



        print("\nlog : " + str(req.headers) + "\n")
        return response_allow_header(JsonResponse(req, safe=False))




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
def approve(request):

    
@csrf_exempt
def seeFireArmAssetWithOwn(request):

"""



def response_allow_header(jsonrequest):                                 #강제 CORS 헤더 허용
    jsonrequest["Access-Control-Allow-Origin"] = '*'
    return jsonrequest