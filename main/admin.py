from django.contrib import admin
from .models import Ambassador

@admin.register(Ambassador)
class AmbassadorAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'phone_number', 'email', 'country')
    search_fields = ('full_name', 'email', 'phone_number', 'country')
    list_filter = ('country',)
    ordering = ('-submitted_at',)

    fieldsets = (
        ('Personal Info', {
            'fields': ('full_name', 'email', 'phone_number', 'dial_code', 'country', 'message')
        }),
    )

