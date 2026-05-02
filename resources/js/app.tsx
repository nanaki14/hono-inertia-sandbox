import { hydrateRoot, createRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import { AppProvider } from './context/AppContext'

createInertiaApp({
  resolve(name) {
    // Vite のグロブインポートでページコンポーネントを解決
    const pages = import.meta.glob('./pages/**/*.tsx', { eager: true })
    const mod = pages[`./pages/${name}.tsx`] as { default: unknown }
    return mod.default
  },

  setup({ el, App, props }) {
    // AppProvider を Inertia App の外側に配置する。
    // これにより Inertia がページを切り替えても AppProvider はアンマウントされず
    // count / theme / notifications などのグローバルステートが維持される。
    const tree = (
      <AppProvider>
        <App {...props} />
      </AppProvider>
    )

    // data-server-rendered 属性がある場合は SSR ハイドレーション
    if (el?.hasAttribute('data-server-rendered')) {
      hydrateRoot(el, tree)
    } else {
      createRoot(el!).render(tree)
    }
  },
})
