from django.db import models

class ProfileStats(models.Model):
    linkedin_followers = models.CharField(max_length=50, default="12,300+")
    resume = models.FileField(upload_to="resumes/", null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Profile Stat"
        verbose_name_plural = "Profile Stats"

    def __str__(self):
        return f"Stats (LinkedIn: {self.linkedin_followers})"

class ContactInquiry(models.Model):
    INQUIRY_CHOICES = [
        ('HIRE', 'Full-Time Hire'),
        ('FREELANCE', 'Freelance Project'),
    ]

    name = models.CharField(max_length=150)
    email = models.EmailField()
    inquiry_type = models.CharField(max_length=20, choices=INQUIRY_CHOICES)
    message = models.TextField()
    
    # Hire Protocol specific details
    company = models.CharField(max_length=150, null=True, blank=True)
    job_title = models.CharField(max_length=150, null=True, blank=True)
    
    # Freelance Protocol specific details
    project_domain = models.CharField(max_length=150, null=True, blank=True)
    budget_scope = models.CharField(max_length=50, null=True, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Contact Inquiry"
        verbose_name_plural = "Contact Inquiries"
        ordering = ['-created_at']

    def __str__(self):
        return f"Inquiry from {self.name} ({self.get_inquiry_type_display()})"

class Project(models.Model):
    title = models.CharField(max_length=200)
    type = models.CharField(max_length=150)
    desc = models.TextField()
    tech = models.CharField(max_length=300, help_text="Comma-separated values, e.g. React, Django, Docker")
    link = models.CharField(max_length=300, default="#", blank=True)
    github = models.CharField(max_length=300, default="#", blank=True)
    video_link = models.CharField(max_length=300, null=True, blank=True, help_text="Direct link to a demo video (mp4, YouTube, etc.)")
    order = models.IntegerField(default=0, help_text="Order in which it is displayed")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Project"
        verbose_name_plural = "Projects"
        ordering = ['order', '-created_at']

    def __str__(self):
        return self.title

class Experience(models.Model):
    title = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    type = models.CharField(max_length=100, help_text="e.g. INTERNSHIP, FULL-TIME, PART-TIME, CONTRACT")
    duration = models.CharField(max_length=150, help_text="e.g. Aug 2025 - Jan 2026 (6 mos)")
    desc = models.TextField()
    tech = models.CharField(max_length=300, blank=True, help_text="Comma-separated values, e.g. Python, Docker, AWS")
    order = models.IntegerField(default=0, help_text="Order in which it is displayed")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Experience"
        verbose_name_plural = "Experiences"
        ordering = ['order', '-created_at']

    def __str__(self):
        return f"{self.title} at {self.company}"

class Resume(models.Model):
    file = models.FileField(upload_to="resumes/")
    is_active = models.BooleanField(default=True, help_text="Set to True to make this the active CV/resume downloaded from the site.")
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Resume/CV"
        verbose_name_plural = "Resume/CVs"
        ordering = ['-uploaded_at']

    def __str__(self):
        return f"Resume - {self.uploaded_at.strftime('%Y-%m-%d %H:%M:%S')}"
