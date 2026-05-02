import { Link } from '@inertiajs/react'
import type { PropsWithChildren } from 'react'
import { StoreProvider, useSelector } from '../components/context'
import type { AppState } from '../components/context'

function NavBar() {
  const count = useSelector<AppState, number>((s) => s.count)
  return (
    <header>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/counter">Counter</Link>
        <Link href="/users">Users</Link>
        <span className="global-state">グローバルカウント: {count}</span>
      </nav>
    </header>
  )
}

export default function Layout({ children }: PropsWithChildren) {
  return (
    <StoreProvider initState={() => ({ count: 0 })}>
      <div className="app">
        <NavBar />
        <main>{children}</main>
      </div>
    </StoreProvider>
  )
}
