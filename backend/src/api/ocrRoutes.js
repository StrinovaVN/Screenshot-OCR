import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';
import ocrService from '../ocr/ocrService.js';

const router = express.Router();

// multer configuration for file uploads
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), 'uploads');
    await fs.mkdir(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  },
  fileFilter: (req, file, cb) => {
    // check if mimetype starts with 'image/'
    if (file.mimetype.startsWith('image/')) {
      // allow common image types
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/bmp'];
      
      // check file extension as fallback
      const ext = path.extname(file.originalname).toLowerCase();
      const allowedExts = ['.jpg', '.jpeg', '.png', '.webp', '.bmp'];

      if (allowedTypes.includes(file.mimetype) || allowedExts.includes(ext)) {
        cb(null, true);
      } else {
        console.log('Rejected mimetype:', file.mimetype, 'ext:', ext);
        cb(new Error('Invalid file type. Only JPEG, PNG, WEBP, and BMP are allowed.'));
      }
    } else {
      console.log('Rejected non-image mimetype:', file.mimetype);
      cb(new Error('Invalid file type. Only image files are allowed.'));
    }
  }
});

/**
 * POST /api/ocr/upload
 */
router.post('/upload', upload.single('image'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No image file provided'
      });
    }

    // validate file
    ocrService.validateImageFile(req.file);

    // get options 
    const options = {
      lang: req.body.lang || 'eng', // eng, vie, chi_sim, etc.
    };

    // OCR processing
    const result = await ocrService.recognizeText(req.file.path, options);

    // delete file after processing
    if (req.body.deleteAfter !== 'false') {
      await fs.unlink(req.file.path);
    }

    res.json({
      success: true,
      data: result,
      file: {
        originalName: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype
      }
    });
  } catch (error) {
    // delete file if error occurs
    if (req.file?.path) {
      try {
        await fs.unlink(req.file.path);
      } catch (unlinkError) {
        console.error('Error deleting file:', unlinkError);
      }
    }
    next(error);
  }
});

/**
 * POST /api/ocr/upload-multiple
 */
router.post('/upload-multiple', upload.array('images', 10), async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No image files provided'
      });
    }

    // get options from request
    const options = {
      lang: req.body.lang || 'eng',
    };

    // OCR processing for all images
    const imagePaths = req.files.map(file => file.path);
    const results = await ocrService.recognizeBatch(imagePaths, options);

    // delete files after processing
    if (req.body.deleteAfter !== 'false') {
      await Promise.all(
        req.files.map(file => fs.unlink(file.path).catch(err => console.error(err)))
      );
    }

    res.json({
      success: true,
      data: results,
      totalFiles: req.files.length,
      files: req.files.map(file => ({
        originalName: file.originalname,
        size: file.size,
        mimetype: file.mimetype
      }))
    });
  } catch (error) {
    // delete files if error occurs
    if (req.files) {
      await Promise.all(
        req.files.map(file => fs.unlink(file.path).catch(err => console.error(err)))
      );
    }
    next(error);
  }
});

/**
 * POST /api/ocr/base64
 */
router.post('/base64', async (req, res, next) => {
  try {
    const { image, lang } = req.body;

    if (!image) {
      return res.status(400).json({
        success: false,
        error: 'No image data provided'
      });
    }

    // convert base64 to buffer
    const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
    const imageBuffer = Buffer.from(base64Data, 'base64');

    // OCR processing
    const options = { lang: lang || 'eng' };
    const result = await ocrService.recognizeFromBuffer(imageBuffer, options);

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/ocr/languages
 */
router.get('/languages', (req, res) => {
  const supportedLanguages = [
    { code: 'eng', name: 'English' },
    { code: 'vie', name: 'Vietnamese' },
    { code: 'chi_sim', name: 'Chinese Simplified' },
    { code: 'chi_tra', name: 'Chinese Traditional' },
    { code: 'jpn', name: 'Japanese' },
    { code: 'kor', name: 'Korean' },
    { code: 'fra', name: 'French' },
    { code: 'deu', name: 'German' },
    { code: 'spa', name: 'Spanish' },
  ];

  res.json({
    success: true,
    languages: supportedLanguages
  });
});

/**
 * GET /api/ocr/health
 */
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'OCR service is running',
    timestamp: new Date().toISOString()
  });
});

export default router;
