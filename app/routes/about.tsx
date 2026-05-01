import { createRoute } from 'honox/factory'

export const GET = createRoute((c) => {
  return c.render('About', {
    title: 'このアプリについて',
    stack: [
      { name: 'Hono', description: 'エッジ対応の高速 Web フレームワーク' },
      { name: 'HonoX', description: 'Hono のメタフレームワーク（ファイルベースルーティング・SSR）' },
      { name: '@hono/inertia', description: 'Hono 公式の Inertia.js アダプタ' },
      { name: 'Inertia.js', description: 'サーバードリブンの SPA プロトコル' },
      { name: 'React', description: 'UI ライブラリ（SSR + クライアントハイドレーション）' },
    ],
  })
})
