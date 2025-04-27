import { createWorker } from 'tesseract.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

class OCRService {
    constructor() {
        this.worker = null;
    }

    async initWorker() {
        // 确定应用程序的根目录
        let basePath;

        // 检测是否在打包环境中运行
        if (process.pkg) {
            // 在打包环境中，使用可执行文件目录
            basePath = path.dirname(process.execPath);
        } else {
            // 在开发环境中，使用当前文件目录
            const __filename = fileURLToPath(import.meta.url);
            const __dirname = path.dirname(__filename);
            basePath = path.resolve(__dirname, '../../');
        }

        // 训练数据文件路径
        const dataPath = path.join(basePath, 'eng.traineddata');

        // 检查文件是否存在（调试用）
        console.log(`Looking for training data at: ${dataPath}`);
        try {
            fs.accessSync(dataPath, fs.constants.R_OK);
            console.log('Training data file found!');
        } catch (error) {
            console.error('Training data file not found!', error);
        }

        this.worker = await createWorker(undefined, {
            langPath: basePath,  // 指定语言文件目录
            // lang: 'eng',      // 默认语言
        });

        // await this.worker.loadLanguage('eng');
        // await this.worker.initialize('eng');
    }

    async extractText(imageBuffer) {
        if (!this.worker) {
            await this.initWorker();
        }

        const { data: { text } } = await this.worker.recognize(imageBuffer);
        return text;
    }

    async terminate() {
        if (this.worker) {
            await this.worker.terminate();
            this.worker = null;
        }
    }
}

export default OCRService;