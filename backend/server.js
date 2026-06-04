const express = require('express');
const cors = require('cors');
const path = require('path');
// Load environment variables from the backend folder regardless of CWD
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

// Database connection
const connectDB = require('./config/db');

// Route imports
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const resumeRoutes = require('./resume/routes/resumeRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const adminRoutes = require('./routes/adminRoutes');
const interviewRoutes = require('./routes/interviewRoutes');

// Middleware imports
const { notFound, errorHandler } = require('./middleware/errorHandler');

// Initialize express app
const app = express();

// Connect to database
connectDB();

// CORS configuration - Allow all localhost origins for development
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);

// --- INTEGRATED UPDATE: Match route to Frontend path ---
app.use('/api/auth/resume', resumeRoutes); 
// Keeping the original path for backward compatibility if needed
app.use('/api/resumes', resumeRoutes); 

app.use('/api/notifications', notificationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/interviews', interviewRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'AI Campus Recruitment System API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      jobs: '/api/jobs',
      applications: '/api/applications',
      resumes: '/api/auth/resume' //
    }
  });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const server = app.listen(PORT, () => {
  if (NODE_ENV === 'development') {
    console.log(`
╔══════════════════════════════════════════════════╗
║   🚀 AI Campus Recruitment System API            ║
║   ─────────────────────────────────────────────  ║
║   Server running on port ${PORT}                    ║
║   Environment: ${NODE_ENV}                   ║
║   AI Microservice: http://localhost:8000         ║
╚══════════════════════════════════════════════════╝
  `);
  } else {
    console.log(`Server running on port ${PORT} in ${NODE_ENV} mode`);
  }
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err.message);
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err.message);
  process.exit(1);
});