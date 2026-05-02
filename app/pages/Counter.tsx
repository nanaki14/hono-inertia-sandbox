import { Head } from '@inertiajs/react'
import type { PageProps } from '../pages.gen'
import Layout from './Layout'
import { useSelector, useDispatch } from '../components/context'
import type { AppState } from '../components/context'

function CounterBody() {
  const count = useSelector<AppState, number>((s) => s.count)
  const dispatch = useDispatch<AppState>()

  return (
    <>
      <div className="counter">
        <button onClick={() => dispatch((s) => ({ ...s, count: s.count - 1 }))}>−</button>
        <span>{count}</span>
        <button onClick={() => dispatch((s) => ({ ...s, count: s.count + 1 }))}>+</button>
      </div>
      <p style={{ marginTop: '1rem', color: '#6b7280', fontSize: '0.9rem' }}>
        他のページに移動してから戻っても、カウントはリセットされません。
      </p>
    </>
  )
}

export default function Counter(_: PageProps<'Counter'>) {
  return (
    <Layout>
      <Head title="Counter" />
      <h1>Counter</h1>
      <p>ページ遷移後もカウントが維持されます（グローバルステートのデモ）。</p>
      <CounterBody />
    </Layout>
  )
}
