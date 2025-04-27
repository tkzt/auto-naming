# Auto Naming Service (Node.js Version)

This is a Node.js version of the Auto Naming Service, which uses OCR and LLM to generate names for images.

## Prerequisites

- Node.js 18 or later
- Ollama running locally (for LLM functionality)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Make sure Ollama is running and the required model is downloaded:
```bash
ollama pull qwen2.5:0.5b
```

## Usage

### Development

Run the development server:
```bash
npm run dev
```

### Production

Build the executable:
```bash
npm run build
```

This will create a Linux ARM64 executable in the `dist` directory.

Run the server:
```bash
npm start
```

## API Endpoints

### POST /generate-name

Upload an image to generate a name.

**Request:**
- Content-Type: multipart/form-data
- Body: image file

**Response:**
```json
{
    "title": "Generated title",
    "confidence": 0.8
}
```

## Notes

- The service uses Tesseract.js for OCR instead of EasyOCR
- The LLM service requires Ollama to be running locally
- The confidence score is currently fixed at 0.8 as Ollama doesn't provide confidence scores 