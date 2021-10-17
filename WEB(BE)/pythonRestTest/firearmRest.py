import requests, json

URL = 'http://localhost:9090'
headers = {'User-agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36'}
#요청 헤더 부분 크게 의미없음 

def query(serialNumber): # 총기 번호를 이용해 총기 트랜젝션 조회 

    url =f'{URL}/query/{serialNumber}' 
    print(url)
    res = requests.get(url, headers=headers)
    #실제 요청을 시도하는 부분
    return res.json()
    #요청에대한 응답을 출력하는 부분 

def createFirearm(serialNumber,model,owner,affiliatedUnit,status,updateReason): # 새 총기 등록

    url =f'{URL}/createFirearm/{serialNumber}/{model}/{owner}/{affiliatedUnit}/{status}/{updateReason}' 
    print(url)
    res = requests.get(url, headers=headers)
    #실제 요청을 시도하는 부분
    
    return query(serialNumber)

def checkoutFirearm(serialNumber,status,updateReason): # 총기 불출 

    url =f'{URL}/checkoutFirearm/{serialNumber}/{status}/{updateReason}' 
    print(url)
    res = requests.get(url, headers=headers)
    #실제 요청을 시도하는 부분

    return query(serialNumber)



def checkinFirearm(serialNumber,status,updateReason): # 총기 반납
    url =f'{URL}/checkinFirearm/{serialNumber}/{status}/{updateReason}' 
    print(url)
    res = requests.get(url, headers=headers)
    #실제 요청을 시도하는 부분

    return query(serialNumber)



def changeFirearmAttributes(serialNumber,model,owner,affiliatedUnit,status,updateReason): # 총기 속성 변경? 
    url =f'{URL}/changeFirearmAttributes/{serialNumber}/{model}/{owner}/{affiliatedUnit}/{status}/{updateReason}' 
    print(url)
    res = requests.get(url, headers=headers)
    #실제 요청을 시도하는 부분

    return query(serialNumber)


def deleteFirearm(serialNumber): # 총기 삭제
    url =f'{URL}/deleteFirearm/{serialNumber}' 
    print(url)
    res = requests.get(url, headers=headers)
    #실제 요청을 시도하는 부분

    return query(serialNumber)


def queryAllFirearms(): #모든 총기 조회
    url =f'{URL}/queryAllFirearms' 
    print(url)
    res = requests.get(url, headers=headers)
    #실제 요청을 시도하는 부분

    return res.json()
