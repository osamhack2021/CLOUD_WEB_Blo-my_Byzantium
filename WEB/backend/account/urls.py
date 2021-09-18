#urls.py
from django.conf.urls import url, include
from . import views
from django.urls import path


urlpatterns = [
    path('', views.account_list),
    path('account/', views.account_list),
    path('account/<int:pk>/', views.account),
    path('login/', views.login),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]