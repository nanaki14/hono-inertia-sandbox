import { usePage, Link } from '@inertiajs/react'
import Layout from '../../components/Layout'

interface User {
  id: number
  name: string
  role: string
  avatar: string
}

interface UsersIndexProps {
  title: string
  users: User[]
}

export default function UsersIndex() {
  const { props } = usePage<UsersIndexProps>()

  return (
    <Layout title={props.title}>
      <h1 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>👥 ユーザー一覧</h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '1rem',
          maxWidth: '700px',
        }}
      >
        {props.users.map((user) => (
          <Link
            key={user.id}
            href={`/users/${user.id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div
              style={{
                padding: '1.5rem',
                backgroundColor: 'white',
                borderRadius: '10px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                textAlign: 'center',
                transition: 'box-shadow 0.2s, transform 0.2s',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{user.avatar}</div>
              <div style={{ fontWeight: 'bold', color: '#2d3748', marginBottom: '0.25rem' }}>
                {user.name}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#718096' }}>{user.role}</div>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  )
}
