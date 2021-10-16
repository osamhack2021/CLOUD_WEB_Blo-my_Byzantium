## 서버실행방법

```

cd /workspaces/CLOUD_WEB_Blo-my_Byzantium/WEB/backend

sudo apt-get install pkg-config
sudo apt-get install libcairo2-dev
pip install -r requirements.txt
python manage.py runserver
```




## 기술 스택 (Technique Used) 

### Server(back-end)
 - Python   3.8.6 
 - pip      21.2.4
 - Django   3.2.7
 - sqlite3





## 백엔드 API 사용법

### FireArm 관리 (http://localhost:8000/firearm)

 - GET http://localhost:8000/firearm

    - 총기 전체 조회(백엔드)
    - 백엔드에 저장되어있는 모든 데이터를 json으로 반환
    - 출력되는 정보 : 'opType','SerialNumber', 'Weapon_Model', 'Owner', 'Affiliated_Unit', 'status','UpdateReason'


 - GET http://localhost:8000/firearm/queryAllFirearms

    - 총기 전체 조회(하이퍼레저)
    - 하이퍼레저에 저장되어있는 모든 데이터를 json으로 반환

 - GET http://localhost:8000/firearm/querySerialNumber/총기번호

    - 특정 총기의 과거 데이터 전체 조회 (하이퍼레저)
    - [0] 인덱스가 현재 상태


 - GET http://localhost:8000/firearm/approve

    - 백엔드에 저장된 최상단 데이터를 opType에 맞게 하이퍼레저로 전송
    - 큐에 저장된 데이터 삭제, opType를 반환.

 
 - POST http://localhost:8000/firearm/createFirearm

    - 총기 생성
    - POST json 형식 :
        ```
        {
            "opType" : "createFirearm" ,
            "SerialNumber" : "<총기번호>" , 
            "Weapon_Model" : "<총기모델명>" , 
            "Owner" : "<총기 소유자 군번>" , 
            "Affiliated_Unit" : "<총기 소유자의 소속부대>" , 
            "status" : "<현재 상태>" , 
            "UpdateReason" : "<update 이유 입력>"
        }
        ```


 - POST http://localhost:8000/firearm/checkoutFirearm

    - 총기 불출
    - POST json 형식 :
        ```
        {
            "opType" : "checkoutFirearm" ,
            "SerialNumber" : "<총기번호>" ,
            "status" : "<현재 상태>" , 
            "UpdateReason" : "<update 이유 입력>"
        }
        ```


- POST http://localhost:8000/firearm/checkinFirearm

    - 총기 반납
    - POST json 형식 :
        ```
        {
            "opType" : "checkinFirearm" ,
            "SerialNumber" : "<총기번호>" ,
            "status" : "<현재 상태>" , 
            "UpdateReason" : "<update 이유 입력>"
        }
        ```


 - POST http://localhost:8000/firearm/changeFirearmAttributes

    - 총기 상태 변경
    - POST json 형식 :
        ```
        {
            "opType" : "changeFirearmAttributes" ,
            "SerialNumber" : "<총기번호>" , 
            "Weapon_Model" : "<총기모델명>" , 
            "Owner" : "<총기 소유자 군번>" , 
            "Affiliated_Unit" : "<총기 소유자의 소속부대>" , 
            "status" : "<현재 상태>" , 
            "UpdateReason" : "<update 이유 입력>"
        }
        ```


- POST http://localhost:8000/firearm/deleteFirearm

    - 총기 삭제
    - POST json 형식 :
        ```
        {
            "opType" : "deleteFirearm" ,
            "SerialNumber" : "<총기번호>"

        }
        ```


### Foods 관리 (http://localhost:8000/foods)


- GET http://localhost:8000/foods

    - 부식 전체 조회(백엔드)
    - 백엔드에 저장되어있는 모든 데이터 반환
    - 출력되는 정보 : 'opType','Affiliated_Unit', 'FoodName', 'Amount'


 - GET http://localhost:8000/foods/queryAllUnits

    - 부식 전체 조회(하이퍼레저)

- GET http://localhost:8000/foods/queryUnit/부대이름

    - 특정부대 부식현황 조회(하이퍼레저)

- GET http://localhost:8000/foods/GetUnitHistory/부대이름

    - 특정부대 과거내역 조회(하이퍼레저)


 - GET http://localhost:8000/foods/approve

    - 백엔드에 저장된 최상단 데이터를 opType에 맞게 하이퍼레저로 전송
    - 큐에 저장된 데이터 삭제, opType를 반환.

 
 - POST http://localhost:8000/foods/createUnit

    - 부대 생성
    - POST json 형식 :
        ```
        {
            "opType" : "createUnit" ,
            "Affiliated_Unit" : "<부대이름>" , 
            "FoodName" : "<부식이름>" , 
            "Amount" : "<부식수량>"
        }
        ```

 
 - POST http://localhost:8000/foods/checkinFood

    - 부식 반입
    - POST json 형식 :
        ```
        {
            "opType" : "checkinFood" ,
            "Affiliated_Unit" : "<부대이름>" , 
            "FoodName" : "<부식이름>" , 
            "Amount" : "<부식수량>"
        }
        ```

 
 - POST http://localhost:8000/foods/checkoutFood

    - 부식 불출
    - POST json 형식 :
        ```
        {
            "opType" : "checkoutFood" ,
            "Affiliated_Unit" : "<부대이름>" , 
            "FoodName" : "<부식이름>" , 
            "Amount" : "<부식수량>"
        }
        ```






## 작업해야할목록

