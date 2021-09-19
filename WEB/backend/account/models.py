#models.py
from django.db import models

class Account(models.Model):
    objects = models.Manager()      # 오류제거용

    military_id = models.CharField(max_length = 14, default = '')         # 군번 입력란. "-" 입력 필수 (ID로 쓰임)
    password = models.CharField(max_length = 30, default = '')            # 비밀번호
    permission = models.IntegerField(default = 2)                         # 관리등급(0이 관리자, 1은 블록생성가능 , 2는 블록의이동만 가능)

    name = models.CharField(max_length = 15, default = '')                # 성명
    rank = models.CharField(max_length = 30, default = '')                # 계급
    affiliated_unit = models.CharField(max_length = 150, default = '')    # 소속 부대

    phone_number = models.CharField(max_length = 30, default = '')        # 전화번호
    email = models.CharField(max_length = 30, default = '')               # 이메일 주소


    created = models.DateTimeField(auto_now_add=True)   # 계정생성일자. 자동생성됨

    class Meta:
        ordering = ['created']
