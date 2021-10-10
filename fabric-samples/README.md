
# 하이퍼레저 페브릭(Hyperledger Fabric) 데모
## 환경 셋업
1. 하이퍼레져 도커 이미지 및 바이너리 설치, 새로운 환경일때마다 실행해야함.
```bash
$ curl -sSL https://bit.ly/2ysbOFE | bash -s
```
2. nodejs dependency 설치
```bash
$ cd /workspaces/CLOUD_WEB_Blo-my_Byzantium/fabric-samples/blomy/javascript
$ npm install
$ cd /workspaces/CLOUD_WEB_Blo-my_Byzantium/fabric-samples/chaincode/blomy/javascript
$ npm install
```
3. 블록체인 네트워크 실행(총기 채널 자동 실행됨)
```bash
$ cd /workspaces/CLOUD_WEB_Blo-my_Byzantium/fabric-samples/blomy
$ . startFabric.sh javascript
```
4. 부식 채널 실행
```bash
$ cd /workspaces/CLOUD_WEB_Blo-my_Byzantium/fabric-samples/test-network
$ ./networkFood.sh up createChannel -ca -s couchdb
$ ./networkFood.sh deployCC -ccn blomyfood -ccv 1 -cci initLedger -ccl javascript -ccp ../chaincode/blomyfood/javascript
```
5. 사용 후 종료
```bash
$ . networkDown.sh
```
## method 사용
자바스크립트 실행파일 위치
```bash
$ cd /workspaces/CLOUD_WEB_Blo-my_Byzantium/fabric-samples/blomy/javascript
```
admin 생성 후 app유저 생성
```bash
$ node enrollAdmin.js
$ node registerUser.js
```
새로운 asset 생성
```bash
$ node invoke.js
$ node invokefood.js
```
모든 asset query
```bash
$ node query.js 
$ node queryfood.js
```
## REST API 사용
### rest api 서버 실행
```
cd /workspaces/CLOUD_WEB_Blo-my_Byzantium/fabric-samples/blomy/javascript
```
```
node rest.js
```
### ● http://localhost:9090/
dummy page.

### ● http://localhost:9090/query/:serialNumber
serialNumber에 대한 총기 정보 출력.

example response ( query/1234567 )
```
[
  {
    "TxId": "e7b9ebd086cbde4350ac34f005874e633115c2d01e3ad6ca800a74e6564ab156",
    "Timestamp": "Sat Oct 09 2021 07:53:40 GMT+0000 (Coordinated Universal Time)",
    "Value": {
      "affiliatedUnit": "5div12regt3bn5coHQ",
      "docType": "firearm",
      "misc": "이상 무",
      "model": "K-1A",
      "opType": "CHECKOUT",
      "owner": "오동재",
      "serialNumber": "1234567",
      "updateReason": "총기 정비 후 재지급"
    }
  },
  {
    "TxId": "329ada020c18e8b277021f906dc2c734b361fe0ef19cd66eeb81d831f2d29a12",
    "Timestamp": "Sat Oct 09 2021 07:53:38 GMT+0000 (Coordinated Universal Time)",
    "Value": {
      "affiliatedUnit": "5div12regt3bn5coHQ",
      "docType": "firearm",
      "misc": "장전 손잡이 고장",
      "model": "K-1A",
      "opType": "CHECKIN",
      "owner": "오동재",
      "serialNumber": "1234567",
      "updateReason": "기능고장으로 인한 정비"
    }
  }
]
```
### ● http://localhost:9090/createFirearm/:serialNumber/:model/:owner/:affiliatedUnit/:status/:updateReason

총기 생성

### ● http://localhost:9090/checkoutFirearm/:serialNumber/:status/:updateReason

총기 불출

### ● http://localhost:9090/checkinFirearm/:serialNumber/:status/:updateReason

총기 반납

### ● http://localhost:9090/changeFirearmAttributes/:serialNumber/:model/:owner/:affiliatedUnit/:status/:updateReason

총기 상태 변경

### ● http://localhost:9090/deleteFirearm/:serialNumber

총기 삭제

## 문제점
하이퍼레저 네트웍 시작/종료 시 터미널이 날아감. 터미널 재실행후 재개

## couchDB 데이터 확인
[localhost:5984/_utils](localhost:5984/_utils) 로 로그인
admin/adminpw

![image](https://user-images.githubusercontent.com/10104871/135261417-f0914f35-0268-4165-8795-d988ae163089.png)

## Hyperledger Explorer 구현
준비(needs a running hyperledger network in place)
```bash
$ cd explorer
$ npm install
$ node prepare.js
```
실행
```bash
$ docker-compose up -d
```
종료
```bash
$ $ docker-compose down -v
```
[localhost:8080](localhost:8080)
로그인: exploreradmin/exploreradminpw

![image](https://user-images.githubusercontent.com/10104871/135264221-378468ac-e59f-470e-9751-16d6251f3711.png)

## 이해를 돕기 위한 그림 및 플로우차트

![image](https://user-images.githubusercontent.com/10104871/135603887-16943a4e-eff4-4667-b6f1-14a7b6ae1be2.png)

참조:
- https://github.com/hyperledger/fabric-samples
- https://github.com/hyperledger/blockchain-explorer
