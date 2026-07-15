/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import * as fs from 'fs';
import * as path from 'path';

// The headless core (`double-eighteen`) is consumed from its freshly built dist
// when developed inside the Warp monorepo (sibling submodule). In a standalone
// checkout that sibling isn't present, so we fall back to normal resolution from
// node_modules (the published `double-eighteen` package).
const siblingCore = path.resolve(
  import.meta.dirname,
  '../double-eighteen/dist/index.js'
);
const coreAlias: Record<string, string> = fs.existsSync(siblingCore)
  ? { 'double-eighteen': siblingCore }
  : {};

export default defineConfig(() => ({
  root: import.meta.dirname,
  cacheDir: '../../node_modules/.vite/vendor/double-eighteen-react',
  resolve: {
    alias: {
      ...coreAlias,
    },
  },
  plugins: [
    react(),
    dts({
      entryRoot: 'src',
      tsconfigPath: path.join(import.meta.dirname, 'tsconfig.lib.json'),
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: ['src/**/*.spec.ts', 'src/**/*.spec.tsx', 'dev/**', 'e2e/**'],
    }),
  ],
  build: {
    outDir: './dist',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    lib: {
      entry: 'src/index.ts',
      name: 'double-eighteen-react',
      fileName: 'index',
      formats: ['es' as const],
    },
    rolldownOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', 'double-eighteen'],
    },
  },
  test: {
    name: 'double-eighteen-react',
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    reporters: ['default'],
  },
}));
