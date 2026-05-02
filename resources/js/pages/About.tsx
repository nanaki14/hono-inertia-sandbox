import { usePage } from '@inertiajs/react'
import Layout from '../components/Layout'

interface AboutProps {
  title: string
  stack: { name: string; description: string }[]
}

export default function About() {
  const { props } = usePage<AboutProps>()

  return (
    <Layout title={props.title}>
      <h1 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>🛠️ 技術スタック</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px' }}>
        {props.stack.map((item, i) => (
          <div
            key={item.name}
            style={{
              display: 'flex',
              gap: '1rem',
              padding: '1rem',
              backgroundColor: 'white',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: COLORS[i % COLORS.length],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '0.85rem',
                flexShrink: 0,
              }}
            >
              {i + 1}
            </div>
            <div>
              <div style={{ fontWeight: 'bold', color: '#2d3748' }}>{item.name}</div>
              <div style={{ fontSize: '0.875rem', color: '#718096' }}>{item.description}</div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  )
}

const COLORS = ['#3182ce', '#38a169', '#d69e2e', '#805ad5', '#e53e3e']
