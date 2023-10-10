from django.urls import path

from .views import BanksWithinMapBoundsView, BankDetailsView

app_name = 'api'

urlpatterns = [
    path('map-banks/', BanksWithinMapBoundsView.as_view(), name='map_bank'),
    path('bank/', BankDetailsView.as_view(), name='bank_detail'),

]