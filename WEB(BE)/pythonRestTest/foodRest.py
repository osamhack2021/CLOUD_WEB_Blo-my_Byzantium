import requests, json

URL = 'http://localhost:9090'
headers = {'User-agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36'}
#요청 헤더 부분 크게 의미없음 
session = {}

def queryUnit(affiliatedUnit):

    url =f'{URL}/queryUnit/{affiliatedUnit}' 
    print(url)
    res = requests.get(url, headers=headers, cookies=session)
    #실제 요청을 시도하는 부분

    return res.json()
    #요청에대한 응답을 출력하는 부분 

def getUnitFoodHistory(affiliatedUnit, foodName):

    url =f'{URL}/queryUnit/{affiliatedUnit}' 
    print(url)
    res = requests.get(url, headers=headers, cookies=session)
    #실제 요청을 시도하는 부분

    return res.json()
    #요청에대한 응답을 출력하는 부분 

def createUnit(affiliatedUnit):
    url =f'{URL}/createUnit/{affiliatedUnit}' 
    print(url)
    res = requests.get(url, headers=headers, cookies=session)
    #실제 요청을 시도하는 부분

    return queryUnit(affiliatedUnit)

def checkinFood(affiliatedUnit,foodName,amount):
    url =f'{URL}/checkinFood/{affiliatedUnit}/{foodName}/{amount}' 
    print(url)
    res = requests.get(url, headers=headers, cookies=session)
    #실제 요청을 시도하는 부분

    return queryUnit(affiliatedUnit)

def checkoutFood(affiliatedUnit,foodName,amount):
    url =f'{URL}/checkoutFood/{affiliatedUnit}/{foodName}/{amount}' 
    print(url)
    res = requests.get(url, headers=headers, cookies=session)
    #실제 요청을 시도하는 부분

    return queryUnit(affiliatedUnit)

def GetUnitHistory(affiliatedUnit):
    url =f'{URL}/getUnitHistory/{affiliatedUnit}' 
    print(url)
    res = requests.get(url, headers=headers, cookies=session)
    #실제 요청을 시도하는 부분

    return res.json()
    #요청에대한 응답을 출력하는 부분 


def queryAllUnits():
    url =f'{URL}/queryAllUnits/' 
    print(url)
    res = requests.get(url, headers=headers, cookies=session)
    #실제 요청을 시도하는 부분
    return res.json()
    #요청에대한 응답을 출력하는 부분 