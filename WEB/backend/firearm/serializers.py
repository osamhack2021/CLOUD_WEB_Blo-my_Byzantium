#serializers.py
from rest_framework import serializers
from .models import Firearm


class ModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Firearm
        fields = ['opType','SerialNumber', 'model', 'Owner', 'Affiliated_Unit', 'status','UpdateReason']




class createFirearmSerializer(serializers.ModelSerializer):                             #총기 생성
    class Meta:
        model = Firearm
        fields = ['opType','SerialNumber', 'model', 'Owner', 'Affiliated_Unit', 'status','UpdateReason']


class checkoutFirearmSerializer(serializers.ModelSerializer):                           #총기 불출
    class Meta:
        model = Firearm
        fields = ['opType','SerialNumber', 'status','UpdateReason']


class checkinFirearmSerializer(serializers.ModelSerializer):                            #총기 반납
    class Meta:
        model = Firearm
        fields = ['opType','SerialNumber', 'status','UpdateReason']


class changeFirearmAttributesSerializer(serializers.ModelSerializer):                   #총기 상태 변경
    class Meta:
        model = Firearm
        fields = ['opType','SerialNumber', 'model', 'Owner', 'Affiliated_Unit', 'status','UpdateReason']


class deleteFirearmSerializer(serializers.ModelSerializer):                              #총기 삭제
    class Meta:
        model = Firearm
        fields = ['opType','SerialNumber']