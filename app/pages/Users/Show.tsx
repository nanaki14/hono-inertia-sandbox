import { Head, Link } from '@inertiajs/react'
import type { PageProps } from '../../pages.gen'
import Layout from '../Layout'

export default function UsersShow({ user }: PageProps<'Users/Show'>) {
  return (
    <Layout>
      <Head title={user.name} />
      <h1>{user.name}</h1>
      <p><strong>メール:</strong> {user.email}</p>
      <p><strong>自己紹介:</strong> {user.bio || '—'}</p>
      <Link href="/users" className="back-link">← 一覧に戻る</Link>
    </Layout>
  )
}
