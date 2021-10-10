#models.py
from django.db import models


class Firearm(models.Model):
    objects = models.Manager()                                            # 오류제거용

    opType = models.TextField(default = '')

    SerialNumber = models.CharField(max_length = 30)        
    Owner = models.CharField(max_length = 30)

    Affiliated_Unit = models.TextField()
    Misc = models.TextField(default = '')
    UpdateReason = models.TextField()

    created = models.DateTimeField(auto_now_add=True)                     # 계정생성일자. 자동생성됨


    class Meta:
        ordering = ['created']
