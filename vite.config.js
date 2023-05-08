import { copyFileSync } from 'fs';
import { resolve } from 'path';
import fs from 'fs/promises';
import path from 'path';

const wasmPath = resolve(__dirname, 'src/rust_viczesimal/pkg');
const buildWasmPath = resolve(__dirname, 'dist/rust_viczesimal/pkg');

async function copyWasmFiles() {
  const srcDir = 'src/rust_viczesimal/pkg';
  const destDir = 'dist/rust_viczesimal/pkg';
  const wasmFiles = ['rust_viczesimal_bg.wasm', 'rust_viczesimal.js'];

  await fs.mkdir(destDir, { recursive: true });

  for (const file of wasmFiles) {
    const srcPath = path.join(srcDir, file);
    const destPath = path.join(destDir, file);
    await fs.copyFile(srcPath, destPath);
  }
}

export default {
  server: {
    fs: {
      strict: false,
    },
  },
  build: {
    publicPath: './',
    assetsDir: 'assets',
    rollupOptions: {
      external: (id) => id.includes("rust_viczesimal/pkg"),
      output: {
        entryFileNames: '[name].js',
      },
    },
  },
  plugins: [
    {
      name: 'copy-wasm-files',
      writeBundle() {
        copyWasmFiles();
      },
    },
  ],
};