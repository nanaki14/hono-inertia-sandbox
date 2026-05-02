import './styles.css'
import { createInertiaApp, type ResolvedComponent } from '@inertiajs/react'
import { hydrateRoot, createRoot } from 'react-dom/client'

createInertiaApp({
  resolve: async (name) => {
    const pages = import.meta.glob<{ default: ResolvedComponent }>('./pages/**/*.tsx')
    const mod = await pages[`./pages/${name}.tsx`]()
    return mod.default
  },
  setup({ el, App, props }) {
    if (el.dataset.serverRendered) {
      hydrateRoot(el, <App {...props} />)
    } else {
      createRoot(el).render(<App {...props} />)
    }
  },
})
