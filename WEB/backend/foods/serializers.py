#serializers.py
from rest_framework import serializers
from .models import Foods


class ModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Foods

        fields = ['opType','Affiliated_Unit', 'FoodName', 'Amount']



class AffiliatedUnitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Foods

        fields = ['opType','Affiliated_Unit']


