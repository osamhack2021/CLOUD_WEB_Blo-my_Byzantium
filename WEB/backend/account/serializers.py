#serializers.py
from django.db.models import fields
from rest_framework import serializers
from .models import User
from django.contrib.auth.hashers import make_password


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'permission', 'name', 'rank', 'affiliated_unit', 'phone_number', 'email']
    

        # id는 유저고유번호입니다.
        # username은 군번필드입니다