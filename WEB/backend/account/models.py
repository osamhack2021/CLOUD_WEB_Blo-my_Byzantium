#models.py
from django.contrib.auth.hashers import make_password
from django.db import models
from django.contrib.auth.models import AbstractUser
import string


class User(AbstractUser):
    objects = models.Manager()                                            # 오류제거용
    

    username = models.CharField(max_length = 14,  unique= True)         # 군번 입력란. "-" 입력 필수 (ID로 쓰임)
    password = models.CharField(max_length = 30)            # 비밀번호
    validated_password = str(password)
    validated_password = make_password(validated_password)
    validated_password = models.CharField(max_length = 30, default='')


    permission = models.IntegerField(default = 2)                         # 관리등급(0이 관리자, 1은 블록생성가능 , 2는 블록의이동만 가능)

    name = models.CharField(max_length = 15)                # 성명
    rank = models.CharField(max_length = 30)                # 계급
    affiliated_unit = models.CharField(max_length = 150)    # 소속 부대

    phone_number = models.CharField(max_length = 30)        # 전화번호
    email = models.CharField(max_length = 30)               # 이메일 주소


    created = models.DateTimeField(auto_now_add=True)                     # 계정생성일자. 자동생성됨

    class Meta:
        ordering = ['created']
