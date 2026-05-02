import { createInertiaApp, type ResolvedComponent } from '@inertiajs/react'
import { renderToString } from 'react-dom/server'
import type { PageObject } from '@hono/inertia'
import type { Page } from '@inertiajs/core'

const pages = import.meta.glob<{ default: ResolvedComponent }>('./pages/**/*.tsx')

export const renderPage = (page: PageObject) =>
  createInertiaApp({
    page: page as Page,
    render: renderToString,
    resolve: async (name) => {
      const loader = pages[`./pages/${name}.tsx`]
      if (!loader) throw new Error(`Inertia page not found: ${name}`)
      const mod = await loader()
      return mod.default
    },
    setup: ({ App, props }) => <App {...props} />,
  })
