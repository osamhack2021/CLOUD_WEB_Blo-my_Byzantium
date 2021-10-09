import rest 

serialNumber = 101010


#rest.createFirearm(serialNumber,'k5','정현구','39div','이상무','신병 전입 불출 대기')

#rest.checkoutFirearm(serialNumber,'이상무','근무로 인한 총기 불출')

#rest.checkinFirearm(serialNumber,'장전 손잡이 이상','총기 고장으로 인한 반납')

#rest.changeFirearmAttributes(serialNumber,'k1',' ','39div','이상무','잘 모름')

#rest.deleteFirearm(serialNumber)

rest.query(serialNumber) #rest.py의 query함수 호출 