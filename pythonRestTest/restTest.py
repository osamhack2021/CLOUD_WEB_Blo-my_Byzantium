import rest 
#임시로 만든 파이썬 스크립트이고 rest를 불러와서 사용 
# query 결과를 반환함으로 변수에 반환값을 저장해서 사용하면 될듯 함

serialNumber = 101010 #임시 시리얼 번호 지정


#print(rest.createFirearm(serialNumber,'k5','정현구','39div','이상무','신병 전입 불출 대기'))
# result = rest.createFirearm(serialNumber,'k5','정현구','39div','이상무','신병 전입 불출 대기')
#createFirearm호출 및 query함수 결과 반환

#print(rest.checkoutFirearm(serialNumber,'이상무','근무로 인한 총기 불출'))
# result = rest.checkoutFirearm(serialNumber,'이상무','근무로 인한 총기 불출')
#checkoutFirearm 호출 및 query함수 결과 반환 

#print(rest.checkinFirearm(serialNumber,'장전 손잡이 이상','총기 고장으로 인한 반납'))
# result = rest.checkinFirearm(serialNumber,'장전 손잡이 이상','총기 고장으로 인한 반납')
#checkinFirearm 호출 및 query함수 결과 반환 

#print(rest.changeFirearmAttributes(serialNumber,'k1',' ','39div','이상무','잘 모름'))
# result = rest.changeFirearmAttributes(serialNumber,'k1',' ','39div','이상무','잘 모름')
#changeFirearmAttributes 호출 및 query함수 결과 반환

#print(rest.deleteFirearm(serialNumber))
# result = rest.deleteFirearm(serialNumber)
#deleteFirearm 호출 및 query함수 결과 반환

print(rest.query(serialNumber))
result = rest.query(serialNumber)
#rest.py의 query함수 호출 