## 서버실행방법

'''
cd WEB/backend
pip install -r requirements.txt
python manage.py runserver
'''



## 기술 스택 (Technique Used) 

### Server(back-end)
 - Python   3.8.6 
 - pip      21.2.4
 - Django   3.2.7
 - sqlite3



## 백엔드 API 사용법

### Account 관리 (localhost/account)
 - GET /account/
    - 전체 계정 목록 반환
 
 - POST /account/
    - 계정 생성
    - serializer.py , fields 부분에 있는 값을 json으로 요청

- GET /account/(유저번호)
    - 특정 유저정보 반환
 
- POST /login/



## 작업해야할목록

SECRET_KEY 보호
DEBUG False