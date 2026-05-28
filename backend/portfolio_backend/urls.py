from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from core.views import get_stats, submit_contact, get_projects, get_experiences

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/stats/", get_stats, name="get_stats"),
    path("api/contact/", submit_contact, name="submit_contact"),
    path("api/projects/", get_projects, name="get_projects"),
    path("api/experiences/", get_experiences, name="get_experiences"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
