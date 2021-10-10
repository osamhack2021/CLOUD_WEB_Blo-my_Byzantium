#serializers.py
from rest_framework import serializers
from .models import Firearm


class ModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Firearm
        fields = ['opType','SerialNumber','Owner','Affiliated_Unit', 'Misc','UpdateReason']


class CreatedataSerializer(serializers.ModelSerializer):
    class Meta:
        model = Firearm
        fields = ['opType','SerialNumber','Owner','Affiliated_Unit','Misc','UpdateReason']


class changeFirearmOwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Firearm
        fields = ['opType','SerialNumber','Owner','UpdateReason']

        

class changeMiscSerializer(serializers.ModelSerializer):
    class Meta:
        model = Firearm
        fields = ['opType','SerialNumber','Misc','UpdateReason']


class changeLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Firearm
        fields = ['opType','SerialNumber','Affiliated_Unit']
