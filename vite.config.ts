/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

/**
 * Two builds from one codebase:
 *
 *  - `vite build` (web, the default): code-split chunks under /assets with
 *    hashed names, so the landing page loads without the app, each mode
 *    loads on demand, and returning visitors hit the browser cache.
 *  - `vite build --mode standalone`: one self-contained HTML file (everything
 *    inlined) that opens from file:// — the downloadable offline copy and the
 *    GitHub Pages build. Uses hash routing (see src/router.ts).
 */
export default defineConfig(({ mode }) => {
  const standalone = mode === 'standalone';
  return {
    base: standalone ? './' : '/',
    plugins: [react(), ...(standalone ? [viteSingleFile()] : [])],
    build: standalone
      ? {
          outDir: 'dist-standalone',
          cssCodeSplit: false,
          assetsInlineLimit: 100_000_000,
        }
      : {
          rollupOptions: {
            output: {
              manualChunks(id: string) {
                if (!id.includes('node_modules')) return undefined;
                if (id.includes('@supabase')) return 'vendor-supabase';
                // Loaded on demand by src/analytics.ts; keep it out of shared chunks.
                if (id.includes('posthog-js')) return 'vendor-posthog';
                if (/node_modules\/(react|react-dom|scheduler)\//.test(id)) return 'vendor-react';
                return 'vendor';
              },
            },
          },
        },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
    },
  };
});
