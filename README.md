# hono-inertia-sandbox

[Hono](https://hono.dev/) と [Vite](https://vitejs.dev/)、[@hono/inertia](https://github.com/honojs/middleware/tree/main/packages/inertia)、[Inertia.js](https://inertiajs.com/)（React）を組み合わせたサンプルです。ルートは `app/server.ts` で明示的に定義します。

## 技術スタック

| パッケージ | 役割 |
| --- | --- |
| [Hono](https://hono.dev/) | Web フレームワーク |
| [@hono/node-server](https://github.com/honojs/node-server) | Node での起動・静的ファイル配信（本番） |
| [@hono/vite-dev-server](https://github.com/honojs/vite-plugins/tree/main/packages/dev-server) | 開発時の Hono エントリ統合 |
| [@hono/inertia](https://github.com/honojs/middleware/tree/main/packages/inertia) | Hono 公式 Inertia.js アダプタ（`c.render` など） |
| [@hono/zod-validator](https://github.com/honojs/middleware/tree/main/packages/zod-validator) | Zod によるリクエスト検証 |
| [Inertia.js / React](https://inertiajs.com/) | サーバードリブン SPA（初回 SSR、以降は XHR でページ更新） |
| [React 19](https://react.dev/) | UI |
| [Vite](https://vitejs.dev/) | クライアント／SSR バンドル、`inertiaPages` による型生成 |
| [Zod](https://zod.dev/) | フォーム等のスキーマ検証 |

## 主な機能

- **明示的ルーティング** — `app/server.ts` で GET/POST を定義（HonoX のファイルルートは使用していない）
- **Inertia ページ** — `c.render('PageName', props)` で React ページを SSR し、クライアントでハイドレーション
- **ユーザー CRUD サンプル** — 一覧・詳細・作成（`POST /users` は Zod + `zValidator('json')`。Inertia の `useForm().post()` は JSON ボディのため `form` ではなく `json` ターゲットで検証）
- **カウンターとグローバル状態** — `Layout` 内の `StoreProvider` とモジュールスコープのストアで、ページ遷移後もカウントを維持

## ディレクトリ構成

```
├── app/
│   ├── server.ts           # Hono アプリ・ルート・本番では serve
│   ├── root-view.tsx       # HTML ラッパー・Vite / manifest 由来の script 注入
│   ├── ssr.tsx             # createInertiaApp + renderToString
│   ├── client.tsx          # クライアントエントリ（hydrateRoot / createRoot）
│   ├── data.ts             # インメモリのユーザーデータ
│   ├── pages.gen.ts        # @hono/inertia/vite が生成（編集しない）
│   ├── styles.css
│   ├── components/
│   │   └── context.tsx     # StoreProvider・useSelector（グローバル状態）
│   └── pages/
│       ├── Layout.tsx      # ナビ・StoreProvider
│       ├── Home.tsx
│       ├── Counter.tsx
│       └── Users/
│           ├── Index.tsx
│           ├── New.tsx
│           └── Show.tsx
├── vite.config.ts          # devServer(entry: app/server.ts), inertiaPages, client モード
└── package.json
```

## セットアップ

```bash
pnpm install
# または
npm install
```

## 開発サーバー

```bash
pnpm dev
# または
npm run dev
```

Vite の開発サーバー（既定では **http://localhost:5173**）経由で Hono が動きます。

## ビルドと本番起動

```bash
pnpm run build
# または
npm run build
```

クライアントを `dist/client`、サーバー SSR バンドルを `dist/server` に出力します。

```bash
pnpm start
# または
npm start
```

`node dist/server/index.js` を実行します。`PORT` 未指定時は **3000** です（`process.env.PORT` で変更可能）。

## グローバル状態の仕組み

`app/pages/Layout.tsx` でページ全体を `StoreProvider` で包み、`app/components/context.tsx` で React Context と **モジュールスコープの `globalState`** を組み合わせています。Inertia の遷移でレイアウトが再マウントされても、モジュール上の状態が残るためナビバーに出しているカウンター値がリセットされません。

## SSR の流れ

1. **`app/ssr.tsx`** — `createInertiaApp` に `page` と `renderToString` を渡し、`import.meta.glob` で `./pages/**/*.tsx` を解決
2. **`app/root-view.tsx`** — `@hono/inertia` の `RootView` として `renderPage` の結果を HTML に組み立て。開発時は Vite の HMR 用スクリプト、本番では `dist/client/.vite/manifest.json` からエントリ CSS/JS を読み込み
3. **`app/client.tsx`** — `el.dataset.serverRendered` があれば `hydrateRoot`、なければ `createRoot` でクライアントのみ描画
