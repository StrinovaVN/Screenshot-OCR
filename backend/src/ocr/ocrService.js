import Ocr from '@gutenye/ocr-node';
import fs from 'fs/promises';
import path from 'path';

/**
 * OCR Service for text recognition from images
 */
class OCRService {
  constructor() {
    this.ocrInstance = null;
  }

  /**
   * initialize OCR instance
   */
  async initialize() {
    if (!this.ocrInstance) {
      console.log('Initializing OCR engine...');
      this.ocrInstance = await Ocr.create();
      console.log('OCR engine initialized successfully!');
    }
    return this.ocrInstance;
  }

  /**
   * recognize text from image file
   * @param {string} imagePath - patch to the image file
   * @param {object} options - OCR options
   * @returns {Promise<object>} - OCR result
   */
  async recognizeText(imagePath, options = {}) {
    try {
      // check if file exists
      await fs.access(imagePath);

      // initialize OCR if not already done
      const ocr = await this.initialize();

      // OCR processing
      const result = await ocr.detect(imagePath, options);

      // extract text from result
      const text = result.map(line => line.text).join('\n');

      return {
        success: true,
        text: text,
        lines: result.length,
        details: result,
        imagePath: imagePath,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('OCR Error:', error);
      throw new Error(`OCR processing failed: ${error.message}`);
    }
  }

  /**
   * recognize text from buffer
   * @param {Buffer} imageBuffer - image buffer
   * @param {object} options - OCR options
   * @returns {Promise<object>} - OCR result
   */
  async recognizeFromBuffer(imageBuffer, options = {}) {
    const tempPath = path.join(process.cwd(), 'temp', `temp_${Date.now()}.png`);
    
    try {
      // create temp directory if not exists
      await fs.mkdir(path.dirname(tempPath), { recursive: true });

      // write buffer to temp file
      await fs.writeFile(tempPath, imageBuffer);

      // OCR processing
      const result = await this.recognizeText(tempPath, options);

      // delete temp file
      await fs.unlink(tempPath);
      
      return result;
    } catch (error) {
      // ensure temp file is deleted if error occurs
      try {
        await fs.unlink(tempPath);
      } catch (unlinkError) {
        // ignore unlink errors
      }
      throw error;
    }
  }

  /**
   * process multiple images at once
   * @param {Array} imagePaths - array of image paths
   * @param {object} options - OCR options
   * @returns {Promise<Array>} - array of OCR results
   */
  async recognizeBatch(imagePaths, options = {}) {
    const results = await Promise.allSettled(
      imagePaths.map(imagePath => this.recognizeText(imagePath, options))
    );

    return results.map((result, index) => ({
      imagePath: imagePaths[index],
      success: result.status === 'fulfilled',
      data: result.status === 'fulfilled' ? result.value : null,
      error: result.status === 'rejected' ? result.reason.message : null
    }));
  }

  /**
   * Validate image file
   * @param {object} file - file object from multer
   * @returns {boolean} - true if valid
   */
  validateImageFile(file) {
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!file) {
      throw new Error('No file provided');
    }

    // check if it's an image file by mimetype or extension
    const isImage = file.mimetype && file.mimetype.startsWith('image/');
    
    if (!isImage) {
      throw new Error('Invalid file type. Only image files are allowed.');
    }

    if (file.size > maxSize) {
      throw new Error(`File too large. Maximum size: ${maxSize / (1024 * 1024)}MB`);
    }

    return true;
  }
}

export default new OCRService();
