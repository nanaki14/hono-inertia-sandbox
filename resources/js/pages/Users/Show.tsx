import { usePage, Link } from '@inertiajs/react'
import Layout from '../../components/Layout'
import { useApp } from '../../context/AppContext'

interface User {
  id: number
  name: string
  role: string
  avatar: string
  bio: string
  skills: string[]
}

interface UsersShowProps {
  title: string
  user: User
}

export default function UsersShow() {
  const { props } = usePage<UsersShowProps>()
  const { count, theme } = useApp()
  const { user } = props

  return (
    <Layout title={props.title}>
      <Link href="/users" style={{ color: '#3182ce', textDecoration: 'none', fontSize: '0.9rem' }}>
        ← ユーザー一覧に戻る
      </Link>

      <div
        style={{
          marginTop: '1.5rem',
          padding: '2rem',
          backgroundColor: theme === 'dark' ? '#2d3748' : 'white',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          maxWidth: '500px',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '4rem' }}>{user.avatar}</div>
          <h1 style={{ fontSize: '1.5rem', margin: '0.5rem 0 0.25rem' }}>{user.name}</h1>
          <span
            style={{
              display: 'inline-block',
              backgroundColor: '#ebf8ff',
              color: '#2b6cb0',
              padding: '2px 10px',
              borderRadius: '12px',
              fontSize: '0.8rem',
            }}
          >
            {user.role}
          </span>
        </div>

        <p style={{ color: '#4a5568', lineHeight: 1.6, marginBottom: '1.5rem' }}>{user.bio}</p>

        <div>
          <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#2d3748' }}>
            🛠️ スキル
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {user.skills.map((skill) => (
              <span
                key={skill}
                style={{
                  backgroundColor: '#f0fff4',
                  color: '#276749',
                  border: '1px solid #9ae6b4',
                  padding: '2px 10px',
                  borderRadius: '12px',
                  fontSize: '0.8rem',
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* コンテキストの値がページ遷移後も維持されていることを示す */}
      <div
        style={{
          marginTop: '1.5rem',
          padding: '1rem',
          backgroundColor: '#f7fafc',
          borderRadius: '8px',
          borderLeft: '4px solid #805ad5',
          fontSize: '0.9rem',
          maxWidth: '500px',
        }}
      >
        <strong>🔍 コンテキスト確認：</strong> このページに遷移後もグローバルカウンターの値は{' '}
        <strong style={{ color: '#3182ce' }}>{count}</strong> のまま維持されています。
      </div>
    </Layout>
  )
}
