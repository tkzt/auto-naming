import express from 'express';
import multer from 'multer';
import cors from 'cors';

const app = express();
const upload = multer();

// Add CORS middleware
app.use(cors());

// Initialize services
let ocrService;
let llmService;

async function initializeServices() {
    const { default: OCRService } = await import('./services/ocrService.mjs');
    const { default: LLMService } = await import('./services/llmService.mjs');

    ocrService = new OCRService();
    llmService = new LLMService();
}

app.post('/generate-name', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image file provided' });
        }

        // Initialize services if not already initialized
        if (!ocrService || !llmService) {
            await initializeServices();
        }

        // Extract text using OCR
        const extractedText = await ocrService.extractText(req.file.buffer);

        // Generate name using LLM
        const { title, confidence } = await llmService.generateTitle(extractedText);

        res.json({ title, confidence });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 