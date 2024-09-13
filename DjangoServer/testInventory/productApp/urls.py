from django.urls import path
from .views import ProductTypeList

urlpatterns = [
    path('product-types', ProductTypeList.as_view(), name='product-type-list'),
]
