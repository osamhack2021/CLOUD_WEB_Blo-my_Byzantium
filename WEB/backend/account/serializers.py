#serializers.py
from rest_framework import serializers
from .models import User


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'permission', 'name', 'rank', 'affiliated_unit', 'phone_number', 'email']
        
        # id는 유저고유번호입니다.