#urls.py
from django.conf.urls import url, include
from . import views
from django.urls import path



urlpatterns = [
    path('', views.showalldata),

    path('queryAllUnits', views.queryAllUnits),

    path('createUnit', views.createUnit),
    path('checkinFood', views.checkinFood),
    path('checkoutFood', views.checkoutFood),

    path('queryUnit/<str:search_unit>', views.queryUnit),
    path('GetUnitHistory/<str:search_unit>', views.GetUnitHistory),

    path('approve', views.approve),

    #url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]