import { Link } from '@inertiajs/react'
import { useApp } from '../context/AppContext'
import type { ReactNode } from 'react'

interface LayoutProps {
  title: string
  children: ReactNode
}

export default function Layout({ title, children }: LayoutProps) {
  const { count, theme, notifications, toggleTheme, addNotification, clearNotifications } = useApp()

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: theme === 'dark' ? '#1a1a2e' : '#f0f4f8',
        color: theme === 'dark' ? '#e2e8f0' : '#1a202c',
        fontFamily: "'Segoe UI', sans-serif",
        transition: 'background-color 0.3s, color 0.3s',
      }}
    >
      {/* ナビゲーションバー */}
      <nav
        style={{
          backgroundColor: theme === 'dark' ? '#16213e' : '#2b6cb0',
          padding: '0 1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
          height: '56px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        }}
      >
        <Link href="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1rem' }}>
          🚀 Hono Inertia
        </Link>

        <div style={{ display: 'flex', gap: '1rem', flex: 1 }}>
          <NavLink href="/">ホーム</NavLink>
          <NavLink href="/about">概要</NavLink>
          <NavLink href="/counter">カウンター</NavLink>
          <NavLink href="/users">ユーザー</NavLink>
        </div>

        {/* グローバルステート表示エリア（ページ遷移後も値が残ることを示すデモ） */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* グローバルカウンター値 */}
          <span
            style={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              color: 'white',
              padding: '2px 10px',
              borderRadius: '12px',
              fontSize: '0.85rem',
            }}
          >
            Count: <strong>{count}</strong>
          </span>

          {/* 通知バッジ */}
          <button
            onClick={notifications > 0 ? clearNotifications : addNotification}
            style={{
              position: 'relative',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1.2rem',
              color: 'white',
            }}
            title={notifications > 0 ? 'クリックでクリア' : '通知を追加'}
          >
            🔔
            {notifications > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  backgroundColor: '#e53e3e',
                  color: 'white',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  fontSize: '0.65rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                }}
              >
                {notifications}
              </span>
            )}
          </button>

          {/* テーマ切り替え */}
          <button
            onClick={toggleTheme}
            title="テーマ切り替え"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1.2rem',
              color: 'white',
            }}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </nav>

      {/* ページタイトルバー */}
      <div
        style={{
          backgroundColor: theme === 'dark' ? '#0d3b66' : '#3182ce',
          color: 'white',
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
        }}
      >
        {title}
      </div>

      {/* メインコンテンツ */}
      <main style={{ padding: '2rem 1.5rem', maxWidth: '900px', margin: '0 auto' }}>
        {children}
      </main>
    </div>
  )
}

function NavLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      style={{
        color: 'rgba(255,255,255,0.85)',
        textDecoration: 'none',
        fontSize: '0.9rem',
        padding: '4px 8px',
        borderRadius: '4px',
        transition: 'background-color 0.2s',
      }}
    >
      {children}
    </Link>
  )
}
