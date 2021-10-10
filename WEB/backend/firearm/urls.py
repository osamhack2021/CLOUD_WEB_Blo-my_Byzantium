#urls.py
from django.conf.urls import url, include
from . import views
from django.urls import path



urlpatterns = [
    path('', views.showalldata),
    path('createdata', views.createdata),
    path('seeFireArmAssetWithSerialNum/<int:SerialNum>', views.seeFireArmAssetWithSerialNum),
    path('changeMisc', views.changeMisc),
    path('changeLocation', views.changeLocation),
    path('querySerialNumber/<int:SerialNum>', views.querySerialNumber),
    #path('login/', views.login),
    #url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]