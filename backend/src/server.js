import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ocrRoutes from './api/ocrRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: '*',
  credentials: false
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// routes
app.use('/api/ocr', ocrRoutes);

// health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'OCR server is running' });
});

// error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      status: err.status || 500
    }
  });
});

app.listen(PORT, () => {
  console.log(`OCR server is running on port ${PORT}`);
  console.log(`API endpoint: http://localhost:${PORT}/api/ocr`);
});

export default app;
