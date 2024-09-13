from mongoengine import Document, fields

class InventoryProduct(Document):
    product_type = fields.IntField(required=True)
    serial_number = fields.LongField(required=True)
    shipping_status = fields.BooleanField(default=False)

    def __str__(self):
        return f"Product {self.product_type} - {self.serial_number}"
