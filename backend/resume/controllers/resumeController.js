const fs = require('fs');
const path = require('path');
const axios = require('axios'); 
const FormData = require('form-data'); 
const Resume = require('../models/Resume');
const User = require('../../models/User');
const { createResponse, asyncHandler } = require('../../utils/helpers');
const { ApiError } = require('../../middleware/errorHandler');

const RESUME_DIR = path.join(__dirname, '../../uploads/resumes');

const ensureResumeDir = () => {
  if (!fs.existsSync(RESUME_DIR)) {
    fs.mkdirSync(RESUME_DIR, { recursive: true });
  }
};

const uploadResume = asyncHandler(async (req, res) => {
  console.log('--- RESUME UPLOAD STARTED ---');
  
  // 1. SAFE ID EXTRACTION
  const userId = req.user?._id || req.user?.id;
  if (!userId) throw new ApiError(401, 'Authentication failed. Please log in again.');

  ensureResumeDir();
  if (!req.file) throw new ApiError(400, 'Please upload a PDF resume');
  if (req.file.mimetype !== 'application/pdf') throw new ApiError(400, 'Only PDF files allowed');

  // --- START AI ANALYSIS BRIDGE ---
  const form = new FormData();
  form.append('file', fs.createReadStream(req.file.path));
  form.append('required_skills', "Python, Java, React, Node.js, MongoDB, SQL, Machine Learning"); 

  let aiResults = { extracted_skills: [], match_score: 0 };
  try {
    console.log('3. Calling Python AI Service on port 8000...');
    const aiResponse = await axios.post('http://localhost:8000/analyze/file', form, {
      headers: { ...form.getHeaders() },
      timeout: 10000 
    });
    
    if (aiResponse.data.success) {
      // 2. DATA FLATTENING: Convert objects to simple strings for your UI
      const rawSkills = aiResponse.data.data.extracted_skills || [];
      aiResults.extracted_skills = rawSkills.map(item => 
        typeof item === 'object' ? item.skill : item
      );
      aiResults.match_score = aiResponse.data.data.match_score || 0;
      
      console.log('4. AI Analysis Success (Flattened):', aiResults.extracted_skills);
    }
  } catch (err) {
    console.error("AI Service Offline:", err.message);
  }

  // 3. DATABASE UPDATE
  const resumeDoc = await Resume.findOneAndUpdate(
    { student: userId },
    {
      student: userId,
      filePath: `/uploads/resumes/${req.file.filename}`,
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
      uploadedAt: new Date(),
      extractedSkills: aiResults.extracted_skills,
      matchScore: aiResults.match_score
    },
    { upsert: true, new: true, setDefaultsOnInsert: true, runValidators: false }
  );

  const user = await User.findByIdAndUpdate(
    userId,
    {
      resume: {
        filePath: resumeDoc.filePath,
        filename: resumeDoc.filename,
        originalName: resumeDoc.originalName,
        mimeType: resumeDoc.mimeType,
        uploadedAt: resumeDoc.uploadedAt,
        extractedSkills: aiResults.extracted_skills,
        matchScore: aiResults.match_score
      }
    },
    { new: true }
  );

  res.status(200).json(
    createResponse(true, 'Resume uploaded and analyzed successfully', {
      resume: user?.resume,
      resumeRecordId: resumeDoc._id
    })
  );
});

// ... Keep getMyResume and deleteResume identical to your previous version ...
const getMyResume = asyncHandler(async (req, res) => {
  const userId = req.user?._id || req.user?.id;
  const resume = await Resume.findOne({ student: userId });
  res.status(200).json(createResponse(true, 'Resume retrieved successfully', { resume }));
});

const deleteResume = asyncHandler(async (req, res) => {
  const userId = req.user?._id || req.user?.id;
  const resumeDoc = await Resume.findOne({ student: userId });
  if (!resumeDoc) throw new ApiError(404, 'No resume found to delete');
  if (resumeDoc.filePath) {
    const fullPath = path.join(__dirname, '../../', resumeDoc.filePath);
    if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
  }
  await Resume.findOneAndDelete({ student: userId });
  await User.findByIdAndUpdate(userId, { $unset: { resume: 1 } }, { new: true });
  res.status(200).json(createResponse(true, 'Resume deleted successfully', { resume: null }));
});

module.exports = { uploadResume, getMyResume, deleteResume, ensureResumeDir, RESUME_DIR };