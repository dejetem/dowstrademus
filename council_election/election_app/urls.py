

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, StudentViewSet, FileUploadViewSet


router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'students', StudentViewSet)
router.register(r'file-uploads', FileUploadViewSet)

urlpatterns = [
    path('', include(router.urls)),
]