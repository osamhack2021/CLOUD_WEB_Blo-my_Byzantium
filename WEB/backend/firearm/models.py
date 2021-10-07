#models.py
from django.db import models


class Firearm(models.Model):
    objects = models.Manager()                                            # 오류제거용

    serialnumber = models.CharField(max_length = 30, unique= True)        
    owner = models.CharField(max_length = 30)

    affiliated_Unit = models.TextField()
    update_note = models.TextField()




    class Meta:
        ordering = ['created']
