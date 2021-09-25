# Block Chain PART

## 환경설정 안내 (Setting) Process)
 - VSCODE의 extensions기능을 이용해 'Go' extension 설치
 - VSCODE의 extensions기능을 이용해 'REST Client' extension 설치
 - ```git clone -b Blockchain --single-branch https://github.com/osamhack2021/CLOUD_WEB_Blo-my_Byzantium.git```
 - ```cd CLOUD_WEB_Blo-my_Byzantium/BLOCKCHAIN```
 - ```go get github.com/gorilla/mux```

## 기술 스택 (Technique Used) )
 - Golang
 - gorillamux를 활용한 restAPI 구현

 ## 기능 설명
 - main.go를 실행
    ```go run main.go```
 - VSCODE를 이용해 test.http 파일 오픈
 - test.http파일의 각 URL 위에 떠 있는 'Send Request' 버튼을 통해 request 전송 가능
 - //튜토리얼 시작 ~ //튜토리얼 종료 까지 URL을 실행해보면서 튜토리얼 진행 가능

  ###  부식 데이터 관리(http://localhost:8080/fooddata)
 - ``/fooddata``
URL들에 대한 설명 출력

 - ``/fooddata/admin/provide/{address}/{food}/{amount}``
 address에 food를 amount만큼 제공(가장 처음에 할당하는 데이터), 생성된 데이터를 mempool에 보관함

 - ``/fooddata/admin/approve``
 승인나지 않은 데이터를 승인. mempool에 있는 데이터를 block으로 생성

 - ``/fooddata/admin/mempool``
 mempool 조회.(아직 어플을 사용할 user용 URL이 아님. 프로젝트 설계에서는 해당 기능을 사용하지 않기 때문에 미완성으로 둠. 추후 보기 쉽게 변경할 예정)

 - ``/fooddata/makefooddata/{food}/{from}/{to}/{amount}``
 from에서 amount만큼의 food를 to로 전달함. to에서 해당 음식을 받았을 때 사용하는 기능

 - ``/fooddata/see/{date}/{food}``
 해당 date에 해당 food의 대한 유통 정보 조회. {date}는 yyyy-MM-dd 형식에 맞춰서 적어야함. ex) /fooddata/see/2021-09-22/Kimchi

   ###  함수 플로우차트
   - 전체적인 함수 플로우 차트
   ![FlowChart](./image/FlowChart.png)

   - /fooddata/makefooddata/{food}/{from}/{to}/{amount}
   ![makefooddata](./image/makefooddata.png)

   - /fooddata/admin/approve
   ![approve](./image/approve.png) 



  ###  총기 데이터 관리(http://localhost:8080/firearmAssets)
 - ``/firearmAssets``
 URL들에 대한 설명 출력

 - ``/firearmAssets/admin/makeFireArm/{serialNum}/{model}/{note}``
 해당 model의 총기번호 serialNum인 총이 제작됨. note에는 비고 작성, 생성된 데이터를 mempool에 보관함

 - ``/firearmAssets/admin/approve``
 승인나지 않은 데이터를 승인. mempool에 있는 데이터를 block으로 생성

 - ``/firearmAssets/admin/mempool``
 mempool 조회.(아직 어플을 사용할 user용 URL이 아님. 프로젝트 설계에서는 해당 기능을 사용하지 않기 때문에 미완성으로 둠. 추후 보기 쉽게 변경할 예정)

 - ``/firearmAssets/move/{serialNum}/{ownP}/{ownCo}/{ownBn}/{ownDiv}``
 해당 serialNum의 총기의 위치가 ownP-ownCo-ownBn-ownDiv로 이동됨.

 - ``/firearmAssets/ownerchange/{serialNum}/{owner}``
 해당 serialNum의 총기 소유주가 owner로 변경됨.

 - ``/firearmAssets/notes/{serialNum}/{notes}``
 해당 serialNum의 총기에 비고 작성

 - ``/firearmAssets/see/{serialNum}``
 해당 serialNum 총기의 모든 데이터 조회


  ## 작업해야할목록
   - account에 따른 wallet 구현
   - DB 연결(임시)
   - DB 연결 제거 후 P2P방식의 서버 구현