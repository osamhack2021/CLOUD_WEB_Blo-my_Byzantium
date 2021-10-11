import firearmRest, foodRest, json
#임시로 만든 파이썬 스크립트 firearmRest과 foodRest를 불러와서 사용 
# query 결과를 반환함으로 변수에 반환값을 저장해서 사용하면 될듯 함

serialNumber = 111111 #임시 시리얼 번호 지정

affiliatedUnit = '39div'
foodName = 'kimchi'
amount = 10
while True :
    func = input('조회할 함수 입력: ')

    if func == 'createFirearm':
        result =firearmRest.createFirearm(serialNumber,'k5','정현구','39div','이상무','신병 전입 불출 대기')
        print(result)
    elif func == 'checkoutFirearm':
        result =firearmRest.checkoutFirearm(serialNumber,'이상무','근무로 인한 총기 불출')
        print(result)
    elif func =='checkinFirearm':
        result =firearmRest.checkinFirearm(serialNumber,'장전 손잡이 이상','총기 고장으로 인한 반납')
        print(result)
    elif func =='changeFirearmAttributes':
        result =firearmRest.changeFirearmAttributes(serialNumber,'k1',' ','39div','이상무','잘 모름')
        print(result)
    elif func =='deleteFirearm':
        result =firearmRest.deleteFirearm(serialNumber)
        print(result)
    elif func =='query':
        result =firearmRest.query(serialNumber)
        print(result)
    elif func =='createUnit':
        result =foodRest.createUnit(affiliatedUnit)
        print(result)
    elif func =='queryUnit':
        result =foodRest.queryUnit(affiliatedUnit)
        print(result)
    elif func =='checkinFood':
        result =foodRest.checkinFood(affiliatedUnit,foodName,amount)
        print(result)
    elif func =='checkoutFood':
        result =foodRest.checkoutFood(affiliatedUnit,foodName,amount)
        print(result)
    elif func =='GetUnitHistory':
        result =foodRest.GetUnitHistory(affiliatedUnit)
        #오류있음
        print(result)
    elif func =='queryAllUnits':
        result =foodRest.queryAllUnits()
        #오류있음
        print(result)
    else:  
        print('종료')
    
