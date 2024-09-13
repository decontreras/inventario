from rest_framework import generics
from .models import ProductType
from .serializers import ProductTypeSerializer
from django.db import connections

class ProductTypeList(generics.ListAPIView):
    serializer_class = ProductTypeSerializer

    def get_queryset(self):
        return ProductType.objects.all()
