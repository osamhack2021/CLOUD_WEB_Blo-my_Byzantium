#urls.py
from django.conf.urls import url, include
from . import views
from django.urls import path



urlpatterns = [
    path('', views.showalldata),
    path('queryAllFirearms', views.queryAllFirearms),

    path('createFirearm', views.createFirearm),
    path('checkoutFirearm', views.checkoutFirearm),
    path('checkinFirearm', views.checkinFirearm),
    path('changeFirearmAttributes', views.changeFirearmAttributes),
    path('deleteFirearm', views.deleteFirearm),

    path('seeFireArmAssetWithSerialNum/<int:SerialNum>', views.seeFireArmAssetWithSerialNum),
    path('querySerialNumber/<int:SerialNum>', views.querySerialNumber),
    path('approve', views.approve),
    #url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]