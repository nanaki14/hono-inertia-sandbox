# hono-inertia-sandbox

Hono + HonoX + @hono/inertia + React のサンプルアプリケーション。

## 技術スタック

| パッケージ | 役割 |
|---|---|
| [Hono](https://hono.dev/) | Web フレームワーク |
| [HonoX](https://github.com/honojs/honox) | ファイルベースルーティング・メタフレームワーク |
| [@hono/inertia](https://github.com/honojs/middleware/tree/main/packages/inertia) | Hono 公式 Inertia.js アダプタ |
| [Inertia.js](https://inertiajs.com/) | サーバードリブン SPA プロトコル |
| [React 19](https://react.dev/) | UI ライブラリ |
| [react-dom/server](https://react.dev/reference/react-dom/server) | SSR（サーバーサイドレンダリング） |

## 主な機能

- **ファイルベースルーティング** — `app/routes/` 配下のファイルが自動でルートに対応
- **Inertia.js プロトコル** — 初回リクエストは SSR HTML、以降は XHR JSON ナビゲーション
- **SSR + ハイドレーション** — `createInertiaApp` を server-side で呼び出し、`buildSSRBody` 互換の HTML を生成
- **グローバルステート維持** — `AppProvider` を Inertia の `App` コンポーネントの外側に配置することで、ページ遷移後もステートをリセットしない

## ディレクトリ構成

```
├── app/
│   ├── server.ts               # HonoX サーバーエントリ + Inertia SSR
│   └── routes/
│       ├── index.tsx           # GET /
│       ├── about.tsx           # GET /about
│       ├── counter.tsx         # GET /counter
│       └── users/
│           ├── index.tsx       # GET /users
│           └── [id].tsx        # GET /users/:id
└── resources/js/
    ├── app.tsx                 # Inertia クライアントエントリ
    ├── pages.gen.ts            # @hono/inertia/vite が自動生成するページ型
    ├── context/
    │   └── AppContext.tsx      # グローバルステート（ページ遷移をまたいで維持）
    ├── components/
    │   └── Layout.tsx          # 共通レイアウト（ナビバー・グローバルステート表示）
    └── pages/
        ├── Home.tsx
        ├── About.tsx
        ├── Counter.tsx
        └── Users/
            ├── Index.tsx
            └── Show.tsx
```

## セットアップ

```bash
npm install
```

## 開発サーバー

```bash
npm run dev
```

http://localhost:5173 でアクセスできます。

## ビルド

```bash
# クライアントバンドル + サーバー SSR バンドル
npm run build
```

## グローバルステートの仕組み

`resources/js/app.tsx` で `AppProvider` を Inertia `App` の外側に配置:

```tsx
setup({ el, App, props }) {
  const tree = (
    <AppProvider>      {/* ← ここがポイント */}
      <App {...props} />  {/* Inertia がページを差し替えてもこれはアンマウントされない */}
    </AppProvider>
  )
  // ...
}
```

Inertia がページ遷移するとき、差し替わるのは `App` の内側（ページコンポーネント）のみ。  
`AppProvider` はマウントされ続けるため、`count` / `theme` / `notifications` などのステートが維持される。

## SSR の仕組み

`app/server.ts` の `rootView` 内で `createInertiaApp` をサーバー側から呼び出す:

```ts
const result = await createInertiaApp({
  page,               // Inertia ページオブジェクト
  render: renderToString,  // React SSR レンダラー
  resolve(name) { ... },
  setup({ App, props }) {
    // サーバー側では el: null で呼ばれる。React 要素を返す
    return createElement(AppProvider, null, createElement(App, props))
  },
})
// result.body = <script data-page="app" ...> + <div data-server-rendered="true" id="app">...html...</div>
```

クライアントは `data-server-rendered` 属性を検出して `hydrateRoot` を使用し、  
サーバーレンダリング済み HTML を再利用したハイドレーションを行う。
