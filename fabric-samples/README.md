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
3. 블록체인 네트워크 실행
```bash
$ cd /workspaces/CLOUD_WEB_Blo-my_Byzantium/fabric-samples/blomy
$ . startFabric.sh javascript
```
4. 사용 후 종료
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
$ node node registerUser.js
```
새로운 asset 생성
```bash
$ node invoke.js
```
모든 asset query
```bash
$ node query.js 
```

## 문제점
하이퍼레저 네트웍 시작/종료 시 터미널이 날아감. 터미널 재실행후 재개

## couchDB 데이터 확인
[localhost:5984/_utils](localhost:5984/_utils) 로 로그인
admin/adminpw

![image](https://user-images.githubusercontent.com/10104871/135261417-f0914f35-0268-4165-8795-d988ae163089.png)

## Hyperledger Explorer 구현
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


