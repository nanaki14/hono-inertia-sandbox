import { createContext, useContext, useState, type ReactNode } from 'react'

interface AppState {
  /** ページ遷移をまたいで維持されるグローバルカウンター */
  count: number
  /** カラーテーマ */
  theme: 'light' | 'dark'
  /** お知らせバッジ数 */
  notifications: number
}

interface AppContextValue extends AppState {
  increment: () => void
  decrement: () => void
  reset: () => void
  toggleTheme: () => void
  addNotification: () => void
  clearNotifications: () => void
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [notifications, setNotifications] = useState(0)

  return (
    <AppContext.Provider
      value={{
        count,
        theme,
        notifications,
        increment: () => setCount((n) => n + 1),
        decrement: () => setCount((n) => Math.max(0, n - 1)),
        reset: () => setCount(0),
        toggleTheme: () => setTheme((t) => (t === 'light' ? 'dark' : 'light')),
        addNotification: () => setNotifications((n) => n + 1),
        clearNotifications: () => setNotifications(0),
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}
