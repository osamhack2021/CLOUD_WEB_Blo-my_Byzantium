#backend/post/urls.py
from django.urls import path
from post import views


urlpatterns = [
    path('', views.ListPost.as_view()),
    path('<int:pk>/', views.DetailPost.as_view()),
]
