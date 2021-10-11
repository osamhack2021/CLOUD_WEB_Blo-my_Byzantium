import firearmRest, foodRest, json
#임시로 만든 파이썬 스크립트 firearmRest과 foodRest를 불러와서 사용 
# query 결과를 반환함으로 변수에 반환값을 저장해서 사용하면 될듯 함

serialNumber = 111111 #임시 시리얼 번호 지정

affiliatedUnit = '39div'

#print(firearmRest.createFirearm(serialNumber,'k5','정현구','39div','이상무','신병 전입 불출 대기'))
# result = firearmRest.createFirearm(serialNumber,'k5','정현구','39div','이상무','신병 전입 불출 대기')
#createFirearm호출 및 query함수 결과 반환

#print(firearmRest.checkoutFirearm(serialNumber,'이상무','근무로 인한 총기 불출'))
# result = firearmRest.checkoutFirearm(serialNumber,'이상무','근무로 인한 총기 불출')
#checkoutFirearm 호출 및 query함수 결과 반환 

#print(firearmRest.checkinFirearm(serialNumber,'장전 손잡이 이상','총기 고장으로 인한 반납'))
# result = firearmRest.checkinFirearm(serialNumber,'장전 손잡이 이상','총기 고장으로 인한 반납')
#checkinFirearm 호출 및 query함수 결과 반환 

#print(firearmRest.changeFirearmAttributes(serialNumber,'k1',' ','39div','이상무','잘 모름'))
# result = firearmRest.changeFirearmAttributes(serialNumber,'k1',' ','39div','이상무','잘 모름')
#changeFirearmAttributes 호출 및 query함수 결과 반환

#print(firearmRest.deleteFirearm(serialNumber))
# result = firearmRest.deleteFirearm(serialNumber)
#deleteFirearm 호출 및 query함수 결과 반환

result = firearmRest.query(serialNumber) #query 함수 호출 
print(type(result)) #query 함수 리턴 값의 타입 (dict)
print(result)   #query 함수 serialNumber에 대한 리턴 값 출력
print(result['TxId'])
#print(firearmRest.query(serialNumber))

#print(foodRest.createUnit(affiliatedUnit))

#print(foodRest.queryUnit(affiliatedUnit))

#print(foodRest.checkinFood(affilatedUnit,foodName,amount))

#print(foodRest.checkoutFood(affilatedUnit,foodName,amount))

#print(foodRest.GetUnitHistory(affilatedUnit))

#print(foodRest.queryAllUnits())

#rest.py의 query함수 호출 
