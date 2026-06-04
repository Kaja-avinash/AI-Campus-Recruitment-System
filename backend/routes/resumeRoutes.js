const express = require('express');
const router = express.Router();
const { 
  uploadResume, 
  getMyResume, 
  deleteResume 
} = require('../resume/controllers/resumeController'); // Mapping to the AI-integrated controller
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload'); // Existing multer configuration for PDF handling

/**
 * All resume routes are protected to ensure only authenticated 
 * students can manage their professional data.
 */
router.use(protect);

// Main Resume Operations
router
  .route('/')
  /**
   * @desc    Upload/replace student resume (PDF only) + AI Analysis
   * @access  Private (Student Only)
   * Triggers the bridge to Python FastAPI on Port 8000
   */
  .post(
    authorize('student'), 
    upload.single('resume'), 
    uploadResume
  )
  /**
   * @desc    Delete student resume
   * @access  Private (Student Only)
   * Removes file from storage and wipes AI data from User/Resume models
   */
  .delete(
    authorize('student'), 
    deleteResume
  );

/**
 * @desc    Retrieve current student's resume metadata and AI insights
 * @access  Private (Student Only)
 */
router.get('/me', authorize('student'), getMyResume);

module.exports = router;