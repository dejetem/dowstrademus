from django.apps import AppConfig
from django.db import connection


class ElectionAppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'election_app'

    def ready(self):
        try:
            # Test database connection
            with connection.cursor() as cursor:
                cursor.execute("SELECT 1")
            print("ok")
        except Exception as e:
            print("Database connection failed:", e)
