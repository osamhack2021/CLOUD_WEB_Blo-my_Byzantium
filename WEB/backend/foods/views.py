#views.py

from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import urllib.request
import requests
import json
from lxml import html
from rest_framework import serializers
from .models import Foods
from .serializers import *
from rest_framework.parsers import JSONParser



API_URL = "http://localhost:9090/" 





@csrf_exempt

def showalldata(request):                                       #백엔드 큐에 쌓인 데이터 전체 출력
    if request.method == 'GET':
        query_set = Foods.objects.all()
        serializer = ModelSerializer(query_set, many=True)
        return response_allow_header(JsonResponse(serializer.data, safe=False))


@csrf_exempt
def queryAllUnits(request):                                       #하이퍼레저에 있는 전체 데이터 출력
    if request.method == 'GET':
        REQUEST_URL = API_URL + 'queryAllUnits'
        req = str(requests.get(REQUEST_URL).text)
        req = req.replace('queryAllUnitsTransaction has been submitted','')
        req = req.replace(' result: ','')
        req = json.loads(req)
        return response_allow_header(JsonResponse(req, safe=False))


@csrf_exempt
def queryUnit(request,search_unit):                                #하이퍼레저에 있는 특정부대 현황 조회
    if request.method == 'GET':
        REQUEST_URL = API_URL + "queryUnit/" + str(search_unit)
        req = requests.get(REQUEST_URL)
        return response_allow_header(JsonResponse(req.json(), safe=False))

        
@csrf_exempt
def GetUnitHistory(request,search_unit):                                #하이퍼레저에 있는 특정부대 과거 내역 조회
    if request.method == 'GET':
        REQUEST_URL = API_URL + "queryUnit/" + str(search_unit)
        req = requests.get(REQUEST_URL)
        return response_allow_header(JsonResponse(req.json(), safe=False))


@csrf_exempt
def createUnit(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = AffiliatedUnitSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return response_allow_header(JsonResponse(serializer.data, status=201))
        return response_allow_header(JsonResponse(serializer.errors, status=400))

@csrf_exempt
def checkinFood(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = ModelSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return response_allow_header(JsonResponse(serializer.data, status=201))
        return response_allow_header(JsonResponse(serializer.errors, status=400))

@csrf_exempt
def checkoutFood(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = ModelSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return response_allow_header(JsonResponse(serializer.data, status=201))
        return response_allow_header(JsonResponse(serializer.errors, status=400))

    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = AffiliatedUnitSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return response_allow_header(JsonResponse(serializer.data, status=201))
        return response_allow_header(JsonResponse(serializer.errors, status=400))






@csrf_exempt
def approve(request):
    if request.method == 'GET':
        query_set = Foods.objects.all()
        serializer = ModelSerializer(query_set, many=True)

        if not serializer.data :
            return response_allow_header(JsonResponse({'opType' : 'Error: No Data in database'}, safe=False))

        elif serializer.data[0]["opType"] == "createUnit":                    # 부대 생성 api
            REQUEST_URL = API_URL + "createUnit/" + serializer.data[0]["Affiliated_Unit"]

            requests.get(REQUEST_URL)
            Foods.objects.first().delete()
            return response_allow_header(JsonResponse({'opType' : 'createUnit'}, safe=False))
            

        elif serializer.data[0]["opType"] == "checkinFood":                    #부식 반입 api
            REQUEST_URL = API_URL + "checkinFood/" + serializer.data[0]["Affiliated_Unit"]

            requests.get(REQUEST_URL)
            Foods.objects.first().delete()
            return response_allow_header(JsonResponse({'opType' : 'checkinFood'}, safe=False))

        
        elif serializer.data[0]["opType"] == "checkoutFood":                    #부식 불출 api
            REQUEST_URL = API_URL + "checkoutFood/" + serializer.data[0]["Affiliated_Unit"]

            requests.get(REQUEST_URL)
            Foods.objects.first().delete()
            return response_allow_header(JsonResponse({'opType' : 'checkoutFood'}, safe=False))


        else:
            return response_allow_header(JsonResponse({'opType' : 'Error: opType Error'}, safe=False))

        return response_allow_header(JsonResponse(serializer.data[0], safe=False))








def response_allow_header(jsonrequest):                                 #강제 CORS 헤더 허용
    jsonrequest["Access-Control-Allow-Origin"] = '*'
    return jsonrequest
