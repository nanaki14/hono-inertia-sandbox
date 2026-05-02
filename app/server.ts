import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { inertia } from '@hono/inertia'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { rootView } from './root-view'
import { createUser, findUser, listUsers } from './data'

const app = new Hono()

if (!import.meta.env.DEV) {
  app.use('/assets/*', serveStatic({ root: './dist/client' }))
}

app.use(inertia({ rootView }))

const userInput = z.object({
  name: z.string().min(1, '名前は必須です'),
  email: z.string().email('正しいメールアドレスを入力してください'),
  bio: z.string().default(''),
})

const routes = app
  .get('/', (c) => c.render('Home', { message: 'Hono + Inertia + React' }))
  .get('/counter', (c) => c.render('Counter', {}))
  .get('/users', (c) => c.render('Users/Index', { users: listUsers() }))
  .get('/users/new', (c) =>
    c.render('Users/New', {
      values: { name: '', email: '', bio: '' },
      errors: {} as Record<string, string>,
    })
  )
  .get('/users/:id{[0-9]+}', (c) => {
    const id = Number(c.req.param('id'))
    const user = findUser(id)
    if (!user) return c.notFound()
    return c.render('Users/Show', { user })
  })
  .post(
    '/users',
    zValidator('form', userInput, (result, c) => {
      if (!result.success) {
        const errors: Record<string, string> = {}
        for (const issue of result.error.issues) {
          if (issue.path.length > 0) {
            errors[String(issue.path[0])] = issue.message
          }
        }
        return c.render('Users/New', {
          values: { name: '', email: '', bio: '' },
          errors,
        })
      }
    }),
    (c) => {
      const data = c.req.valid('form')
      const user = createUser(data)
      return c.redirect(`/users/${user.id}`, 303)
    }
  )

export type AppType = typeof routes

export default routes

if (!import.meta.env.DEV) {
  serve({ fetch: app.fetch, port: Number(process.env.PORT ?? 3000) }, (info) => {
    console.log(`Listening on http://localhost:${info.port}`)
  })
}
