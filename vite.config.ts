import { defineConfig } from 'vite'
import devServer from '@hono/vite-dev-server'
import honox from 'honox/vite'
import { inertiaPages } from '@hono/inertia/vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(({ mode }) => {
  const alias = {
    '@': path.resolve(__dirname, 'resources/js'),
  }

  // Client-only bundle: Inertia React クライアント + ページコンポーネント
  if (mode === 'client') {
    return {
      plugins: [react()],
      resolve: { alias },
      build: {
        rollupOptions: {
          input: './resources/js/app.tsx',
          output: {
            entryFileNames: 'assets/[name]-[hash].js',
            chunkFileNames: 'assets/[name]-[hash].js',
            assetFileNames: 'assets/[name]-[hash][extname]',
          },
        },
        manifest: true,
        outDir: 'dist/public',
        emptyOutDir: true,
      },
    }
  }

  // Server bundle: HonoX ファイルベースルーティング + Inertia SSR
  return {
    plugins: [
      // HonoX: app/routes/ からファイルベースルーティングを生成
      honox({ app: 'app/server.ts' }),
      // @hono/inertia/vite: resources/js/pages/ からページ名の型を生成
      inertiaPages({
        pagesDir: 'resources/js/pages',
        outFile: 'resources/js/pages.gen.ts',
        serverModule: '../../app/server',
      }),
      devServer({ entry: 'app/server.ts' }),
    ],
    resolve: { alias },
    // React JSX トランスフォーム (tsconfig の jsxImportSource: 'react' を補強)
    esbuild: {
      jsxImportSource: 'react',
    },
    ssr: {
      // honox/vite が noExternal: true にするが、React は CJS なので external にする必要がある
      external: [
        'react',
        'react-dom',
        'react-dom/server',
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
        '@inertiajs/react',
        '@inertiajs/core',
      ],
    },
    build: {
      ssr: 'app/server.ts',
      outDir: 'dist',
      rollupOptions: {
        output: {
          entryFileNames: 'index.js',
        },
      },
    },
  }
})
