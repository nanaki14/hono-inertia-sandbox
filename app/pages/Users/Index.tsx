import { Head, Link } from '@inertiajs/react'
import type { PageProps } from '../../pages.gen'
import Layout from '../Layout'

export default function UsersIndex({ users }: PageProps<'Users/Index'>) {
  return (
    <Layout>
      <Head title="ユーザー一覧" />
      <h1>ユーザー一覧</h1>
      <p><Link href="/users/new">＋ 新規作成</Link></p>
      <table>
        <thead>
          <tr>
            <th>名前</th>
            <th>メール</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td><Link href={`/users/${user.id}`}>詳細</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  )
}
