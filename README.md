# 🚀 AI CAMPUS RECRUITMENT SYSTEM

**Production-ready AI-driven campus recruitment platform with real NLP-powered resume analysis.**

[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://www.python.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19+-61DAFB.svg)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.109-009688.svg)](https://fastapi.tiangolo.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248.svg)](https://www.mongodb.com/)

---

## 📋 Overview

This system revolutionizes campus recruitment with **real AI-powered resume analysis**:
- **PDF/DOCX Parsing** - Extracts text from resume files using PyMuPDF and python-docx
- **NLP Skill Extraction** - Uses spaCy with custom taxonomy of 500+ technical and soft skills
- **Semantic Skill Matching** - Sentence transformers for fuzzy matching (e.g., "JS" → "JavaScript")
- **Experience & Education Parsing** - Regex + NLP to extract work history, degrees, certifications
- **Deterministic Scoring** - Transparent algorithm: 50% skills + 20% experience + 15% education + 15% quality
- **Actionable Recommendations** - Personalized feedback for rejected candidates

**NO mocks. NO hardcoded scores. NO placeholders. Real AI.**

---

## 💻 Source Code

GitHub Repository:
https://github.com/Kaja-avinash/AI-Campus-Recruitment-System

---

## 🌐 Live Deployment

### Live Application
Frontend: https://ai-campus-recruitment-system.onrender.com

### API Services
Backend API: https://ai-campus-backend-g4i8.onrender.com

AI Resume Analysis Service: https://ai-campus-ai-service.onrender.com

### Health Checks
Backend Health:
https://ai-campus-backend-g4i8.onrender.com/api/health

AI Service Health:
https://ai-campus-ai-service.onrender.com/health

---

## ☁️ Production Deployment

The system is fully deployed and accessible online.

| Service | Status |
|----------|----------|
| Frontend | ✅ Live |
| Backend API | ✅ Live |
| AI Resume Analysis Service | ✅ Live |
| MongoDB Atlas | ✅ Connected |

No local installation is required for evaluation, testing, or demonstration.

---

## 🏗️ Architecture

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│  React Frontend │  HTTP   │  Node.js API    │  HTTP   │  Python AI      │
│  (Port 3000)    │ ──────► │  (Port 5000)    │ ──────► │  (Port 8000)    │
│                 │ ◄────── │                 │ ◄────── │                 │
│  - 3D UI        │         │  - Express      │         │  - FastAPI      │
│  - Auth         │         │  - JWT Auth     │         │  - spaCy NLP    │
│  - Job Browse   │         │  - MongoDB      │         │  - Transformers │
│  - Apply/Track  │         │  - File Upload  │         │  - PDF Parser   │
└─────────────────┘         └─────────────────┘         └─────────────────┘
                                     │
                                     ▼
                            ┌─────────────────┐
                            │  MongoDB Atlas  │
                            │  - Users        │
                            │  - Jobs         │
                            │  - Applications │
                            │  - Resumes      │
                            └─────────────────┘
```

---

## ☁️ Cloud Architecture

```text
Frontend (Render Static Site)
        ↓
Backend API (Render Web Service)
        ↓
AI Resume Analysis Service (Render Web Service)
        ↓
MongoDB Atlas
```

---

## ✨ Features

---

## 🎯 Key Highlights

- Full Stack AI-Powered Recruitment Platform
- Cloud-Deployed Architecture (Render + MongoDB Atlas)
- Automated Resume Screening
- AI-Based Candidate Ranking
- Recruiter Dashboard with Applicant Tracking
- Student Dashboard with Job Matching
- Resume Analysis and Skill Gap Detection
- RESTful API Architecture
- Secure JWT Authentication
- Responsive Modern User Interface

---

### For Students
- 📝 Register & upload resume (PDF)
- 🔍 Browse jobs with search/filter
- 📤 Apply to jobs with one click
- 📊 View application status & AI scores
- 🎯 Get personalized skill recommendations

### For Recruiters
- 💼 Post job openings
- 👥 View applicants ranked by AI score
- 🤖 Trigger AI analysis for detailed insights
- ✅ Shortlist/reject candidates
- 📧 Send automated email notifications

### For Admins
- 🛠️ Manage users (students/recruiters)
- 📈 View system analytics
- 🔧 Audit logs & system health

---

## 🚀 Quick Start

### Prerequisites
- **Python 3.8+** with pip
- **Node.js 18+** with npm
- **MongoDB** (Atlas or local)

### One-Command Startup

```powershell
.\start-all.ps1
```

This will:
1. ✅ Create Python virtual environment
2. ✅ Install Python dependencies (FastAPI, spaCy, transformers)
3. ✅ Download NLP models (en_core_web_sm)
4. ✅ Install Node.js dependencies (backend + frontend)
5. ✅ Start all three services in background

**Services will be running at:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- AI Service: http://localhost:8000 (+ http://localhost:8000/docs for API docs)

### Stop All Services

```powershell
.\stop-all.ps1
```

---

## 📚 Documentation

- **[DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md)** - Complete setup, configuration, API docs
- **[TESTING-GUIDE.md](TESTING-GUIDE.md)** - Comprehensive testing protocol
- **[SYSTEM-STATUS.md](SYSTEM-STATUS.md)** - System health & troubleshooting
- **[QUICK-START.md](QUICK-START.md)** - Fast setup guide

---

## 🧪 Testing

See [TESTING-GUIDE.md](TESTING-GUIDE.md) for complete testing protocol.

**Quick Test:**
```bash
# Test AI service health
curl http://localhost:8000/health

# Test resume analysis (Swagger UI)
open http://localhost:8000/docs
```

---

## 🔧 Configuration

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://your-connection-string
JWT_SECRET=your-secret-key
AI_SERVICE_URL=http://localhost:8000
AI_SERVICE_TIMEOUT=30000
```

### AI Service (.env)
```env
PORT=8000
HOST=0.0.0.0
DEBUG=true
ALLOWED_ORIGINS=http://localhost:5000,http://localhost:3000
SPACY_MODEL=en_core_web_sm
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000
```

---

---

## 🔄 Application Workflow

### Student Workflow

1. Register and create an account
2. Upload resume (PDF/DOCX)
3. Browse available job opportunities
4. Apply to desired positions
5. Receive AI-generated match scores
6. Track application progress

### Recruiter Workflow

1. Create recruiter account
2. Post job openings
3. Review applicant pool
4. Analyze resumes using AI
5. Compare candidate scores
6. Shortlist or reject applicants

### System Workflow

Student Resume
↓
Resume Parsing
↓
Skill Extraction
↓
Job Requirement Matching
↓
Score Calculation
↓
Candidate Ranking

---

## 📊 Tech Stack

### Backend (Node.js)
- Express 5.2.1 - Web framework
- Mongoose 9.0.2 - MongoDB ORM
- JWT - Authentication
- Multer 2.0.2 - File uploads
- Nodemailer - Email notifications

### Frontend (React)
- React 19.2.3 - UI library
- Axios 1.13.2 - HTTP client
- React Router 7.11.0 - Navigation
- Three.js 0.182.0 - 3D graphics
- GSAP 3.14.2 - Animations
- Framer Motion 12.26.1 - UI animations

### AI Service (Python)
- FastAPI 0.109.2 - REST API framework
- pypdf - PDF text extraction
- pdfplumber - Advanced PDF parsing
- python-docx 1.1.0 - DOCX parsing
- rapidfuzz - Skill similarity matching
- python-dotenv - Environment management
- httpx - HTTP client utilities

### Database
- MongoDB Atlas - Cloud database

---

## 🎯 AI Scoring Algorithm

```
Overall Score (0-100) = 
  Skill Coverage (50%) * 0.5 +
  Experience Score (20%) * 0.2 +
  Education Score (15%) * 0.15 +
  Resume Quality (15%) * 0.15
```

**Skill Coverage:**
- Exact match: 100%
- Semantic match (e.g., "JS" → "JavaScript"): 90%
- Substring match: 80%
- String similarity > 0.7: 70%

**Experience Score:**
- 0-1 years: 30
- 1-3 years: 60
- 3-5 years: 80
- 5+ years: 100

**Education Score:**
- High School: 50
- Associate/Diploma: 60
- Bachelor's: 80
- Master's: 90
- PhD: 100

**Resume Quality:**
- Word count, sections, contact info, formatting

---

## 🔒 Security

- ✅ JWT authentication with bcrypt password hashing
- ✅ Role-based access control (student/recruiter/admin)
- ✅ File validation (magic numbers, size limits)
- ✅ CORS configuration
- ✅ Rate limiting (login/register)
- ✅ Input sanitization

**Production TODO:**
- HTTPS/SSL certificates
- API rate limiting (all endpoints)
- File malware scanning
- Database encryption at rest
- GDPR compliance

---

## 📈 Performance

**Current Limits:**
- AI Service: ~10 concurrent resume analyses
- File Size: 2MB max (configurable)
- Supported Formats: PDF, DOCX

**Response Times:**
- AI file analysis: < 3 seconds
- Skill-only matching: < 500ms
- Resume upload: < 2 seconds

---

## 🐛 Troubleshooting

### AI Service Won't Start
```powershell
cd ai-service
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python -m spacy download en_core_web_sm
python main.py
```

### Backend Can't Connect to AI
- Check AI service running: `curl http://localhost:8000/health`
- Verify `AI_SERVICE_URL` in backend/.env
- Check firewall/antivirus not blocking port 8000

### MongoDB Connection Error
- Verify `MONGO_URI` in backend/.env
- Check MongoDB Atlas IP whitelist
- Test connection in MongoDB Compass

See [DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md#troubleshooting) for more.

---

## 📞 Support

**Logs:**
- AI Service: Console output from start-all.ps1
- Backend: Console output from start-all.ps1
- Frontend: Browser DevTools console

**API Docs:**
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

---

## 📈 Project Impact

### Problems Solved

- Reduces manual resume screening effort
- Improves candidate-job matching accuracy
- Helps students identify missing skills
- Streamlines campus recruitment workflows
- Provides transparent candidate evaluation

### Technical Achievements

- Multi-Service Architecture
- Cloud Deployment
- AI-Based Resume Analysis
- Database Integration
- Authentication & Authorization
- REST API Design
- File Upload & Processing
- Real-Time Candidate Evaluation

---

## 📌 Project Information

### Project Type
Full Stack AI-Powered Web Application

### Domain
Recruitment Technology (HR Tech)

### Academic Program
B.Tech – Artificial Intelligence and Data Science

### Institution
Vasireddy Venkatadri Institute of Technology (VVIT)

### Deployment Infrastructure

- Frontend: Render Static Site
- Backend: Render Web Service
- AI Service: Render Web Service
- Database: MongoDB Atlas

### Live Services

- Frontend: https://ai-campus-recruitment-system.onrender.com
- Backend: https://ai-campus-backend-g4i8.onrender.com
- AI Service: https://ai-campus-ai-service.onrender.com

---

## 🎓 Credits

Built for VVIT Campus Recruitment

**Technologies:**
- Python (FastAPI, pypdf, pdfplumber, rapidfuzz)
- Node.js (Express, Mongoose)
- React (Three.js, GSAP)
- MongoDB Atlas

---

## ✅ Production Status

**PRODUCTION-READY** ✅

- Frontend deployed on Render
- Backend deployed on Render
- AI Resume Analysis Service deployed on Render
- MongoDB Atlas connected
- Real AI-powered resume analysis
- Deterministic scoring (no randomness)
- Graceful degradation (AI service fallback)
- Comprehensive error handling
- End-to-end tested
- Complete documentation
- Public demo available

**NO mocks. NO placeholders. Real AI.**

---

## 🤖 AI Resume Analysis Demo

### Core AI Features

- PDF Resume Parsing
- DOCX Resume Parsing
- Technical Skill Extraction
- Soft Skill Detection
- Job Match Scoring
- Missing Skill Identification
- Candidate Ranking
- Resume Quality Assessment
- Personalized Recommendations
- Automated Applicant Evaluation

---

## 🎯 Use Cases

### Educational Institutions
- Campus placement automation
- Student skill assessment
- Placement analytics
- Recruiter-student matching

### Recruiters
- AI-powered resume screening
- Candidate ranking
- Automated shortlisting
- Recruitment workflow optimization

### Students
- Resume evaluation
- Skill gap analysis
- Job matching
- Career readiness assessment

---

## 🚀 Public Demo Access

The complete platform can be accessed using the live deployment:

### Frontend Application
https://ai-campus-recruitment-system.onrender.com

### Backend API
https://ai-campus-backend-g4i8.onrender.com

### AI Resume Analysis Service
https://ai-campus-ai-service.onrender.com

No installation is required for reviewers, recruiters, faculty members, or evaluators.

All backend services, AI services, and database connections are hosted in the cloud and remain accessible even when the developer's local machine is offline.

---

## 🔒 Deployment Security

This repository is safe for public viewing.

Sensitive information such as:

- MongoDB credentials
- JWT secrets
- API keys
- Email credentials
- Deployment secrets
- Environment variables

are not stored in the repository and are managed securely through deployment environment variables.

---

## 📜 License

ISC License

---

## 🚀 Next Steps

1. Run `.\start-all.ps1`
2. Open http://localhost:3000
3. Register as Student
4. Upload resume
5. Apply to jobs
6. See AI-powered ranking!

**For detailed testing:** See [TESTING-GUIDE.md](TESTING-GUIDE.md)

---

**Built with ❤️ for smarter recruitment**
