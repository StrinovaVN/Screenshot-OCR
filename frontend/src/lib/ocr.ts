const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface OCRResult {
  success: boolean;
  data: {
    text: string;
    lines: number;
    details: Array<{
      text: string;
      score: number;
      frame: { top: number; left: number; width: number; height: number };
    }>;
    imagePath: string;
    timestamp: string;
  };
  file: {
    originalName: string;
    size: number;
    mimetype: string;
  };
}

export interface Language {
  code: string;
  name: string;
}

export async function uploadImageForOCR(file: File, lang: string = 'eng'): Promise<OCRResult> {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('lang', lang);

  const response = await fetch(`${API_URL}/api/ocr/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Upload failed' }));
    throw new Error(error.error || `HTTP error! status: ${response.status}`);
  }
  
  return response.json();
}

export async function uploadMultipleImagesForOCR(files: File[], lang: string = 'eng') {
  const formData = new FormData();
  files.forEach(file => {
    formData.append('images', file);
  });
  formData.append('lang', lang);

  const response = await fetch(`${API_URL}/api/ocr/upload-multiple`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export async function getSupportedLanguages(): Promise<{ success: boolean; languages: Language[] }> {
  const response = await fetch(`${API_URL}/api/ocr/languages`);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
}

export async function checkOCRHealth() {
  const response = await fetch(`${API_URL}/api/ocr/health`);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
}