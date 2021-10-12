# Blo-my
**Blo-my** Blo-my는 Blockchain Army의 약자로 블록체인을 활용한 국방 데이터 유통 프로젝트입니다.
![title](/doc/images/logo.png)
<p align="center">
	<a href="https://github.com/osamhack2021/CLOUD_WEB_Blo-my_Byzantium/search?l=JavaScript&type=code"><img alt="GitHub language count" src="https://img.shields.io/github/languages/count/osamhack2021/CLOUD_WEB_Blo-my_Byzantium"></a>
	<a href="https://github.com/osamhack2021/CLOUD_WEB_Blo-my_Byzantium/graphs/contributors"><img alt="GitHub contributors" src="https://img.shields.io/github/contributors/osamhack2021/CLOUD_WEB_Blo-my_Byzantium?color=success"></a>
	<a href="https://github.com/osamhack2021/CLOUD_WEB_Blo-my_Byzantium/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/osamhack2021/CLOUD_WEB_Blo-my_Byzantium"></a>
	<a href="https://github.com/osamhack2021/CLOUD_WEB_Blo-my_Byzantium/network/members"><img alt="GitHub forks" src="https://img.shields.io/github/forks/osamhack2021/CLOUD_WEB_Blo-my_Byzantium"></a>
	<a href="https://github.com/osamhack2021/CLOUD_WEB_Blo-my_Byzantium/blob/master/LICENSE"><img alt="GitHub license" src="https://img.shields.io/github/license/osamhack2021/CLOUD_WEB_Blo-my_Byzantium"></a>
  </p>
<p align="center">
  <a href="https://github.com/osamhack2021/CLOUD_WEB_Blo-my_Byzantium/doc/presentation"><img src = "./doc/images/button/presentaion.png" width=150px></a>
  <a href="https://donggni0712.gitbook.io/blo-my/"><img src = "./doc/images/button/team_blog.png" width=150px></a>
  <a href="https://www.youtube.com/"><img src = "./doc/images/button/demo_video.png" width=150px></a>
</p>

## **무결성과 책임 추적성**     
 블록체인의 위,변조 불가는 무결성과 책임 추적성이 중요한 분야에서 활용이 용이하다. 
 국방 분야의 군수, 방산 계약, 공문서 관리 등과 같은 분야에 블록체인을 도입한다면 데이터에 대한 신뢰도가 향상되고, 탈중앙화된 데이터 관리와 개인 키를 통한 암호화로 인해 높은 책임 추적성을 보장할 수 있다.
## **오픈소스 프로젝트**   
 Blo-my는 블록체인의 이러한 특성들을 국방 데이터에 어떤식으로 활용할 수 있는 지를 보여주는 오픈 소스 프로젝트이다. 현재에는 총기수불, 부식 작전 데이터 다루는 프로젝트지만, Blo-my 데이터 유통의 원리만 활용한다면 다양한 국방데이터를 블록체인에 접목시킬 수 있다.
 또, Blo-my의 발전은 다양한 컨트리뷰터들에 의해서 이루어지므로 별도의 국방 예산 없이 발전이 이루어질 수 있다.


# 프로젝트 소개
## 프로젝트 개요  
| 문제 상황 | 해결 방안 |
|--------|--------|
| **로컬 데이터** - 인트라넷에서 유통되기 전, PC에서 local파일로 총기수불대장이 존재할 때, PC에 오류가 생기면 기존의 모든 데이터가 삭제됨 | **클라우드** - 데이터가 생성되는 즉시 프라이빗 인트라넷에 등록하여 PC문제로 데이터가 삭제되는 상황을 예방 |
| **변조 위험** - 인트라넷이 해킹될 경우 데이터 변조가 쉬움 | **블록체인** -  블록체인을 활용하여 변조 불가능한 데이터 유통 |
| **접근성** - 예하부대는 자신의 상급부대에서 부식이 어떤식으로 유통되고 있는 지 현 상황을 확인하기가 힘듦| **서비스** - 블록체인 네트워크를 활용하여 각 식자재에 대한 유통 과정을 확인할 수 있도록 함 |

## 프로젝트 요약
- 무결성
- 책임 추적성
- 오픈 소스 프로젝트 

# 컴퓨터 구성 / 필수 조건 안내 (Prerequisites)
* ECMAScript 6 지원 브라우저 사용
* 권장: Google Chrome 버젼 77 이상

# 사용 기술 (Technique)
## 기술 스택 (Technique Used)
<img src = "./doc/images/technique-Used.png">

## Hyperledger-fabric
- **하이퍼레저 패브릭이란**
  - **허가형 프라이빗 블록체인** - 누구나 자유롭게 참여할 수 있는 기존의 블록체인과는 다르게 자체 인증 시스템에 의해 허가된 사용자만이 블록체인 네트워크에 참여할 수 있다.
  - **별도의 원장 생성 가능** - 기존의 블록체인은 블록체인 네트워크에 참여한 모든 참여자가 모든 정보에 대한 원장을 가지고 있었다. 하지만 하이퍼레저에서는 채널을 이용해 해당 정보를 공유하고자하는 노드 간에만 별도의 원장을 생성하는 것이 가능하다.
- **왜 하이퍼레저 패브릭인가**    
  - **국방 데이터의 기밀성** - 기존의 블록체인으로는 국방 데이터의 특성인 '기밀성'을 보장할 수 없다. 하이퍼레저는 허가된 사용자만 블록체인 네트워크에 참여할 수 있기때문에 군 외부로의 정보 유출을 방지할 수 있다.
  - **국방 데이터의 보안성** - 모든 국방 데이터가 같은 보안 등급을 가진 것은 아니다. 3급 기밀, 2급 기밀 등 정보의 보안 등급에 차이가 있고, 이러한 경우 모든 장병이 같은 장부를 가지게 하는 것이 제한된다. 하이퍼레저에서 제공하는 채널을 사용해 이러한 문제를 쉽게 해결할 수 있다.  
  - **플랫폼의 완성도** - 자체적인 네트워크를 개발하면 예상치 못한 버그, 네트워크 보안성 문제 등의 문제가 발생할 수 있다. 이미 검증된 오픈소스 프로젝트인 하이퍼레저 패브릭을 사용함으로써 블록체인 네트워크 구조의 완성도를 높일 수 있다.


# 설치 & 시작 안내 (Installation Process & Getting Start)

### Git Clone
```bash
$ git clone https://github.com/osamhack2021/CLOUD_WEB_Blo-my_Byzantium.git
```

### Hyperledgher-fabric 서버 실행
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
$ cd /workspaces/CLOUD_WEB_Blo-my_Byzantium/fabric-samples/chaincode/blomyfood/javascript
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

6. admin 생성 후 app유저 생성
```bash
$ cd /workspaces/CLOUD_WEB_Blo-my_Byzantium/fabric-samples/blomy/javascript
$ node enrollAdmin.js
$ node registerUser.js
```

7. 새로운 asset 생성
```bash
$ node invoke.js
$ node invokefood.js
```

### Back-end 서버 실행
```bash
$ cd /workspaces/CLOUD_WEB_Blo-my_Byzantium/WEB/backend
$ pip install -r requirements.txt
$ python manage.py runserver
```
### Front-end 실행
```bash
$ cd /workspaces/CLOUD_WEB_Blo-my_Byzantium/WEB/frontend
$ yarn
$ yarn build
$ yarn start
```

### Hyperledgher-fabric 서버 개발자 기능
- /workspaces/CLOUD_WEB_Blo-my_Byzantium/fabric-samples/README.md 참조

# 제공 기능 (Service)
<img src = "./doc/images/authority.png">
 Blo-my에서는 용사와 간부로 유저 계층을 나누어 서비스를 제공한다. 계층별로 제공되는 서비스는 위와 같다.


## 총기 수불
|<img src = "./doc/images/service/FirArmAssetsSearch.gif" width=400px>|<img src = "./doc/images/service/FireArmAssetsNow.gif" width=400px>|
|--|--|
|▲총기 검색|▲총기 현황 조회|
|<img src = "./doc/images/service/FireArmAssetsUpdate.gif" width=400px>|<img src = "./doc/images/service/FirArmAssetsLists.gif" width=400px>|
|▲총기 업데이트|▲총기 목록 조회|

## 부식 작전
|<img src = "./doc/images/service/Food.gif" width=300px>|<img src = "./doc/images/service/FoodDataSearch.gif" width=300px>|<img src = "./doc/images/service/FoodDataList.gif" width=300px>|
|--|--|--|
|▲부식 작전 페이지|▲부식 작전 내역 검색|▲부식 작전 목록 조회|
 
# 팀 정보 (Team Information)
<img src = "./doc/images/member.png">

# 저작권 및 사용권 정보 (Copyleft / End User License)
## License
- Apache-2.0(IBM corp all rights reserved)
## 이모티콘 출처
- https://www.flaticon.com/
## 참조
- https://github.com/hyperledger/fabric-samples
- https://github.com/hyperledger/blockchain-explorer
