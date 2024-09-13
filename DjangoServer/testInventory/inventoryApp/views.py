from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .models import InventoryProduct
from .serializers import InventoryProductSerializer
from bson import ObjectId

class InventoryProductListCreate(generics.ListCreateAPIView):
    serializer_class = InventoryProductSerializer

    def get_queryset(self):
        return InventoryProduct.objects.all()

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class InventoryProductUpdate(generics.UpdateAPIView):
    serializer_class = InventoryProductSerializer

    def get_object(self):
        pk = self.kwargs.get('pk')
        return InventoryProduct.objects.get(pk=ObjectId(pk))

    def patch(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
