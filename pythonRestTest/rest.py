import requests, json


headers = {'User-agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36'}
#요청 헤더 부분 크게 의미없음 

session = {'__Host-vso-pf':'C39318278852A6B1E048EA6965C124C4%3AW2Yea6XpeinAZyznIR%2FTgUdL7F3Z57rSOSETHIwWqgiL1jrMB30dc%2FrwPZPAA0riM2aXOErLTcoULEtdmEXvWWlsVlD1dIC3GNdXvT0Z2YY6bT8k6DyuL9SuRJpB5qczXxV4Evkrn%2BaSo87sTqnKEb6UKPYWjYNdgZpn2TSGiTwgKD0ub1ls%2F3hHAN6eEMWcJt1WhMd7VcoGgd62nQ05cFQlkYmDZiHeYCmb%2BZhLM6KcQzdfqWNrljQ1JcWjM2oLMKTCg5qotuJ90Cki1Z8rEXFZkmpsC4%2F%2BUVGdxzxnW9Do7e1eAl2%2BWllHCdb6B9%2FQAy8gpPIwKQPu6lKKj4nJ44EfQwDmWQY6cSyGGDElTcGpIp2vsJEF%2BzKbGkwCypuz%2BNK221vOg70uIyvEFl8UdqJKdrGKpNkYG21DpIhTm1%2ByzoM5BoIKFHni9g1jqY3WyWvYFykNBdRCn2B5hl1wqRCxjVtauJld9I%2Bin2CH2Wf9RDg%2Fd7%2BXqIkv%2BGnT%2BgkCqpFj%2F1GvHTyk1wu8T1GEdWvnalQuSjiVN%2FB3b5Kan%2Fu3IVCY4%2Fr3BnDKnpyOP8rnTTYycDuLHdh%2B6MznNhYnHADD50MKs3zSsqI%2BaX16%2FOktDr0SwjV%2FVk6w7bB5SUb5SK5zLoD4EZ1jzAszpqEXwtqzKWr1YJfLtPrl8xkqUya6%2B3Xtoe9Ur4PsxGYpo%2FeIEelObopO1TZa4jkS9vwJYR4hCzLNdDLzArRwHB%2FrsTOSmwf7c3FOW0bLLLNLU0RXXaHIKsp%2B%2BbsdunAhHSqWHM7AuESpsh%2BMxFziKl3bDb8kKNPfa22n%2FsU8xxhLw341d01vawTSgsLRnRR7bwMbAYWnp5mq5zHTs5zczmjbxXKaAB42fTpL5sJO6pCCuMjT6VjfYP9GWAJ3HqNTihrSE1DWv%2FFdUV7U0oxqMxRJSzUKOC%2F6H9bPvJRRRBl%2FRI4aJRMTYnAnqfOyGiGi%2Fe56uI%2FEt%2FMQH8hh%2B45p2DcbkZ1uESgJQjps3gfAz9W4RN8TvvWGnPogLTHTMJKLK2dO4Nf7V08263i4OENPzQe%2Fr%2BKdFUimp5RROf68hKZqy7hpTiWJNezRjn18MLcU0afSNu2nhwXRwn8eMrb6GfojcQy26VDccXi5fDPkRXQ%2BC8zIL8tOAIgwaBsf%2BChAug262G1u4wl4oouMjKN7vsqZbwS1CeEkWsjRhUsEtcEJyeujJi%2Bda%2B7506VtRUWFAXO7okdMQlUT%2BLuqQsvBV4M97JvD63qkDTh8t6PopqCrypzb2%2BhhhcCuaBe%2BP3D8gFOJseg47oj6%2BXBia9S%2FM%2FxrGCLt7TxUqNHi6ucChJu6o5VBVlLssuUkyAVa1lcb5Jt%2BKAH1zQKO9ipHQfRQ2vLJycd7i7Sez3ETmNMclH1L2g11dWXkgONC%2Ba1OYMHtBtYYoEt0ZCG8vQoVOlFwK3CY9oB0jGeBR%2FUUca0ftS4tNVpZ65GEv2ubkIKJ3AHcw8dtE1Ibnnlfdryef2WgRTXjQbWnx1%2Bc0AtwickIt9BuvALn04gHJQ4LNmUx9cQtWX%2B0gOc%2B%2FGw6fN3iuXkAc5%2FAghKt8D6C%2BTk4ejl%2FSQ8FVSnIifIVYVeL7vV7Hp6S%2B9dKeIrZjF1Qbw%2BHfe9wediAMQdRPpY9yN6%2Fl1PRhuZJ%2FJ%2FSAKBnfhJODImGNC5sZUeP7zz0VD0M4exdpqx3%2BwNnMBssMQjH14IheIolRF54q2bFdLsjZYZN4gh03%2BSewBUrBjbXTELejrH2jSqZkRUtpDRKAdd4%2FO7WJ1ECxmVvQkmQPKyoYlBlYdO6200rpYAIgIo3NtweZocNxAzcxUwFQulBkfgi8JdmsbZtgqAPoodscLmVjgLGUiwpeio0aL1%2FQR0J2YSEbveR5%2FhZRFBpgbk7%2FSeGad%2B3CWLkPV7sfjlZkSkgzGLDZXrB86czeCsrVDYtqsppRI%2BSr99npmYxKu8xl64IKBJqmwgF%2FS52RAoFoYHu52Tbgy%2FcJ88bI5BmQsAU63rHN2%2F68fFxi6jSb%2FDFlCYfmCk2vacspVJc9wRhlOk0aVL3JPiD3BsjmXRa367InJ%2FQnLUgRVhNaPGB7dtUNRSbGSZSzhwkOoORsPkePwdW4tYfvOk%2FVvUaEnsKOsuDDUh7Sc5M0WR1Qo%2BAmjL2Xzc12QEVJIGPYjyHRMLG5PFrjyTbFMmykT5o32EhNhtzEksNszcVjRhvU1h0NnFQ7obdw43kD0saYW0Q7k13gpIKQxMbqlS7jRFYtWNHZYa1pEDkC%2Ftuk7YsMMvMPvcK6T0toeWaZ28xKaQwNZvtjSWLX6Oq641NGnySmZyO7s9XZLgTOQDIp7H%2BCrKQAzA%3D'}
#codespace상에서의 오류로 인해 어쩔수 없이 추가한 부분 실제 서버 구동시 필요없는 부분 

def query(serialNumber):

    url =f'https://osamhack2021-cloud-web-blo-my-byzantium-7v7qrp7g6hwxwp-3000.githubpreview.dev/query/{serialNumber}' 

    res = requests.get(url, headers=headers, cookies=session)
    #실제 요청을 시도하는 부분

    print(res.text)
    #요청에대한 응답을 출력하는 부분 

def createFirearm(serialNumber,model,owner,affiliatedUnit,status,updateReason):

    url =f'https://osamhack2021-cloud-web-blo-my-byzantium-7v7qrp7g6hwxwp-3000.githubpreview.dev/createFirearm/{serialNumber}/{model}/{owner}/{affiliatedUnit}/{status}/{updateReason}' 

    res = requests.get(url, headers=headers, cookies=session)
    #실제 요청을 시도하는 부분

    print(res.text)
    #요청에대한 응답을 출력하는 부분 

def checkoutFirearm(serialNumber,status,updateReason):

    url =f'https://osamhack2021-cloud-web-blo-my-byzantium-7v7qrp7g6hwxwp-3000.githubpreview.dev/checkoutFirearm/{serialNumber}/{status}/{updateReason}' 

    res = requests.get(url, headers=headers, cookies=session)
    #실제 요청을 시도하는 부분

    print(res.text)
    #요청에대한 응답을 출력하는 부분 

def checkinFirearm(serialNumber,status,updateReason):
    url =f'https://osamhack2021-cloud-web-blo-my-byzantium-7v7qrp7g6hwxwp-3000.githubpreview.dev/checkinFirearm/{serialNumber}/{status}/{updateReason}' 

    res = requests.get(url, headers=headers, cookies=session)
    #실제 요청을 시도하는 부분

    print(res.text)
    #요청에대한 응답을 출력하는 부분 

def changeFirearmAttributes(serialNumber,model,owner,affiliatedUnit,status,updateReason):
    url =f'https://osamhack2021-cloud-web-blo-my-byzantium-7v7qrp7g6hwxwp-3000.githubpreview.dev/changeFirearmAttributes/{serialNumber}/{model}/{owner}/{affiliatedUnit}/{status}/{updateReason}' 

    res = requests.get(url, headers=headers, cookies=session)
    #실제 요청을 시도하는 부분

    print(res.text)
    #요청에대한 응답을 출력하는 부분 

def deleteFirearm(serialNumber):
    url =f'https://osamhack2021-cloud-web-blo-my-byzantium-7v7qrp7g6hwxwp-3000.githubpreview.dev/deleteFirearm/{serialNumber}' 

    res = requests.get(url, headers=headers, cookies=session)
    #실제 요청을 시도하는 부분

    print(res.text)
    #요청에대한 응답을 출력하는 부분 