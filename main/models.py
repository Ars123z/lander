from django.db import models

# Create your models here.

class Ambassador(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=20)
    dial_code = models.CharField(max_length=10)  # E.g., +91
    country = models.CharField(max_length=100)
    message = models.TextField(blank=True, null=True)

    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.full_name} from {self.country}"
