#models.py
from django.db import models


class Foods(models.Model):
    objects = models.Manager()                                            # 오류제거용


    opType = models.TextField()

    Affiliated_Unit = models.TextField(default = '-')
    FoodName = models.TextField(default = '-')
    Amount = models.TextField(default = '-')

    created = models.DateTimeField(auto_now_add = True)                     # 데이터생성일자. 자동생성됨


    class Meta:
        ordering = ['created']
