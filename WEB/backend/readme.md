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
    - id는 유저고유번호입니다.
 
 - POST /account/
    - 계정 생성
    - serializer.py , fields 부분에 있는 값을 json으로 요청
    - 계정생성 json 형식은 이렇습니다:
        '''
        {
            "username" : "20-00000000" ,     #군번필드는 중첩되어서는 안되고, 블록 데이터베이스의 owner와 연동됩니다
            "password" : "pass123!" , 
            "permission" : 2 , 
            "name" : "이름" , 
            "rank" : "상병" , 
            "affiliated_unit" : "소속부대" , 
            "phone_number" : "010-9999-9999" , 
            "email" : "armyblockchain@gmail.com"
        }
        '''
        //주의할점은 permission은 int값입니다. 문자열이 아닙니다
        //또한 json은 " (쌍따옴표)로 감싸야 오류가 발생하지 않습니다.


- GET /account/(유저고유번호)
    - 특정 유저정보 반환
    
- DELETE /account/(유저고유번호)
    - 특정 유저 삭제

- PUT /account/(유저고유번호)
    - 특정 유저 정보 수정
 

- POST /account/login/
    - 로그인 json 형식은 이렇습니다:
        '''
        {
            "username" : "20-00000000" ,
            "password" : "pass123!"
        }
        '''







## 작업해야할목록

SECRET_KEY 보호
DEBUG False