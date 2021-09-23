#views.py
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Account
from .serializers import AccountSerializer
from rest_framework.parsers import JSONParser





@csrf_exempt
def account_list(request):
    if request.method == 'GET':
        query_set = Account.objects.all()
        serializer = AccountSerializer(query_set, many=True)

        #response = JsonResponse(serializer.data, safe=False)
        #response_allow_header(response)

        return response_allow_header(JsonResponse(serializer.data, safe=False))
        
        
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = AccountSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return response_allow_header(JsonResponse(serializer.data, status=201))
        return response_allow_header(JsonResponse(serializer.errors, status=400))



@csrf_exempt
def account(request, pk):
    
    obj = Account.objects.get(pk=pk)

    if request.method == 'GET':
        serializer = AccountSerializer(obj)
        return response_allow_header(JsonResponse(serializer.data, safe=False))

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = AccountSerializer(obj, data=data)
        if serializer.is_valid():
            serializer.save()
            return response_allow_header(JsonResponse(serializer.data, status=201))
        return response_allow_header(JsonResponse(serializer.errors, status=400))

    elif request.method == 'DELETE':
        obj.delete()
        return response_allow_header(HttpResponse(status=204))



@csrf_exempt
def login(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        search_military_id = data['military_id']
        obj = Account.objects.get(military_id = search_military_id)

        if data['password'] == obj.password:
            return response_allow_header(HttpResponse(status=200))
        else:
            return response_allow_header(HttpResponse(status=400))






def response_allow_header(jsonrequest):                                 #강제 CORS 헤더 허용
    jsonrequest["Access-Control-Allow-Origin"] = '*'
    return jsonrequest