import { createRoute } from 'honox/factory'

export const GET = createRoute((c) => {
  return c.render('Home', {
    title: 'ホーム',
    message: 'Hono + Inertia + React のサンプルへようこそ！',
    features: [
      'HonoX によるファイルベースルーティング',
      '@hono/inertia による Inertia.js プロトコル対応',
      'react-dom/server による SSR',
      'React Context でのグローバルステート維持',
    ],
  })
})
