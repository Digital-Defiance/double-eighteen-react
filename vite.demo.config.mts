/// <reference types='vite/client' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as fs from 'fs';
import * as path from 'path';

// Live demo / visual harness app (the `dev/` folder). Built to static HTML for
// GitHub Pages (or any static host). Components resolve from `../src`; the
// headless core resolves from the sibling `double-eighteen` dist when developing
// inside the Warp monorepo, otherwise from the published npm package.
const siblingCore = path.resolve(
  import.meta.dirname,
  '../double-eighteen/dist/index.js'
);
const coreAlias: Record<string, string> = fs.existsSync(siblingCore)
  ? { 'double-eighteen': siblingCore }
  : {};

export default defineConfig(() => ({
  root: path.resolve(import.meta.dirname, 'dev'),
  // Pages serves the project site under /<repo>/. Override with DEMO_BASE.
  base: process.env.DEMO_BASE ?? '/',
  cacheDir: '../../node_modules/.vite/vendor/double-eighteen-react-demo',
  resolve: {
    alias: {
      ...coreAlias,
    },
  },
  server: {
    // dev/ imports components from ../src, which is outside the Vite root.
    fs: { allow: [path.resolve(import.meta.dirname)] },
  },
  plugins: [react()],
  build: {
    outDir: path.resolve(import.meta.dirname, 'demo-dist'),
    emptyOutDir: true,
  },
}));
