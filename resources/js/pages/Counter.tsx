import { usePage, Link, router } from '@inertiajs/react'
import Layout from '../components/Layout'
import { useApp } from '../context/AppContext'

interface CounterProps {
  title: string
  description: string
}

export default function Counter() {
  const { props } = usePage<CounterProps>()
  const { count, increment, decrement, reset, theme } = useApp()

  return (
    <Layout title={props.title}>
      <h1 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>🔢 グローバルカウンター</h1>
      <p style={{ color: '#718096', marginBottom: '2rem', maxWidth: '500px' }}>
        {props.description}
      </p>

      {/* カウンター UI */}
      <div
        style={{
          display: 'inline-flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem',
          padding: '2.5rem',
          backgroundColor: theme === 'dark' ? '#2d3748' : 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          border: '1px solid #e2e8f0',
          marginBottom: '2rem',
        }}
      >
        <div
          style={{
            fontSize: '5rem',
            fontWeight: 'bold',
            color: '#3182ce',
            lineHeight: 1,
            minWidth: '120px',
            textAlign: 'center',
          }}
        >
          {count}
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={decrement} style={counterBtn('#e53e3e')} disabled={count === 0}>
            ➖ 減らす
          </button>
          <button onClick={increment} style={counterBtn('#38a169')}>
            ➕ 増やす
          </button>
          <button onClick={reset} style={counterBtn('#718096')} disabled={count === 0}>
            🔄 リセット
          </button>
        </div>
      </div>

      {/* ナビゲーションデモ */}
      <div
        style={{
          padding: '1.25rem',
          backgroundColor: '#fffbeb',
          borderRadius: '8px',
          borderLeft: '4px solid #d69e2e',
          maxWidth: '500px',
        }}
      >
        <strong>⚡ 試してみよう：</strong>
        <ol style={{ margin: '0.5rem 0 0 1rem', lineHeight: 1.8, color: '#4a5568' }}>
          <li>カウンターを任意の数にする</li>
          <li>下のリンクで他のページへ移動</li>
          <li>戻ってきてもカウンターの値が保持されている</li>
        </ol>
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', flexWrap: 'wrap' }}>
          <Link href="/">
            <button style={navBtn}>🏠 ホームへ</button>
          </Link>
          <Link href="/about">
            <button style={navBtn}>📖 概要へ</button>
          </Link>
          <Link href="/users">
            <button style={navBtn}>👥 ユーザーへ</button>
          </Link>
          <button onClick={() => router.reload()} style={navBtn}>
            🔃 ページ再読み込み
          </button>
        </div>
      </div>
    </Layout>
  )
}

const counterBtn = (bg: string): React.CSSProperties => ({
  backgroundColor: bg,
  color: 'white',
  border: 'none',
  padding: '0.6rem 1.2rem',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '0.9rem',
  fontWeight: 600,
  opacity: 1,
})

const navBtn: React.CSSProperties = {
  backgroundColor: '#edf2f7',
  color: '#4a5568',
  border: '1px solid #e2e8f0',
  padding: '0.5rem 1rem',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '0.85rem',
}
