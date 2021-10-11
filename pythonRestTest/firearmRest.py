import requests, json

URL = 'https://osamhack2021-cloud-web-blo-my-byzantium-7v7qrp7g6hwxwp-9090.githubpreview.dev'

headers = {'User-agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36'}
#요청 헤더 부분 크게 의미없음 

session = {'__Host-vso-pf':'869A9F20333EF8A646054672D7CFB5CF%3APxvf1szAGPcvvpTW%2FoiuJgcyT0LUx7yR5suFJe%2FZ1PsHSQOEYym8nRrC1S73pzFSloHnYGt2A7jy3aGan7pw%2BOvFfPAOCVcRjB5PIlNEBbs5H6jjK6CyUJAgiFhf0nmC6p%2BeXEnBPz2jZf6gdLSoR94vZRyxe1so%2FxwRjOdRQqUYGVltRXIGZZIDrLd3QPpP0jlIjtfCfSkBWSpGaAsOMIQ6zHmcxj7Nou7VvUAap8BTu4%2Bri9KJGI6uL%2FNn%2FhTELUK9tWIGvIIdKBPZZklrkpD2eWC8JgbaWYIhTOMsCCvD5ee8csF%2BIvZ9Y8lFbfxE6uxptnTt%2BEdkaPpfl75dyr8JJkEd7nI53Ezv4AF%2FOCDf71a7uqX2%2B6JbBuwV14PE2s9SJi3a6vL2XFlncJ6wMNk8ha9WRwYtYUiwcxdCbkb9ZCvEcc9z3HzlqLR2PghUZ%2B0EOREfocmfSyiuDsl%2FiY0rWKJzVpK%2FSVo%2BOXXmZIG3sajplovk6kr81IOTkxGjWWMjb5dvmk%2FOjTf47rOBY6qkm5eKJikbBzTaPjgvk2xrXVfoITSc43JbnVIjoQEaai%2FLAKVYQggZIM9HnoMS6nis4X9NfizvkvinNyXAYVycwZigEGGkAqYlN16r9sX9L8hlM5MbGgiYCNlYHodiL%2B3p6V%2BfeYfHVT5%2BQOGrqSPjI3s5aa8vDNPPbzx8Ag6BbkA3mN2cDsBOT%2Fk4eIfXF3s9ErZEa1Xkafrfl%2FrApYybeE19bI%2F6FMCHOpOUZ2oMi3hB6tOCTDJbYtgNi%2FbcNAyD4IeBfDSlPY9g6BSolE%2BrkG%2Fawjyuzy0AsWVCKPNBli1AeoHKyLqSky6qMBKs988xvs0g2gO3utC32iPZhOL%2B8VrET8%2FSc9yvr%2F%2FyUWr%2Fp7bPI9wQxE18Y0Im64yTuQtwTyTWN%2FndH4WoEsv2VDSv76ZWuNifV89c9xQhIPM5yLsLa8WYrvUpV0DrwKcgxocQLSyPNINtZ75BKuZxbJ11YboBO4FbSZpl9UhHTFxYs7IBfButo17egmjhgkPCxq0TIXD0KdKQy0iovCdsJSIH%2BmCAzFkWz8%2FcjwPQklCeVUvjGUIJ5u%2F9Z%2FACYj1aQUrce1eYr3NtOKKLmjTYyO76qRFSFqZQiy80RUuZZwRMNcEpUOnll%2BTPyN1UScCND1ah90w90q4uQZemkLPmqsuIkAm7OrHMWstuULzH1MEH7%2FybKdSIHkRFNLKrpJw6RGtbqnrS22uUAeSZzpaDIESQZmgc0HE19QskUZL%2FglXzCrRZAPMpwDxq4n2838IhB%2BO6G6RWWO8vtTKqKZHP59kp8FwP%2B1vCGAo68pUdHEpUCCR7SFLCQ6UsAClF%2BALNrHNfWed399%2F7bgcXvuLitoKoQpydzLg1VA5zH91OrHfwr22%2BxnjaXqob857QU6cCBqa2TStrhKThhRVInDYG4VcyZ1GBao46Wy2zPLvmJIb4ZI1YRHg%2F9WvrcOI5yIjuqZaSe%2FpKltr3OwRXLT%2BPm08LE4uOpfGhHh3vyTjdB9wmll5h2%2FjP1qvMHYuboGvGadWfUVnWf0LSBek2musY3XBim7W1ZjA2o%2F%2Bvi92T1GuheMAMWA8KdPkSpZp8nyBTWpat00DbEbPAlMl64JtIgabAYIrrsfshNc3ifR9HjjxizinifNFtCHQYuCoZyJHEBQpdms3686OHooEhzCjuvYwws1Oib6kyEb91EgoaSx%2Fg7WxBg1FVQODnZepXDGDd39VVVPrMoY1uWHuCyukJFNfEbiUrWa%2FCxRSqzULGmiqdnoOTOW9XIOVmHK8m75XwKq62Z3na%2BNbNXq7XlrGJCbm%2F9Y4j%2BwgDzuXknlljVBUXlvT9V5IVk5wCqXAw5Y%2FvBGp0DXoXsV00vuOOoD82InDG1LRP5yoIgY6AWjhsyWtDv8LSCnTFij9D4CZxrINJyqcLFEJFQgHGCsHn3s%2FvGumJM%2B6pVWwuEMZI60WYaYhSDKAMCSNEibNzjChg6NeuIIv39qOEcJ4XI0VxoAcaIQgztymRXNfEwNlLHeGvseSjlx6rci%2B4ebGozBZY%2BtIejmguzU9344ODjf9%2BVjZ3QOE0ZHdUIxLwQPey7fi8Aea8rspiLG5Q3ZHElRsP7wMqHn8RjVXILXAh7K%2BVzU0jNi%2Fc%2BlDORVyPwg04PSdR14usixAu6fQj5SGjcAXLkzaK8RJ1%2FbS19mdcqFH%2Fm37x7hkh8xtJGZAnsHWE03pYxRFICv%2Frm8mPcJok8OzI50Sgs12CfcLEw9INDLiaHFDSiMsRlBzAzI2KNVm7zmaslu5PyPDq0FD9HPZWHMcdd4qlIPmb4TJdOJ8aoAlqme2EQdY%3D'}
#codespace상에서의 오류로 인해 어쩔수 없이 추가한 부분 실제 서버 구동시 필요없는 부분 

def query(serialNumber):

    url =f'{URL}/query/{serialNumber}' 
    print(url)
    res = requests.get(url, headers=headers, cookies=session)
    #실제 요청을 시도하는 부분

    return json.loads(res.text[1:-1])
    #요청에대한 응답을 출력하는 부분 

def createFirearm(serialNumber,model,owner,affiliatedUnit,status,updateReason):

    url =f'{URL}/createFirearm/{serialNumber}/{model}/{owner}/{affiliatedUnit}/{status}/{updateReason}' 
    print(url)
    res = requests.get(url, headers=headers, cookies=session)
    #실제 요청을 시도하는 부분
    
    return query(serialNumber)

def checkoutFirearm(serialNumber,status,updateReason):

    url =f'{URL}/checkoutFirearm/{serialNumber}/{status}/{updateReason}' 
    print(url)
    res = requests.get(url, headers=headers, cookies=session)
    #실제 요청을 시도하는 부분

    return query(serialNumber)



def checkinFirearm(serialNumber,status,updateReason):
    url =f'{URL}/checkinFirearm/{serialNumber}/{status}/{updateReason}' 
    print(url)
    res = requests.get(url, headers=headers, cookies=session)
    #실제 요청을 시도하는 부분

    return query(serialNumber)



def changeFirearmAttributes(serialNumber,model,owner,affiliatedUnit,status,updateReason):
    url =f'{URL}/changeFirearmAttributes/{serialNumber}/{model}/{owner}/{affiliatedUnit}/{status}/{updateReason}' 
    print(url)
    res = requests.get(url, headers=headers, cookies=session)
    #실제 요청을 시도하는 부분

    return query(serialNumber)


def deleteFirearm(serialNumber):
    url =f'{URL}/deleteFirearm/{serialNumber}' 
    print(url)
    res = requests.get(url, headers=headers, cookies=session)
    #실제 요청을 시도하는 부분

    return query(serialNumber)


def queryAllFirearms():
    url =f'{URL}/queryAllFirearms' 
    print(url)
    res = requests.get(url, headers=headers, cookies=session)
    #실제 요청을 시도하는 부분

    return res.json()