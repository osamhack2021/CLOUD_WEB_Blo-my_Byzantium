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
def showalldata(request):                                       #백엔드 쌓인 데이터 전체 출력
    if request.method == 'GET':
        query_set = Firearm.objects.all()
        serializer = ModelSerializer(query_set, many=True)
        return response_allow_header(JsonResponse(serializer.data, safe=False))


@csrf_exempt
def queryAllFirearms(request):                                       #하이퍼레저에 전체 데이터 출력
    if request.method == 'GET':
        REQUEST_URL = API_URL + 'queryAllFirearms'
        response = requests.get(REQUEST_URL).json()
        return response_allow_header(JsonResponse(response, safe=False))



@csrf_exempt
def createFirearm(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = createFirearmSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return response_allow_header(JsonResponse(serializer.data, status=201))
        return response_allow_header(JsonResponse(serializer.errors, status=400))

@csrf_exempt
def checkoutFirearm(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = checkoutFirearmSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return response_allow_header(JsonResponse(serializer.data, status=201))
        return response_allow_header(JsonResponse(serializer.errors, status=400))

@csrf_exempt
def checkinFirearm(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = checkinFirearmSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return response_allow_header(JsonResponse(serializer.data, status=201))
        return response_allow_header(JsonResponse(serializer.errors, status=400))

@csrf_exempt
def changeFirearmAttributes(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = changeFirearmAttributesSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return response_allow_header(JsonResponse(serializer.data, status=201))
        return response_allow_header(JsonResponse(serializer.errors, status=400))

@csrf_exempt
def deleteFirearm(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = deleteFirearmSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return response_allow_header(JsonResponse(serializer.data, status=201))
        return response_allow_header(JsonResponse(serializer.errors, status=400))



@csrf_exempt
def seeFireArmAssetWithSerialNum(request,SerialNum):                            # 백엔드 내부데이터용
    if request.method == 'GET':
        query_set = Firearm.objects.filter(SerialNumber = SerialNum)
        serializer = ModelSerializer(query_set, many=True)
        return response_allow_header(JsonResponse(serializer.data, safe=False))



@csrf_exempt
def approve(request):
    if request.method == 'GET':
        query_set = Firearm.objects.all()
        serializer = ModelSerializer(query_set, many=True)

        if not serializer.data :
            return response_allow_header(JsonResponse({'opType' : 'Error: No Data in database'}, safe=False))

        elif serializer.data[0]["opType"] == "createFirearm":                    #데이터 생성 api
            REQUEST_URL = API_URL + "createFirearm/" + serializer.data[0]["SerialNumber"] + "/" + \
            serializer.data[0]["Weapon_Model"] + "/" + serializer.data[0]["Owner"] + "/" + serializer.data[0]["Affiliated_Unit"] + "/" + \
            serializer.data[0]["status"] + "/" + serializer.data[0]["UpdateReason"]

            requests.get(REQUEST_URL)
            Firearm.objects.first().delete()
            return response_allow_header(JsonResponse({'opType' : 'createdata'}, safe=False))
            

        
        elif serializer.data[0]["opType"] == "checkoutFirearm":                    #총기불출 api
            REQUEST_URL = API_URL + "checkoutFirearm/" + serializer.data[0]["SerialNumber"] + "/" + \
            serializer.data[0]["status"] + "/" + serializer.data[0]["UpdateReason"]

            requests.get(REQUEST_URL)
            Firearm.objects.first().delete()
            return response_allow_header(JsonResponse({'opType' : 'checkoutFirearm'}, safe=False))


        elif serializer.data[0]["opType"] == "checkinFirearm":                    #총기반납 api
            REQUEST_URL = API_URL + "checkinFirearm/" + serializer.data[0]["SerialNumber"] + "/" + \
            serializer.data[0]["status"] + "/" + serializer.data[0]["UpdateReason"]

            requests.get(REQUEST_URL)
            Firearm.objects.first().delete()
            return response_allow_header(JsonResponse({'opType' : 'checkinFirearm'}, safe=False))


        elif serializer.data[0]["opType"] == "changeFirearmAttributes":                    #데이터 변경 api
            REQUEST_URL = API_URL + "changeFirearmAttributes/" + serializer.data[0]["SerialNumber"] + "/" + \
            serializer.data[0]["Weapon_Model"] + "/" + serializer.data[0]["Owner"] + "/" + serializer.data[0]["Affiliated_Unit"] + "/" + \
            serializer.data[0]["status"] + "/" + serializer.data[0]["UpdateReason"]

            requests.get(REQUEST_URL)
            Firearm.objects.first().delete()
            return response_allow_header(JsonResponse({'opType' : 'changeFirearmAttributes'}, safe=False))
        

        elif serializer.data[0]["opType"] == "deleteFirearm":                    #데이터 변경 api
            REQUEST_URL = API_URL + "deleteFirearm/" + serializer.data[0]["SerialNumber"]

            requests.get(REQUEST_URL)
            Firearm.objects.first().delete()
            return response_allow_header(JsonResponse({'opType' : 'deleteFirearm'}, safe=False))


        else:
            return response_allow_header(JsonResponse({'opType' : 'Error: opType Error'}, safe=False))

        return response_allow_header(JsonResponse(serializer.data[0], safe=False))


    

@csrf_exempt
def querySerialNumber(request,SerialNum):
    if request.method == 'GET':
        REQUEST_URL = API_URL + "query/" + str(SerialNum)
        req = requests.get(REQUEST_URL)
        return response_allow_header(JsonResponse(req.json(), safe=False))








def response_allow_header(jsonrequest):                                 #강제 CORS 헤더 허용
    jsonrequest["Access-Control-Allow-Origin"] = '*'
    return jsonrequest
