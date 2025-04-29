from django.shortcuts import render
from django.shortcuts import render, redirect
from .models import Ambassador
from .utils import send_ambassador_email, send_admin_email
from datetime import datetime
from django.http import JsonResponse

# Create your views here.

def lander(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        phone = request.POST.get('phone')
        message = request.POST.get('message')
        dial_code = request.POST.get('country_code')
        country = request.POST.get('country')

        # Save to database
        Ambassador.objects.create(
            full_name=name,
            email=email,
            phone_number=phone,
            message=message,
            dial_code=dial_code,
            country=country
        )

        # Send emails
        send_ambassador_email(name, email)
        send_admin_email(name, email, phone, message, dial_code, country)

        return JsonResponse({'status': 'success'})
    return render(request, 'main/lander.html', {
        'timestamp': int(datetime.now().timestamp())
    })


def register(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        phone = request.POST.get('phone')
        message = request.POST.get('message')
        dial_code = request.POST.get('country_code')
        country = request.POST.get('country')

        # Save to database
        Ambassador.objects.create(
            full_name=name,
            email=email,
            phone_number=phone,
            message=message,
            dial_code=dial_code,
            country=country
        )

        # Send emails
        send_ambassador_email(name, email)
        send_admin_email(name, email, phone, message, dial_code, country)

        return JsonResponse({'status': 'success'})

    return render(request, 'main/register.html')


def thankyou(request):
    return render(request, 'main/thankyou.html')


