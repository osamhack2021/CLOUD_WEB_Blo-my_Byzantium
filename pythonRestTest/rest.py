import requests, json

URL = 'https://osamhack2021-cloud-web-blo-my-byzantium-7v7qrp7g6hwxwp-9090.githubpreview.dev'

headers = {'User-agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36'}
#요청 헤더 부분 크게 의미없음 

session = {'__Host-vso-pf':'BB00CC006139048AEAD0002008E56148%3Aij9IE0vxTFNP%2FgThp1dMS%2B5QoRV27Zwigi7fWRzjipb6iTmamCK8bvz2PTzSgk75omfakTI%2FkkjRZykMlte45cvvrIfWWch9W7bR1bO4un7ncx4fOzbv9dwOUNoWU0S%2BYKcSUDoHg1vMjFW4IDaQF2N9j4HMVQ2XCJnOaKJ%2Bun%2FmiYzjqDaFUaKUNxI%2FFtmIxFPYo%2B2qgVbwR8rpXrjTILwJTp0xU9kT6MVQph5ibg1LbPU7Wk1%2F2v7x6qlTZp%2FoSpSdo2S4b7ndDpG7fHspc4h8nzRCa4lsTg3MecRcMJ7ISCg7rB9M5dK8xgK61rL1Oi5KShFZmQgtV%2Fymonbg0ffW6TTJ5VuHO9lY0I2kVUC%2BUwj0M1ClZJYCKRi4%2F8f0nj1Mqo%2BYB3STqUZY%2FH5V048KoCvTkvm8Qk%2FxA5d6GSVyrcHdGYkPiyZP57pHNAZ4XRIFZJWSnh62%2FEgIxX1k5pFheBNclZ8MrIVD%2B3by5cyqhRVHQEkPVDkm%2BNv5m0KIWrAm7irBReZhsTEqZ4WI3jdEn1i0XDvYpcQ5XzlTYmZzySubVCoX%2F6vbKjNJccFFrslnUbVLHIXtxuOq5OmpuV0wHfzD9RbFG7y%2B1%2BNHtx1jzoCvudihWir4WobiKjVfOkopSgge5thL9IsoBKspsnxdzoDVHPAhPDJBWKGxEmq0ZStUc3RlmNfgpUGtkPnOR%2FEVvOx9ihzuTEaQ5mwBU7swmWX8bSz41j6vFvWer5YJOSUAHU1sRRKke5pLwgTUbdyWjrqWboaIC9DeRt%2BlG04p%2Bb2Iw%2BQxLUBDIG5%2BtURAUKL5vWRYVyIYVEa0u%2FqGpfeDzIZIkOmC3cEbAbmlf484ggspDTGu%2BoB6O0cO7JOk%2FKfT3M7tcsWhC6rZzOMhEScTZLJAy9khkZgrwLun%2B6mYAdmGya2gkgvWkbncnfHzjOtYuBwxFAWleI%2BukcTzBNEjGihCFu%2Fkqr%2FQ17rzFB1FEMdHGcSNFPCOCnEbyav4OZ3q5NxccGfUIvJ6OtbK9BfRtMFv3rV%2FSMurQ1er2Msp3lgFXImX46qz4jiNHqVkvpqwpUKiicdn5%2FNWRWJ3xZRN52UBZLDZkZgVscC9k2alrwlpBkqI2CSCL%2FgIj6xb8ByNBXqThL8zwJBBqHvw8Fc1KK5WgaOkENm%2B6%2BxTw1K2GKJhHx1LB16AQxrIyzD6M%2FTa%2BuVU1ghNHAwIoskSAZbAQtJoXvT1obQwRP8one4BNpytUW3FlCDxRwmXkex24x9XXJqpvoH%2FDnt2w215ZrApk2SrxtTGIzbYEY1UgEdX2xUYSP9QND4CEPY3OOt5z3shjefgjFYTgEUkrOBz4LqTuQgz4F6J3T8p1PfsPWsFiJ8XrXh%2FoWFF%2F4uiw32E18B3UStgQ67yllju5%2BlwxtjbuRVuE4%2FNOJGr7yu4uK%2FUBFF03HKstxs8%2F60ohNKzPQZfmyakpyIxSeDdPS%2FyOBN%2BjH0X8vO8j1WsB%2B8PJRmm1%2BsuLdDmt8D3WvNoOM5ElJhcpPlNJaij1LwA1GFz6e%2BOgb7lu51TqOw762FMUlkBZ89Jyh2Jf0aQNbbzXm7qgXyJknmOofzvM%2FLYjcoZ%2FmTv5MHGnYt%2FpadeRPBqe%2BIP5YHHHSLMp4pJ%2FX7CHL%2BxezwDZDogNY5gCU%2BJ17jp7mukj%2Bh734VYig96cDWRsa2W1%2BhKaLG%2BA8d%2Bo4i4sOX2PTXBxiS1a0gH7oZ0k5PK%2FoR5VkmHJsaWhFyf27Sk0bLlZJaJUI8VkxPrBnO00JPaE%2FEcWK36MqM5ijy4fjR6xq%2Bjyc6bMhyXA5bQis98AX3FJrZMenz3vfNHT6hap%2FzEe8PVsIoWEwFvGrfpmWIAcWNVDbIIs0SLJsGbNfVTOplEdGiO2bXkWfiPxi1zt78zWwuBNdh1isWBs9V%2BQIt5fmYlT%2FSxn4T2YbXbNaWGG64teOhgDWk2%2B7Ks7gOnd0kSRlAPl%2FzElXlxiYAfX0qqU7GikLWVyyNig3Jssm7jdlre9TntSqauagzt4YThjvQbvqKLJAqhotPcoJ53nCoVBoS2%2F%2BZQVkyJXj5KXuE4%2B4hKPP2%2BLzHrNzGHESTJ0WANO6XNxufXrLJAyPDRo%2BBA%2Fov1PPIHnIOba75JNYXWp9aVBr7gEenIQbPnEZVQ%2FpFkCZdxoHdkH0egUdMIcz2fWH6PL6Jdj2S0QcnvGW%2FhbRlOot%2BxBD7QNAH3YCeFsg12Kl%2BEzV72%2F3lIPYfXHd%2BTj%2FTq%2FB4W%2FEd8fA3igZ9W7Xbneym7%2BeJ3yN8F4kaZOUs4jh2ko6qZWwcs2Yj4QuIgS2%2FGZ3SGGn6jtdWYNRi0jfsbCM3Ij5an1V1lfKNtYPw%3D'}
#codespace상에서의 오류로 인해 어쩔수 없이 추가한 부분 실제 서버 구동시 필요없는 부분 

def query(serialNumber):

    url =f'{URL}/query/{serialNumber}' 
    print(url)
    res = requests.get(url, headers=headers, cookies=session)
    #실제 요청을 시도하는 부분

    return json.loads(res.text[1:-1])
    #요청에대한 응답을 출력하는 부분 

def createFirearm(serialNumber,model,owner,affiliatedUnit,status,updateReason):

    url =f'{URL}/{serialNumber}/{model}/{owner}/{affiliatedUnit}/{status}/{updateReason}' 
    print(url)
    res = requests.get(url, headers=headers, cookies=session)
    #실제 요청을 시도하는 부분
    
    return query(serialNumber)

def checkoutFirearm(serialNumber,status,updateReason):

    url =f'{URL}/{serialNumber}/{status}/{updateReason}' 
    print(url)
    res = requests.get(url, headers=headers, cookies=session)
    #실제 요청을 시도하는 부분

    return query(serialNumber)



def checkinFirearm(serialNumber,status,updateReason):
    url =f'{URL}/{serialNumber}/{status}/{updateReason}' 
    print(url)
    res = requests.get(url, headers=headers, cookies=session)
    #실제 요청을 시도하는 부분

    return query(serialNumber)



def changeFirearmAttributes(serialNumber,model,owner,affiliatedUnit,status,updateReason):
    url =f'{URL}/{serialNumber}/{model}/{owner}/{affiliatedUnit}/{status}/{updateReason}' 
    print(url)
    res = requests.get(url, headers=headers, cookies=session)
    #실제 요청을 시도하는 부분

    return query(serialNumber)


def deleteFirearm(serialNumber):
    url =f'{URL}/{serialNumber}' 
    print(url)
    res = requests.get(url, headers=headers, cookies=session)
    #실제 요청을 시도하는 부분

    return query(serialNumber)

