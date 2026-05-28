import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from .models import ProfileStats, ContactInquiry, Project, Experience, Resume

def get_stats(request):
    """
    Fetch the global profile statistics. Auto-creates a default row 
    if none exists so the frontend always has data.
    """
    stats = ProfileStats.objects.first()
    if not stats:
        stats = ProfileStats.objects.create(linkedin_followers="12,300+")
    
    active_resume = Resume.objects.filter(is_active=True).order_by('-uploaded_at').first()
    if active_resume:
        resume_url = request.build_absolute_uri(active_resume.file.url)
    elif stats.resume:
        resume_url = request.build_absolute_uri(stats.resume.url)
    else:
        resume_url = None

    return JsonResponse({
        "linkedin_followers": stats.linkedin_followers,
        "resume": resume_url,
        "updated_at": stats.updated_at.isoformat() if stats.updated_at else None
    })

@csrf_exempt
@require_http_methods(["POST"])
def submit_contact(request):
    """
    Handle contact submissions. Saves inquiries under 'HIRE' or 'FREELANCE' protocols.
    """
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON payload"}, status=400)

    name = data.get("name", "").strip()
    email = data.get("email", "").strip()
    inquiry_type = data.get("inquiry_type", "").strip().upper()
    message = data.get("message", "").strip()

    # Basic validations
    if not name or not email or not message or not inquiry_type:
        return JsonResponse({"error": "All fields (name, email, inquiry_type, message) are required."}, status=400)

    if inquiry_type not in ["HIRE", "FREELANCE"]:
        return JsonResponse({"error": "Invalid inquiry type. Must be 'HIRE' or 'FREELANCE'."}, status=400)

    # Mode-specific fields
    company = data.get("company", "").strip()
    job_title = data.get("job_title", "").strip()
    project_domain = data.get("project_domain", "").strip()
    budget_scope = data.get("budget_scope", "").strip()

    if inquiry_type == "HIRE":
        if not company or not job_title:
            return JsonResponse({"error": "Company and Job Title are required for Hire protocol."}, status=400)
        # Clear freelance fields
        project_domain = None
        budget_scope = None
    elif inquiry_type == "FREELANCE":
        if not project_domain or not budget_scope:
            return JsonResponse({"error": "Project Domain and Budget Scope are required for Freelance protocol."}, status=400)
        # Clear hire fields
        company = None
        job_title = None

    # Save to database
    inquiry = ContactInquiry.objects.create(
        name=name,
        email=email,
        inquiry_type=inquiry_type,
        message=message,
        company=company,
        job_title=job_title,
        project_domain=project_domain,
        budget_scope=budget_scope
    )

    return JsonResponse({
        "status": "success",
        "message": f"Inquiry saved successfully under {inquiry.get_inquiry_type_display()} protocol.",
        "id": inquiry.id
    }, status=201)

def get_projects(request):
    """
    Fetch all projects. Auto-seeds default projects if none exist.
    """
    projects = Project.objects.all().order_by('order', '-created_at')
    if not projects.exists():
        Project.objects.create(
            title="Autonomous AI Support System",
            type="GenAI / Infrastructure",
            desc="An intelligent autonomous agent orchestrated via LangGraph and OpenAI APIs, engineered to dynamically resolve complex queries with context-aware logic chains.",
            tech="Python, LangChain, FastAPI, AWS",
            link="#",
            github="#",
            order=0
        )
        Project.objects.create(
            title="Distributed Microservices Core",
            type="Backend System",
            desc="A highly scalable backend architecture utilizing Django and PostgreSQL. Containerized via Docker for reliable deployment and optimized for high-throughput REST API interactions.",
            tech="Django, PostgreSQL, Docker, REST API",
            link="#",
            github="#",
            order=1
        )
        projects = Project.objects.all().order_by('order', '-created_at')
        
    data = []
    for proj in projects:
        data.append({
            "id": proj.id,
            "title": proj.title,
            "type": proj.type,
            "desc": proj.desc,
            "tech": [t.strip() for t in proj.tech.split(",") if t.strip()],
            "link": proj.link,
            "github": proj.github,
            "video_link": proj.video_link if proj.video_link else None,
            "order": proj.order
        })
    return JsonResponse(data, safe=False)

def get_experiences(request):
    """
    Fetch all experiences. Auto-seeds default experiences if none exist.
    """
    experiences = Experience.objects.all().order_by('order', '-created_at')
    if not experiences.exists():
        Experience.objects.create(
            title="Google Student Ambassador",
            company="Google",
            type="Internship",
            duration="Aug 2025 – Jan 2026 (6 mos)",
            desc="Represented Google on campus, organizing tech workshops and fostering developer communities.",
            tech="",
            order=0
        )
        Experience.objects.create(
            title="Open Source Developer",
            company="Hacktoberfest",
            type="Part-time, Remote",
            duration="Oct 2025 (1 mo)",
            desc="Contributed to multiple high-impact open-source repositories and resolved backend infrastructure issues.",
            tech="Open-Source Software, Open-Source Development, Backend Engineering",
            order=1
        )
        experiences = Experience.objects.all().order_by('order', '-created_at')
        
    data = []
    for exp in experiences:
        data.append({
            "id": exp.id,
            "title": exp.title,
            "company": exp.company,
            "type": exp.type,
            "duration": exp.duration,
            "desc": exp.desc,
            "tech": [t.strip() for t in exp.tech.split(",") if t.strip()],
            "order": exp.order
        })
    return JsonResponse(data, safe=False)
