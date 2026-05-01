import { usePage, Link } from '@inertiajs/react'
import Layout from '../components/Layout'
import { useApp } from '../context/AppContext'

interface HomeProps {
  title: string
  message: string
  features: string[]
}

export default function Home() {
  const { props } = usePage<HomeProps>()
  const { addNotification } = useApp()

  return (
    <Layout title={props.title}>
      <div style={{ maxWidth: '700px' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎉 {props.message}</h1>
        <p style={{ color: '#718096', marginBottom: '2rem' }}>
          このサンプルは SSR ハイドレーションと Inertia.js のページ遷移を組み合わせた実装例です。
        </p>

        <div
          style={{
            backgroundColor: 'white',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '1.5rem',
            marginBottom: '2rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}
        >
          <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#2d3748' }}>
            ✅ 実装済み機能
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {props.features.map((f) => (
              <li
                key={f}
                style={{
                  padding: '0.5rem 0',
                  borderBottom: '1px solid #f0f4f8',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <span style={{ color: '#38a169' }}>✓</span>
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link href="/counter">
            <button style={btnStyle('#3182ce')}>
              🔢 カウンターを試す
            </button>
          </Link>
          <Link href="/users">
            <button style={btnStyle('#38a169')}>
              👥 ユーザー一覧を見る
            </button>
          </Link>
          <button onClick={addNotification} style={btnStyle('#d69e2e')}>
            🔔 通知を追加してナビ移動
          </button>
        </div>

        <div
          style={{
            marginTop: '2rem',
            padding: '1rem',
            backgroundColor: '#ebf8ff',
            borderRadius: '8px',
            borderLeft: '4px solid #3182ce',
            fontSize: '0.9rem',
          }}
        >
          <strong>💡 グローバルステートデモ：</strong> ナビゲーションバー右上の Count・🔔・🌙 は
          React Context で管理されており、Inertia のページ遷移をしても値がリセットされません。
        </div>
      </div>
    </Layout>
  )
}

const btnStyle = (bg: string): React.CSSProperties => ({
  backgroundColor: bg,
  color: 'white',
  border: 'none',
  padding: '0.6rem 1.2rem',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '0.95rem',
  fontWeight: 600,
})
