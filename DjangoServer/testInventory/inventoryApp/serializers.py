from rest_framework import serializers
from .models import InventoryProduct

class InventoryProductSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    product_type = serializers.IntegerField()
    serial_number = serializers.IntegerField()
    shipping_status = serializers.BooleanField()

    def create(self, validated_data):
        return InventoryProduct.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.product_type = validated_data.get('product_type', instance.product_type)
        instance.serial_number = validated_data.get('serial_number', instance.serial_number)
        instance.shipping_status = validated_data.get('shipping_status', instance.shipping_status)
        instance.save()
        return instance
