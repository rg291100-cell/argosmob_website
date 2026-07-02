import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: (origin, callback) => {
    // Dynamically allow any origin (supports LAN IPs, localhost, etc.)
    callback(null, true);
  },
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

// Health Check Route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'ArgosMob Backend is running' });
});

// Import Routes
import authRoutes from './routes/authRoutes';
import projectRoutes from './routes/projectRoutes';
import enquiriesRoutes from './routes/enquiriesRoutes';
import testimonialRoutes from './routes/testimonialRoutes';
import storyRoutes from './routes/storyRoutes';
import serviceRoutes from './routes/serviceRoutes';
import techStackRoutes from './routes/techStackRoutes';
import mediaRoutes from './routes/mediaRoutes';

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/enquiries', enquiriesRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/stories', storyRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/tech-stack', techStackRoutes);
app.use('/api/media', mediaRoutes);

// Error Handling Middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
