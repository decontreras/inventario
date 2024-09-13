from django.urls import path
from .views import InventoryProductListCreate, InventoryProductUpdate

urlpatterns = [
    path('inventory-product', InventoryProductListCreate.as_view(), name='inventory-product-list-create'),
    path('inventory-product/<str:pk>', InventoryProductUpdate.as_view(), name='inventory-product-update'),
]
