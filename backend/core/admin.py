from django.contrib import admin
from .models import ProfileStats, ContactInquiry, Project, Experience, Resume

@admin.register(Resume)
class ResumeAdmin(admin.ModelAdmin):
    list_display = ('id', 'file', 'is_active', 'uploaded_at')
    list_editable = ('is_active',)
    list_filter = ('is_active', 'uploaded_at')

@admin.register(ProfileStats)
class ProfileStatsAdmin(admin.ModelAdmin):
    list_display = ('linkedin_followers', 'resume', 'updated_at')

    def has_add_permission(self, request):
        # Allow creating only 1 instance for global stats settings
        return ProfileStats.objects.count() == 0

@admin.register(ContactInquiry)
class ContactInquiryAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'inquiry_type', 'company', 'job_title', 'project_domain', 'budget_scope', 'created_at')
    list_filter = ('inquiry_type', 'created_at', 'budget_scope')
    search_fields = ('name', 'email', 'message', 'company', 'job_title', 'project_domain')
    readonly_fields = ('name', 'email', 'inquiry_type', 'company', 'job_title', 'project_domain', 'budget_scope', 'message', 'created_at')
    
    def has_add_permission(self, request):
        return False # Submissions are only created via API

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'type', 'order', 'video_link', 'created_at')
    list_editable = ('order',)
    list_filter = ('type', 'created_at')
    search_fields = ('title', 'type', 'desc', 'tech')

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ('title', 'company', 'type', 'duration', 'order', 'created_at')
    list_editable = ('order',)
    list_filter = ('type', 'company', 'created_at')
    search_fields = ('title', 'company', 'desc', 'tech')
