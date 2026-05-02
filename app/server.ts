import { createApp } from 'honox/server'
import { inertia } from '@hono/inertia'
// createInertiaApp を server-side で呼ぶことで
// buildSSRBody 互換の { head, body } が返り、正確なハイドレーションが可能になる
import { createInertiaApp } from '@inertiajs/react'
import { renderToString } from 'react-dom/server'
import { createElement } from 'react'
import { AppProvider } from '../resources/js/context/AppContext'

// SSR 用にページコンポーネントをビルド時に一括インポート
const pageModules = import.meta.glob('../resources/js/pages/**/*.tsx', {
  eager: true,
})

const app = createApp({
  init(app) {
    app.use(
      '*',
      inertia({
        version: '1',
        async rootView(page) {
          // createInertiaApp をサーバー側で実行（page + render を渡すと SSR モードになる）
          // 返り値: { head: string[], body: string }
          // body = buildSSRBody の出力:
          //   <script data-page="app" type="application/json">...</script>
          //   <div id="app" data-server-rendered="true">...SSR html...</div>
          const result = (await createInertiaApp({
            page,
            render: renderToString,
            resolve(name) {
              const key = `../resources/js/pages/${name}.tsx`
              const mod = pageModules[key] as { default: unknown }
              return mod.default
            },
            // setup は el: null（サーバー）で呼ばれ、React 要素を返す
            // AppProvider を外側に置くことでサーバーとクライアントのツリーを一致させる
            setup({ App, props }) {
              return createElement(AppProvider, null, createElement(App, props))
            },
          })) as { head: string[]; body: string }

          return `<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Hono + Inertia + React</title>
    ${result.head.join('\n    ')}
  </head>
  <body>
    ${result.body}
    <script type="module" src="/resources/js/app.tsx"></script>
  </body>
</html>`
        },
      }),
    )
  },
})

export default app
