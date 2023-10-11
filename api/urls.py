from django.urls import path
from . import views

urlpatterns = [
    path('get-all-banks/', views.BankListAPIView.as_view(), name='get-all-banks'),
    path('get-bank/', views.BankDetailAPIView.as_view(), name='get-bank'),
]