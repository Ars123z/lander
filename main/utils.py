from django.core.mail import send_mail
from django.conf import settings
from django.core.mail import EmailMessage
import os


def send_ambassador_email(name, email):
    subject = "Thanks for becoming a Style Ambassador!"
    body = f"Hey {name},\n\nThanks for signing up as a Style Ambassador! We've attached your Starter Guide PDF below. We'll get in touch with you soon.\n\nCheers!"
    
    email_msg = EmailMessage(
        subject=subject,
        body=body,
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=[email],
    )

    # Attach the PDF
    pdf_path = os.path.join(settings.BASE_DIR, 'static/main/files/coming_soon.pdf')  # adjust path as needed
    email_msg.attach_file(pdf_path)

    email_msg.send()


def send_admin_email(name, email, phone, message, dial_code, country):
    subject = "New Style Ambassador Registration"
    body = (
        f"New Ambassador Details:\n\n"
        f"Name: {name}\n"
        f"Email: {email}\n"
        f"Phone: {dial_code} {phone}\n"
        f"Country: {country}\n"
        f"Message: {message}"
    )
    send_mail(subject, body, settings.DEFAULT_FROM_EMAIL, [settings.ADMIN_EMAIL])
