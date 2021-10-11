import requests, json

URL = 'https://osamhack2021-cloud-web-blo-my-byzantium-7v7qrp7g6hwxwp-9090.githubpreview.dev'

headers = {'User-agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36'}
#요청 헤더 부분 크게 의미없음 

session = {'__Host-vso-pf':'087F38FB99C67813C636716B4101CF99%3AldAJ2EUtH5MV3fijNBrIYuD%2F1yV2ZPl4rOe0hoG5ecnnLGq9iHOutWYtkph5QY30q%2BwaAB75rggEzG8AGS760vfnJqoeaWTjHoYzs1rOim51XVyqGzkWgsxptqSMsngBtJH0ZwURv5M3NtUOw0BOqDCFGUaYoFp9A8JxWC3sMCu1EkzrVxeUMYG667RA499RD%2BSQeXFdWGGQWHStuhdKOOMAGApbUArVKd7nfyybueZPw9bV2%2FQTGONacQk3knWROzM2JoKf1YPhBjkHpdvPQMB8EV1BJ%2F1EwBcz8Mg%2BQdqnD5JnVZGUn1hpfCF8amzYTEvLC3u1SrwbzZjLY%2BiB4WpqlvEH%2FvU0hmu1ineyUPnyjjznryKoo2CoBlZhh1aFDqHkYa8Fe5hxgBHNZ2IDpX5pTkjF7wRrddvZaC9sWNKtJno7bFrMhpFtkuRRQ%2BRYMU%2FNddCnxSQPjKtVGKc3FITL0GC8CuBKVxQyZJFa32kYtTbkJA79GvNt%2Bo6oG4dJWs%2B045Ej6RoDyXv41bW1SXp44CZXVVXK7x%2FD1Kwy5nRqXK3vtiSCVaV1zQwaGph6RBOpyhXxaWO90D802gus4rxxxsMQysS9iWhElaDz5%2Bosd6t%2BCWzrsnNEPnuTjTgWx1a5SsaJPlYEwufcNhWu4sl40BBPwNZ9gkYU5qYR%2BOieiMJDQHXQPcddzczg6sK%2BtbP8ixjNSWEVw%2FCuRrAOJF7tAi9AIBzEmQOe4J38wPebf1p8%2F0KnU1NsCJnkYsdH8nxKm5EasyGpPJhKXrzhCzkWTz0B2bavEKj0KFwrbEimdb1qVSS5e%2F22r6YCjvCwJITOvsqZ7xIuVYxAcj7nmRZNzxunTdc7S3np7nLkRZYeIm1QnrHX78%2BcgpV6BfIFQKKppLoi5A4rzO%2Fjhm%2FICcmFjuU6q8DbqEuC91BHBO07kflsjnm8ElIgEvFIxZk6UFIoq%2FmQFCkLp8GbWjU49ai%2BIuOmtKSMsYK0VKNrU%2B8r9xtUpfHy1xT26ckIAd%2B4y%2FG1MNxWi4G7sOlIfj9H8yDHedd%2B%2BWkldRHvk55WE1Cr4FOg3DR5DT4CVjii55mzaT%2BFyAerTonlvk%2B3nyMzzgR9BM6qkq5w4emjOzlRn%2FMnqsuOSMrzQUV9mqM%2F9B6KcX7G5PIfzejj3xvPn7nXCDWOpmyxM2FqAw11Si850hUPpx32PtXrIayptI1%2F2%2BPXBqI5x49AVYizYgk7pDXz4lb8hZ1VgXboVwSKCV89Ii0nust8hjdc9mJD3eEC%2BE4JAzL7IUERxd0tcmpfIoducx1bgrPoZh8IpFLC1dMsnajrwRbPyf4VhchnpJ1p7VcCAnDqi3Ww2kYm7RYriXTAuTTvezn1ny6R411YTAyMffoYxGL3JjbP7JLjypcMp5UFNBBSyglPm050jLm0bb8AONWnXc6aiSFDLRX2IyqsEtqxxAsWlBBt5zikU3B5Tb4fp2P8LN5DuO%2FATE%2B7PVIZUIpKet7bkbxFtCgcx5ePySOTNxh3OvYM6yu3JnRRpnjYiUypJiUqiKtViqylfWFg%2F%2FDJKbbfTk69kO4lis7WWo%2FJcCi9AU8zQ9535PK4CmYsBmzZKYl5%2BLwh9mnDPC%2Bg1AbCMhXF8qxCHHgmK%2FsVwEFpVyNu6cAza1RNpvpayAtdzKgi%2FzxgPI5vWc9tkLdcGTRnEb0Mjx23hYWBZtDCn90aDhzHo4OSgz3bQuJ0KIICVYrKPLOsvWgDWDuY4WhjTr9X41F21S6fOZiHn9jgujc2a0jbvDEZ9Y9pvDvb3FQQQ8Bj%2BTuZ9oJnJO01YHAtI%2FgemxrrCRLuK9IeuhNlH7I2hvYqGjQpnj1DWwljrl4dvuub19R3gbrfPEfP%2Fr6reP9k7hFhr8A1eFQOPDBpUumTPiWb7cT%2ByzJdrfEIjkA4%2FEN8mi%2B%2FrnBkQN0OMd8JMugitvyXl09u7Rek18Rg14%2BcTgZgsXCC6Hn6GYHZtSMRo3PHqLX42pdO4bp5j%2BEFmYUVkWqDLSeS%2BozYJbBouI2wi2iM1PTCzguNBsUmjTR0Mhzit0Uj44nB51v%2BPpk0u8zMUypdKwYO9J%2BH6Zb%2Foyykx4fRKTERMnGuuvMCoavQdFpPAAlaukXVBcJ2rSijv2%2FFzKO0e6ygjoUFvZx7H4rUySLqW5hbynjt0x84PzRwOf%2FM%2Ffduo8VXB7gUnnUVSAhmB0KeBVF97QId2IT%2FlwD9i74CUZZEhYkSj9b1zWdVOX9U0XDFYO5Sf5iiDn3NC6kANQ7X1L3MtTnyZxfWdmsVczSBRhM74KwqxXVgKD%2BUwidLcByTX0QPklQvkCVNYv5XNIsVAXV%2F0OL8E%2BweSOs%3D'}
#codespace상에서의 오류로 인해 어쩔수 없이 추가한 부분 실제 서버 구동시 필요없는 부분 

def queryUnit(affiliatedUnit):

    url =f'{URL}/queryUnit/{affiliatedUnit}' 
    print(url)
    res = requests.get(url, headers=headers, cookies=session)
    #실제 요청을 시도하는 부분

    return json.loads(res.text[1:-1])
    #요청에대한 응답을 출력하는 부분 

def createUnit(affiliatedUnit):
    url =f'{URL}/createUnit/{affiliatedUnit}' 
    print(url)
    res = requests.get(url, headers=headers, cookies=session)
    #실제 요청을 시도하는 부분

    return queryUnit(affiliatedUnit)

def checkinFood(affilatedUnit,foodName,amount):
    url =f'{URL}/checkinFood/{affiliatedunit}/{foodName}/{amount}' 
    print(url)
    res = requests.get(url, headers=headers, cookies=session)
    #실제 요청을 시도하는 부분

    return queryUnit(affiliatedUnit)

def checkoutFood(affilatedUnit,foodName,amount):
    url =f'{URL}/checkoutFood/{affiliatedunit}/{foodName}/{amount}' 
    print(url)
    res = requests.get(url, headers=headers, cookies=session)
    #실제 요청을 시도하는 부분

    return queryUnit(affiliatedUnit)

def GetUnitHistory(affilatedUnit):
    url =f'{URL}/getUnitHistory/{affiliatedunit}' 
    print(url)
    res = requests.get(url, headers=headers, cookies=session)
    #실제 요청을 시도하는 부분

    return json.loads(res.text[1:-1])
    #요청에대한 응답을 출력하는 부분 


def queryAllUnits():
    url =f'{URL}/queryAllUnits/' 
    print(url)
    res = requests.get(url, headers=headers, cookies=session)
    #실제 요청을 시도하는 부분

    return json.loads(res.text[1:-1])
    #요청에대한 응답을 출력하는 부분 