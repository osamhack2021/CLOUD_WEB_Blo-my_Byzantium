#models.py
from django.db import models


class Firearm(models.Model):
    objects = models.Manager()                                            # 오류제거용

    opType = models.TextField()

    SerialNumber = models.CharField(max_length = 50, default = '-')     
    Weapon_Model = models.CharField(max_length = 50, default = '-')    
    Owner = models.CharField(max_length = 50, default = '-')

    Affiliated_Unit = models.TextField(default = '-')
    status = models.TextField(default = '-')
    UpdateReason = models.TextField(default = '-')

    created = models.DateTimeField(auto_now_add = True)                     # 데이터생성일자. 자동생성됨


    class Meta:
        ordering = ['created']
