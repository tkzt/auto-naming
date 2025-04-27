import { build } from 'esbuild';

build({
  entryPoints: ['./src/index.mjs'],
  bundle: true,
  platform: 'node',
  target: 'node18',
  outfile: './dist/bundle.cjs',
  format: 'cjs',
  minify: true,
  external: ['./node_modules/*'],
  // 确保保留与文件系统和路径相关的 API
  banner: {
    js: `
      // 设置全局变量以帮助 Tesseract 找到训练数据
      global.__filename = __filename;
      global.__dirname = __dirname;
    `
  }
}).catch(() => process.exit(1));