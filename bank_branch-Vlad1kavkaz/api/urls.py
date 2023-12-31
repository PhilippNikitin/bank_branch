from django.urls import path
from . import views

urlpatterns = [
    path('get-all-banks/', views.BankListAPIView.as_view(), name='get-all-banks'),
    path('get-bank/', views.BankDetailAPIView.as_view(), name='get-bank'),
    path('best-banks/', views.BestBankView.as_view(), name='best-banks'),
    path('queue/', views.StayQueue.as_view(), name='queue'),
    path('map-banks/', views.BanksWithinMapBoundsView.as_view(), name='map_bank'),
]