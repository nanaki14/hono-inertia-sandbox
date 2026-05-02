import { Head, useForm } from '@inertiajs/react'
import type { PageProps } from '../../pages.gen'
import Layout from '../Layout'

export default function UsersNew({ values, errors }: PageProps<'Users/New'>) {
  const form = useForm(values)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    form.post('/users')
  }

  return (
    <Layout>
      <Head title="ユーザー作成" />
      <h1>ユーザー作成</h1>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="name">名前</label>
          <input
            id="name"
            name="name"
            value={form.data.name}
            onChange={(e) => form.setData('name', e.target.value)}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div className="field">
          <label htmlFor="email">メール</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.data.email}
            onChange={(e) => form.setData('email', e.target.value)}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="field">
          <label htmlFor="bio">自己紹介</label>
          <textarea
            id="bio"
            name="bio"
            value={form.data.bio}
            onChange={(e) => form.setData('bio', e.target.value)}
          />
          {errors.bio && <span className="error">{errors.bio}</span>}
        </div>
        <button type="submit" className="btn-primary" disabled={form.processing}>
          {form.processing ? '送信中...' : '作成'}
        </button>
      </form>
      <a href="/users" className="back-link">← 一覧に戻る</a>
    </Layout>
  )
}
