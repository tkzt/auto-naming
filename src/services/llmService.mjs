import fetch from 'node-fetch';

class LLMService {
    constructor(modelName = "qwen2.5:0.5b", baseUrl = "http://localhost:11434") {
        this.modelName = modelName;
        this.baseUrl = baseUrl.replace(/\/$/, '');
    }

    async generateTitle(text) {
        const prompt = `Given the following text, generate a concise and descriptive title (maximum 10 words):
        
Text: ${text}

Title:`;

        try {
            const response = await fetch(`${this.baseUrl}/api/generate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: this.modelName,
                    prompt: prompt,
                    stream: false
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            let title = result.response?.trim() || '';
            title = title.replace("Title:", "").trim();

            // For now, return a fixed confidence score since Ollama doesn't provide one
            const confidence = 0.8;

            return { title, confidence };
        } catch (error) {
            console.error('Error generating title:', error);
            return { title: `Error generating title: ${error.message}`, confidence: 0.0 };
        }
    }
}

export default LLMService; 