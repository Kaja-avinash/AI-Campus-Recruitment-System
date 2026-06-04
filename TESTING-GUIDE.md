# AI CAMPUS RECRUITMENT SYSTEM - TESTING GUIDE

## 🧪 Complete Testing Protocol

This guide will help you verify that the **AI-driven resume analysis** is working end-to-end with real NLP, no mocks, no placeholders.

---

## ✅ Prerequisites

1. All three services running via `.\start-all.ps1`
2. MongoDB connection successful
3. AI service health check passing at http://localhost:8000/health

---

## 🔬 Phase 1: AI Service Direct Testing

### Test 1: Health Check
```powershell
curl http://localhost:8000/health
```

**Expected Response:**
```json
{
  "status": "healthy",
  "version": "1.0.0",
  "models_loaded": true,
  "spacy_model": "en_core_web_sm"
}
```

✅ **Pass Criteria:** All models loaded, status healthy

---

### Test 2: File Upload Analysis (Direct API)

1. Navigate to http://localhost:8000/docs (Swagger UI)
2. Find `POST /analyze/file`
3. Click "Try it out"
4. Upload a sample resume PDF
5. Enter required_skills: `Python, JavaScript, React, MongoDB`
6. Click "Execute"

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "overall_score": 75,
    "skill_coverage": 80.5,
    "experience_score": 70,
    "education_score": 85,
    "resume_quality_score": 90,
    "matched_skills": ["Python", "JavaScript", "React"],
    "missing_skills": ["MongoDB"],
    "extracted_skills": ["Python", "JavaScript", "React", "Node.js", ...],
    "experience": [...],
    "education": [...],
    "recommendations": [...]
  }
}
```

✅ **Pass Criteria:**
- `overall_score` is calculated (not hardcoded)
- `matched_skills` uses semantic matching (e.g., "js" matches "JavaScript")
- `extracted_skills` contains skills found in resume via NLP
- `recommendations` provides actionable feedback

---

### Test 3: Text Analysis (No File)

In Swagger UI, try `POST /analyze/text`:
```json
{
  "resume_text": "Software Engineer with 5 years experience in Python, Django, React, and AWS. Bachelor's in Computer Science from MIT. Built scalable microservices handling 10M requests/day.",
  "required_skills": ["Python", "React", "AWS", "MongoDB"],
  "student_skills": []
}
```

**Expected Response:**
- `overall_score` > 60
- `matched_skills` contains ["Python", "React", "AWS"]
- `missing_skills` contains ["MongoDB"]
- `experience` array has 1 item with "5 years"
- `education` array has degree "Bachelor's" from "MIT"

✅ **Pass Criteria:** NLP extracts experience and education correctly

---

## 🎓 Phase 2: Backend Integration Testing

### Test 4: Student Registration & Resume Upload

1. Open http://localhost:3000
2. Click "Register"
3. Fill form:
   - Name: Test Student
   - Email: student@test.com
   - Password: password123
   - Role: Student
   - Skills: Python, JavaScript, React
4. Click "Register"
5. Login with credentials
6. Navigate to "Profile" or "Upload Resume"
7. Upload a PDF resume
8. Verify upload success message

**Check Backend Logs:**
```
Resume uploaded: /uploads/resumes/resume-{userId}-{timestamp}.pdf
```

✅ **Pass Criteria:** Resume file saved to `backend/uploads/resumes/`

---

### Test 5: Job Application with AI Scoring

1. Stay logged in as student
2. Navigate to "Browse Jobs" or "View Jobs"
3. Find a job with required skills matching your profile
4. Click "Apply"
5. Confirm application

**Check Network Tab (DevTools):**
- POST /api/applications/{jobId}
- Response includes `matchScore` and `aiScore`

**Expected Response:**
```json
{
  "success": true,
  "message": "Application submitted successfully",
  "data": {
    "application": {
      "_id": "...",
      "matchScore": 75,
      "aiScore": 78,
      "status": "PENDING"
    }
  }
}
```

✅ **Pass Criteria:** `aiScore` is calculated (not 0 or null)

---

### Test 6: Recruiter AI Analysis

1. Logout
2. Register as Recruiter (recruiter@test.com)
3. Login as Recruiter
4. Navigate to "Post Job"
5. Create a job with required skills: `Python, React, MongoDB, AWS`
6. Wait for student applications (or apply yourself from student account)
7. Navigate to "View Applicants" or "My Jobs" → Select job → "View Applicants"
8. Click on an applicant
9. Click "Analyze (AI)" or "Recompute AI Score"

**Expected Network Request:**
```
PUT /api/applications/{applicationId}/ai-score
```

**Expected Response:**
```json
{
  "success": true,
  "message": "AI score recomputed successfully",
  "data": {
    "aiScore": 82,
    "analysis": {
      "summary": "Strong candidate with 75% skill match...",
      "matched_skills": ["Python", "React"],
      "missing_skills": ["MongoDB", "AWS"],
      "skill_coverage": 50,
      "recommendations": [
        "Consider learning MongoDB for NoSQL database management",
        "AWS certification would strengthen cloud computing skills"
      ]
    }
  }
}
```

✅ **Pass Criteria:**
- AI score updates in real-time
- Analysis shows detailed breakdown
- Recommendations are specific to missing skills
- No errors in backend logs

---

## 🔍 Phase 3: End-to-End Flow Verification

### Complete Workflow Test

**Setup:**
1. Create 3 student accounts with different skill sets:
   - Student A: Python, JavaScript, React, MongoDB (Full Stack)
   - Student B: Python, Django, PostgreSQL (Backend)
   - Student C: HTML, CSS, JavaScript (Frontend)

2. Create 1 recruiter account

3. Each student uploads a unique resume PDF

**Test Execution:**

**Step 1:** Recruiter posts job: "Full Stack Developer"
- Required Skills: Python, React, MongoDB, AWS
- Status: OPEN

**Step 2:** All 3 students apply to the job

**Step 3:** Recruiter views applicants

**Expected Results:**
- Student A ranked #1 (highest AI score ~80-90)
- Student B ranked #2 (moderate score ~50-60)
- Student C ranked #3 (lowest score ~20-30)

**Step 4:** Click "Analyze All" or individually analyze each

**Verification:**
- Each analysis reflects actual resume content (via PDF parsing)
- Skill matching uses semantic similarity (e.g., "Node.js" matches "Node")
- Experience years extracted correctly from resumes
- Education degrees/institutions detected
- Recommendations differ per candidate based on gaps

✅ **Pass Criteria:**
- Ranking order matches skill relevance
- AI scores are deterministic (re-running gives same result)
- Analysis summaries are unique per candidate
- No "undefined" or null values in responses

---

## 🐛 Phase 4: Error Handling & Edge Cases

### Test 7: AI Service Offline Fallback

1. Stop AI service: `Stop-Job -Name "AI Service"`
2. As recruiter, click "Analyze (AI)" on an applicant
3. Verify system falls back to basic skill matching
4. Check backend logs for fallback message:
   ```
   AI service error, falling back: fetch failed
   ```

✅ **Pass Criteria:** System continues working with degraded scoring (no crashes)

---

### Test 8: Resume Without Skills Section

1. Upload a resume with NO skills section (only experience/education)
2. Apply to a job
3. Analyze with AI

**Expected Behavior:**
- AI extracts skills from job descriptions in experience section
- Score reflects extracted skills vs required skills
- No errors thrown

✅ **Pass Criteria:** NLP extracts implicit skills from context

---

### Test 9: Non-PDF File Upload

1. Try uploading `.txt`, `.jpg`, `.exe` file as resume
2. Verify upload rejected with error message
3. Try uploading 5MB PDF (over limit)

**Expected Response:**
```json
{
  "success": false,
  "message": "Only PDF files are allowed"
}
```

✅ **Pass Criteria:** File validation works correctly

---

### Test 10: Simultaneous Analysis Requests

1. Open 5 browser tabs as recruiter
2. In each tab, click "Analyze (AI)" on different applicants simultaneously
3. Verify all requests complete successfully (may take 10-30 seconds)

✅ **Pass Criteria:** No timeouts or race conditions

---

## 📊 Phase 5: Score Validation

### Verify Score Calculation Logic

**Test Resume:**
```
Full Stack Developer
Skills: Python, JavaScript, React, Node.js, MongoDB
Experience: 3 years at Google
Education: BS Computer Science, Stanford University
```

**Job Requirements:** Python, React, MongoDB, AWS

**Expected Score Breakdown:**
- **Skill Coverage (50%):** 75% (3/4 skills matched) = 37.5 points
- **Experience (20%):** 3 years = 15 points
- **Education (15%):** BS from top school = 13 points
- **Resume Quality (15%):** Well-formatted, 500+ words = 13 points
- **Total:** ~78-80 points

**Verify via API:**
```bash
curl http://localhost:8000/analyze/text -X POST -H "Content-Type: application/json" -d '{
  "resume_text": "...",
  "required_skills": ["Python", "React", "MongoDB", "AWS"]
}'
```

✅ **Pass Criteria:** Score components add up correctly, no randomness

---

## 🎯 Phase 6: Real-World Scenarios

### Scenario 1: Career Changer (Low Score Expected)

**Resume:** English Teacher with 10 years experience, no tech skills

**Job:** Software Engineer (Python, React, AWS)

**Expected AI Score:** 5-15 (high experience points, but 0 skill match)

---

### Scenario 2: Fresh Graduate (Medium Score)

**Resume:** Recent CS grad, coursework in Python/Java, no work experience

**Job:** Junior Developer (Python, JavaScript, Git)

**Expected AI Score:** 45-60 (skills match, education strong, low experience)

---

### Scenario 3: Perfect Match (High Score)

**Resume:** Senior SWE, all required skills + more, 8 years experience, MS degree

**Job:** Senior Full Stack (Python, React, AWS, MongoDB)

**Expected AI Score:** 85-95

---

## ✅ Final Validation Checklist

- [ ] AI service starts without errors
- [ ] spaCy model downloads automatically
- [ ] PDF parsing works for multi-page resumes
- [ ] DOCX parsing works
- [ ] Skill extraction finds 20+ skills from typical resume
- [ ] Semantic matching: "javascript" matches "JS", "React.js" matches "React"
- [ ] Experience extraction finds job titles, companies, dates
- [ ] Education extraction finds degrees, schools, GPAs
- [ ] Score is deterministic (same resume = same score)
- [ ] Recommendations are actionable and specific
- [ ] Frontend displays all analysis fields correctly
- [ ] Recruiter can see ranked applicant list by AI score
- [ ] Student can see "My Applications" with scores
- [ ] Email notifications sent on status changes
- [ ] System gracefully handles AI service downtime
- [ ] No console errors in browser or terminal
- [ ] All API endpoints respond within 5 seconds
- [ ] MongoDB stores all data correctly
- [ ] JWT authentication works for all routes

---

## 🚨 Common Issues & Solutions

### Issue: AI Score Always 0
**Solution:** 
- Check AI service running: `curl http://localhost:8000/health`
- Check backend .env has `AI_SERVICE_URL=http://localhost:8000`
- Check resume file exists at `backend/uploads/resumes/`

### Issue: "Model not loaded" error
**Solution:**
```powershell
cd ai-service
.\venv\Scripts\Activate.ps1
python -m spacy download en_core_web_sm
```

### Issue: Skills Not Matching
**Solution:** Check skill normalization. "Node.js" should match "Node", "JavaScript" should match "JS". If not, verify `skill_matcher.py` semantic similarity is working.

### Issue: PDF Parsing Fails
**Solution:** Ensure PyMuPDF installed: `pip show PyMuPDF`. Try different PDF (some scanned PDFs won't work - need OCR).

---

## 📈 Performance Benchmarks

**Target Response Times:**
- AI file analysis: < 3 seconds
- Skill-only matching: < 500ms
- Bulk job analysis (10 applicants): < 30 seconds
- Resume upload: < 2 seconds

**Concurrency:**
- AI service handles 5 concurrent requests
- Backend handles 50 concurrent users
- MongoDB supports 100+ connections

---

## 🎓 Success Criteria

The system is **PRODUCTION-READY** if:

1. ✅ Resume upload → AI analysis → Score display works end-to-end
2. ✅ AI scores reflect real resume content (via NLP parsing)
3. ✅ Skill matching uses semantic similarity (not just exact match)
4. ✅ Recruiter sees ranked applicants by AI score
5. ✅ Detailed analysis shows matched/missing skills + recommendations
6. ✅ System handles AI service failure gracefully (fallback to basic scoring)
7. ✅ No hardcoded scores or mock data
8. ✅ Scores are deterministic (repeatable)
9. ✅ All user roles (student/recruiter/admin) work correctly
10. ✅ No silent failures or unhandled errors

---

**If all tests pass, system is demo-ready! 🚀**
