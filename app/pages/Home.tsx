import { Head, Link } from '@inertiajs/react'
import type { PageProps } from '../pages.gen'
import Layout from './Layout'

export default function Home({ message }: PageProps<'Home'>) {
  return (
    <Layout>
      <Head title="Home" />
      <h1>{message}</h1>
      <p>Hono の <code>@hono/inertia</code> ミドルウェアを使った SSR + SPA のサンプルです。</p>
      <ul>
        <li><Link href="/counter">Counter</Link> — グローバルステートのデモ（ページ遷移後も維持）</li>
        <li><Link href="/users">Users</Link> — 一覧・詳細・新規作成（フォームバリデーション）</li>
      </ul>
    </Layout>
  )
}
