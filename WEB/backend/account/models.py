#models.py
from django.db import models

class Account(models.Model):
    objects = models.Manager()      #오류제거용

    name = models.CharField(max_length=15)
    phone_number = models.CharField(max_length=15)
    address = models.TextField()
    created = models.DateTimeField(auto_now_add=True)   #자동생성됨

    class Meta:
        ordering = ['created']
