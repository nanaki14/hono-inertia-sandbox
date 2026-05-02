import { defineConfig } from 'vite'
import devServer from '@hono/vite-dev-server'
import { inertiaPages } from '@hono/inertia/vite'

export default defineConfig(({ mode }) => {
  if (mode === 'client') {
    return {
      esbuild: { jsxImportSource: 'react' },
      build: {
        rollupOptions: { input: './app/client.tsx' },
        manifest: true,
        outDir: 'dist/client',
        emptyOutDir: true,
      },
    }
  }

  return {
    plugins: [
      inertiaPages(),
      devServer({ entry: 'app/server.ts' }),
    ],
    esbuild: { jsxImportSource: 'react' },
    ssr: {
      external: ['react', 'react-dom', 'react-dom/server', 'react/jsx-runtime', 'react/jsx-dev-runtime'],
    },
    build: {
      ssr: 'app/server.ts',
      outDir: 'dist/server',
    },
  }
})
