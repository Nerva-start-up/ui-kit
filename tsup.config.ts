import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'tsup';

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf-8'));
const src = (dir: string) => fileURLToPath(new URL(`./src/${dir}`, import.meta.url));

export default defineConfig({
  entry: {
    index:  'src/index.ts',
    motion: 'src/motion/variants.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  treeshake: true,
  minify: true,
  external: ['react', 'react-dom', ...Object.keys(pkg.dependencies ?? {})],
  esbuildOptions(options) {
    options.jsx = 'automatic';
    // Зеркалит алиасы из vite.config.ts/tsconfig.json — esbuild их не подхватывает сам
    options.alias = {
      '@components': src('components'),
      '@motion': src('motion'),
      '@stories': src('stories'),
      '@styles': src('styles'),
      '@tokens': src('tokens'),
      '@hooks': src('hooks'),
      '@lib': src('lib'),
    };
  },
});
