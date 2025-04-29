from django.urls import path
from . import views

urlpatterns = [
    path("", views.lander, name="lander"),
    path("register/", views.register, name="register"),
    path("thankyou/", views.thankyou, name="thankyou"),
]

