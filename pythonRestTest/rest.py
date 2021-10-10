import requests, json

URL = 'https://osamhack2021-cloud-web-blo-my-byzantium-7v7qrp7g6hwxwp-3000.githubpreview.dev'

headers = {'User-agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36'}
#요청 헤더 부분 크게 의미없음 

session = {'__Host-vso-pf':'AE00AD3679F8E0E58F29900E64283757%3A9mDaPkcVgObomH3XnG4NUg5BgjTcgwt5u5wTxt5EMInpSh07YdvVLuTsf9cRoqRMhM5nycDyG2DAVFVZrljVwWYsqKlk6%2FDRVAQEVUeLmfOYTg8%2FNVGGOiXWnhPm%2BzvzQobQcB%2F6TZyN7aXCSzYXFRMff5hw4G3tSQpSaUaFzKlTN6bA6MFI7zhxUg5%2FER7z4i3K7F4CB1ayv%2BNPpqVWnqQ2q82e7MwzLN2GVwQmhiVOAStE3xXTEkYXDM13KnGLWibFBJ5hiFMIsQ2NpoBt7b%2BxSNWCtoT7w8UJjnl%2FyX1%2Ba9nO849eA0mhZoec4P8NRSg%2B3geXrzUZpbp7ci1Zy%2FJgjd%2BFsll%2BdLO7LUncez0r4XncR8%2BkBsuraxudQrEl0XP%2BHwH1XREunh4jI4Egk9QwPCxXvyh%2F%2F0lzssiJdXHs18sbnYQRV16gC1moOmZJIc2mBgHFHONvpAcP8ioDKYj6QJVS1gAa%2B6tj2%2B4VXZpifkbCX85cI%2BrMg0WngifVyzIvGEOVmZ7zDfV%2BEun8gjk6tGPtsu%2BUUYaLBv1E1whT8JTCPGHVz6XjR0R9RS%2FSoXoU4cZajXF6j3TDMRVgumihuoyP2SuxqmJ9Q4go3Ncf7zgNWcRGRmPC2xEwODXKk0R4jSZeTHHQSvcsAbzQ99wOJJiyTXBDFdKKk4UkSRI98IYA6e9N7kUf4iuP7arGqZFNA2HRJNDkePaGdPuLT1MQNKt%2FrmISCwBUpk1eOTGOh4rDUzXnl2LjqScN53%2Bn8kd9tBWcU%2BzorikxU1kMAN8p5iTvudiyfWkhJTW9mtUqmEMcQ19bKjEFHGE8BtGl0O7qysEt87fBkNQYBzFs85olY35JR3eQEm%2FSbCcPMMnOkPzdac1AYanB6DRxChcAgJfUAHhJ9jK9o0ivhOZ2XHYw58IjYzewjzRmQ2HwWnxeqA6fn0Ewwq6pjJ4xyvkgETEYLA7IrtDtLVoir7qzu7uYu%2F3Xu%2Fq%2BJz0T9sAp3VPL1%2FtOUzyUQ%2FmAnYuS%2FkeFoe53sQHuE9ItatvccoVxXLmjJo1VnlcY4uAGLGGyM1A6qloV2tblFO72%2F%2BovsYjEOnUIzGtKXMrDcnItOkpZNA%2BgrDvVqkKL%2FxwF0scp31o9CWAO4gAs5M9ul7gwFVvr9L%2BJUbJcRkLMPdhwy9RGFDM2MIKvLTtLRFzyZOkSFTPF70UYm2CyJTCkWhZPcWuvhlOGjCHP2mX7e3vdXmEdbSpyGGZqNM7Vc1%2FkklpUCCa%2Bi6tzRGsdyKzrRjwvsGnwJwSTvmZyV5w03reqrU35W%2FkWvTjwa63HnTrnMCKYnbksgWcv4MObgOdxuiaxVZuupf5u0s%2Fx5NcCZGrsPNVGQ%2BoxPGszszNHE80vSjnr5DnEzclgvdVOtfZ2eeZUEoT8D1OLlSciTiS9WwcPkevfCc%2Fck1Ypfw2GdGin1tz5zCo%2FkqLw5hYeuxvRfnF8CZQPyde%2BwDxX8gGZbWTQDYE0PMolK2bU84iTNRuzbWa%2Fp4bK55hMcGVUM7SbpX%2F5UEem%2BuedYtCYfgkNF841jvGZZNOMRpb0xM5ZdI5daMbfCEBcYQ9Pdo0AM%2B0ttOnBDE3jtrnwTMmnjA3BtN%2FgRexqVCs96pcP%2BBx5wlvOt35ptVrV0QXzbk%2F8kkb8YtiNyeUV2kA6Zv%2BTvEzyX3%2FLnUap%2Bne7szI72vvD3AZNINnay4%2FFQICYIsA4k%2BfaXZb9USlwMRE9%2Fn9DyAwBDNH5BiZ%2F6aFBjEOvt6fvGvIFnqFNUye0VJzVo9oUV0qvzNK6jEhpySxytfN5hsLQbbCTmWVHGbp5IHXftFOfEfuYAm2giRXCY91gwRs0LpFTFNkvimM%2BPN7DTfebAl7wmCv9Zv671QQWSgekY%2FnPqw7HJu4jQxxLgQ1CrqUjOkRg%2FDZnfQPSK%2B6F%2Bi4AokiP6qNKDOPfOaNTn9hDYUQUnphKJ79cfAss5n4RoH8rEYUwOcfsiAHwllQH4O4RyF7E52a7ePo%2BGVbxAgJXx%2BMW%2FlawJp7TSdu7XdD2bjOVWO0En%2F2h9IXxNgmLnDMnyLvN9urC21EyoIt%2FUzosBI0m4pOZs1DksMUKNfyCoiJMFgpP8Lqy6p46u8ZR6vIBgcH5J%2F9SS14MfCjWO%2F1U1LeviyYfQySd%2FL2DecyMOT1p83DGiArLKR%2BU3cD5DkNPoFMz3RKQri7nhsZDvcklk1c389t%2BPHv5ut1eRs7wFkq1hOIPLuqmQ4HoH%2BgIhCsD6kHdmSxxFWuDQQYeWTQ2YXXLiQVc8i4rzsBsWDwWhsWB6ykfW%2BoFpio07G7rEf285knChqnD5wFaswe9Pj9cltiSyLfFGiSUf%2Fo%3D'}
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

