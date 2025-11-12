# Strinova OCR Backend

Backend API cho dự án OCR ảnh sử dụng `@gutenye/ocr-node`.

## Tính năng

- Upload và nhận diện văn bản từ ảnh
- Hỗ trợ upload nhiều ảnh cùng lúc
- Hỗ trợ ảnh dạng base64
- Hỗ trợ nhiều ngôn ngữ (Tiếng Anh, Tiếng Việt, Trung, Nhật, Hàn, v.v.)
- CORS
- Validation file
- Error handling

## Yêu cầu

- Node.js >= 16.x
- npm hoặc yarn
- Tesseract OCR (được cài đặt tự động bởi @gutenye/ocr-node)

## Cài đặt

### 1. Cài đặt dependencies

```bash
npm install
```

### 2. Cấu hình environment variables

```bash
cp .env.example .env
```

### 3. Chỉnh sửa file `.env` theo nhu cầu

## Chạy server

### Development mode

```bash
npm run dev
```

### Production mode

```bash
npm start
```

Server sẽ chạy tại `http://localhost:3001`

##  API Endpoints

### 1. Upload một ảnh

```txt
POST /api/ocr/upload
Content-Type: multipart/form-data

Body:
- image: File (required) - File ảnh
- lang: String (optional) - Mã ngôn ngữ (mặc định: 'eng')
- deleteAfter: Boolean (optional) - Xóa file sau khi xử lý (mặc định: true)
```

**Ví dụ response:**

```json
{
  "success": true,
  "data": {
    "success": true,
    "text": "Recognized text from image",
    "imagePath": "/path/to/image",
    "timestamp": "2025-11-05T10:30:00.000Z"
  },
  "file": {
    "originalName": "screenshot.png",
    "size": 123456,
    "mimetype": "image/png"
  }
}
```

### 2. Upload nhiều ảnh

```txt
POST /api/ocr/upload-multiple
Content-Type: multipart/form-data

Body:
- images: File[] (required) - Mảng file ảnh (tối đa 10 ảnh)
- lang: String (optional) - Mã ngôn ngữ
- deleteAfter: Boolean (optional) - Xóa files sau khi xử lý
```

### 3. OCR từ base64

```txt
POST /api/ocr/base64
Content-Type: application/json

Body:
{
  "image": "data:image/png;base64,iVBORw0KGgo...",
  "lang": "eng"
}
```

### 4. Lấy danh sách ngôn ngữ hỗ trợ

```txt
GET /api/ocr/languages
```

**Response:**

```json
{
  "success": true,
  "languages": [
    { "code": "eng", "name": "English" },
    { "code": "vie", "name": "Vietnamese" },
    { "code": "chi_sim", "name": "Chinese Simplified" },
    ...
  ]
}
```

### 5. Health check

```txt
GET /api/ocr/health
```

## Ngôn ngữ hỗ trợ

- `eng` - English
- `vie` - Vietnamese
- `chi_sim` - Chinese Simplified
- `chi_tra` - Chinese Traditional
- `jpn` - Japanese
- `kor` - Korean
- `fra` - French
- `deu` - German
- `spa` - Spanish

## Ví dụ

### JavaScript/Fetch

```javascript
// Upload một ảnh
const formData = new FormData();
formData.append('image', fileInput.files[0]);
formData.append('lang', 'vie');

const response = await fetch('http://localhost:3001/api/ocr/upload', {
  method: 'POST',
  body: formData
});

const result = await response.json();
console.log(result.data.text);
```

### React

```jsx
const handleUpload = async (file) => {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('lang', 'eng');

  try {
    const response = await fetch('http://localhost:3001/api/ocr/upload', {
      method: 'POST',
      body: formData
    });
    
    const result = await response.json();
    
    if (result.success) {
      console.log('Text:', result.data.text);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
```

### Axios

```javascript
import axios from 'axios';

const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('lang', 'vie');

  const { data } = await axios.post(
    'http://localhost:3001/api/ocr/upload',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  );

  return data.data.text;
};
```

## File Types & Limits

- **Allowed types:** JPEG, PNG, WEBP, BMP
- **Max file size:** 10MB
- **Max files (batch):** 10 files

## Cấu trúc

```txt
backend/
├── src/
│   ├── api/
│   │   └── ocrRoutes.js      # API routes
│   ├── ocr/
│   │   └── ocrService.js     # OCR service logic
│   ├── utils/                # Utilities (optional)
│   └── server.js             # Main server file
├── uploads/                  # Uploaded files (auto-generated)
├── temp/                     # Temporary files (auto-generated)
├── .env                      # Environment variables
├── .env.example              # Example environment file
├── .gitignore
├── package.json
└── README.md
```

## Error Handling


```json
{
  "error": {
    "message": "Error description",
    "status": 400
  }
}
```