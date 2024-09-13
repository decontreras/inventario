from django.db import models

class ProductType(models.Model):
    name = models.CharField(max_length=255, default='Default Name')

    class Meta:
        db_table = 'test_product_types'

    def __str__(self):
        return self.name
