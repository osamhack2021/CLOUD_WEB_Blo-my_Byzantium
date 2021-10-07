#serializers.py
from django.db.models import fields
from rest_framework import serializers
from .models import Firearm


class ModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Firearm
        fields = ['serialnumber','owner','affiliated_Unit','update_note']
    

        # id는 유저고유번호입니다.