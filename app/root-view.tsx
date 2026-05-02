import { readFileSync } from 'fs'
import { resolve } from 'path'
import type { RootView } from '@hono/inertia'
import { renderPage } from './ssr'

type ManifestEntry = { file: string; css?: string[] }
type Manifest = Record<string, ManifestEntry>

let _manifest: Manifest | null = null
const getManifest = (): Manifest | null => {
  if (_manifest) return _manifest
  try {
    _manifest = JSON.parse(
      readFileSync(resolve(process.cwd(), 'dist/client/.vite/manifest.json'), 'utf-8'),
    )
  } catch {
    _manifest = null
  }
  return _manifest
}

function buildHeadTags(): string {
  if (import.meta.env.PROD) {
    const manifest = getManifest()
    const entry = manifest?.['app/client.tsx']
    if (!entry) return ''
    const css = (entry.css ?? []).map((href) => `<link rel="stylesheet" href="/${href}">`).join('')
    return `${css}<script type="module" src="/${entry.file}"></script>`
  }
  return [
    `<script type="module" src="/@vite/client"></script>`,
    `<script type="module" src="/app/client.tsx"></script>`,
  ].join('')
}

export const rootView: RootView = async (page) => {
  const { head, body } = await renderPage(page)
  const headHtml = buildHeadTags() + head.join('')
  return `<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" />${headHtml}</head><body>${body}</body></html>`
}
