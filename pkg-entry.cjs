const path = require('path');

// 设置 Tesseract 训练数据路径
process.env.TESSDATA_PREFIX = path.join(process.cwd());

// 加载打包后的应用
require('./dist/bundle.cjs');