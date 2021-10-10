#backend/djangoreactapi/urls.py
from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('post.urls')),
    path('account/', include('account.urls')),
    path('firearm/', include('firearm.urls')),
    path('', RedirectView.as_view(url='account/', permanent=False)),    #blank auto redirect
]
