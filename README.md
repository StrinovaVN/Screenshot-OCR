# Strinova OCR (Optical Character Recognition) 


## Tính năng

- Upload ảnh để nhận diện văn bản
- Hỗ trợ nhiều ngôn ngữ (9+ ngôn ngữ)

## Cấu trúc

```
Screenshot-OCR/
├── backend/           # Express.js API server
│   ├── src/
│   │   ├── server.js      # Main server
│   │   ├── api/           # API routes
│   │   ├── ocr/           # OCR service
│   │   └── utils/         # Utilities
│   ├── examples/      # Examples & templates
│   └── test.html      # Test UI
│
└── frontend/          # Next.js frontend
    └── src/
        ├── app/           # Next.js pages
        ├── components/    # React components
        └── lib/           # Libraries & utils
```

## Sử dụng

### Backend
- Node.js + Express.js
- @gutenye/ocr-node (Tesseract OCR)
- Multer (File upload)
- CORS

### Frontend
- Next.js 14
- TypeScript
- Tailwind CSS
- shadcn/ui components

## Cài đặt

### 1. Clone repository

```bash
git clone https://github.com/StrinovaVN/Screenshot-OCR.git
cd Screenshot-OCR
```

### 2. Cài đặt Backend

```bash
cd backend
npm install
```

### 3. Cài đặt Frontend

```bash
cd frontend/src
npm install
```

##  Khởi chạy

### Backend (Terminal 1)

```bash
cd backend
node src/server.js
# Server chạy tại http://localhost:3001
```

### Frontend (Terminal 2)

```bash
cd frontend/src
npm run dev
# App chạy tại http://localhost:3000
```
## API Endpoints

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/health` | Server health check |
| GET | `/api/ocr/languages` | Danh sách ngôn ngữ |
| POST | `/api/ocr/upload` | Upload 1 ảnh |
| POST | `/api/ocr/upload-multiple` | Upload nhiều ảnh |
| POST | `/api/ocr/base64` | OCR từ base64 |

## Ngôn ngữ hỗ trợ

- English (eng)
- Tiếng Việt (vie)
- 中文简体 (chi_sim)
- 中文繁體 (chi_tra)
- 日本語 (jpn)
- 한국어 (kor)
- Français (fra)
- Deutsch (deu)
- Español (spa)

---

**Built with <3 by StrinovaVN**
