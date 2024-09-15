import pandas as pd
from celery import shared_task
from django.core.mail import send_mail
from django.conf import settings
from .models import FileUpload, Student
import logging

logger = logging.getLogger(__name__)

@shared_task
def process_file_upload(file_upload_id):
    logger.info(f"Processing file upload with ID {file_upload_id}")
    file_upload = FileUpload.objects.get(id=file_upload_id)
    try:
        if file_upload.file.name.endswith('.csv'):
            df = pd.read_csv(file_upload.file.path)
        elif file_upload.file.name.endswith(('.xls', '.xlsx')):
            df = pd.read_excel(file_upload.file.path)
        else:
            raise ValueError("Unsupported file format")
        
        # Strip extra spaces from column names
        df.columns = df.columns.str.strip()
        
        if 'year_of_study' not in df.columns:
            raise KeyError("Column 'year_of_study' not found in CSV file")

        df['year_of_study'] = df['year_of_study'].astype(str)

        for _, row in df.iterrows():
            try:
                # Convert 'year_of_study' to date
                year_of_study_date = pd.to_datetime(row['year_of_study']).date()

            

                Student.objects.update_or_create(
                    student_id=row['student_id'],
                    defaults={
                        'first_name': row['first_name'],
                        'last_name': row['last_name'],
                        'email': row['email'],
                        'department': row['department'],
                        'year_of_study': year_of_study_date
                    }
                )
            except Exception as e:
                print(f"Error processing row {row}: {e}")

        file_upload.status = 'COMPLETED'
        file_upload.save()

        send_mail(
            'File Upload Complete',
            f'Your file {file_upload.file.name} has been successfully processed.',
            settings.EMAIL_HOST_USER,
            [file_upload.uploaded_by.email],
            fail_silently=False,
        )
    except Exception as e:
        print(f"Error processing file upload: {e}")
        file_upload.status = 'FAILED'
        file_upload.error_message = str(e)
        file_upload.save()

        send_mail(
            'File Upload Failed',
            f'Your file {file_upload.file.name} could not be processed. Error: {str(e)}',
            settings.EMAIL_HOST_USER,
            [file_upload.uploaded_by.email],
            fail_silently=False,
        )

