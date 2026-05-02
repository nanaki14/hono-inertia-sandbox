import { createRoute } from 'honox/factory'

const USERS: Record<
  string,
  { id: number; name: string; role: string; avatar: string; bio: string; skills: string[] }
> = {
  '1': {
    id: 1,
    name: '山田 太郎',
    role: 'エンジニア',
    avatar: '🧑‍💻',
    bio: 'Hono と React が大好きなフルスタックエンジニア。',
    skills: ['TypeScript', 'React', 'Hono', 'Node.js'],
  },
  '2': {
    id: 2,
    name: '鈴木 花子',
    role: 'デザイナー',
    avatar: '🎨',
    bio: 'ユーザー体験にこだわる UI/UX デザイナー。',
    skills: ['Figma', 'CSS', 'React', 'TailwindCSS'],
  },
  '3': {
    id: 3,
    name: '田中 次郎',
    role: 'プロダクトマネージャー',
    avatar: '📋',
    bio: '開発チームとビジネス側をつなぐ PM。',
    skills: ['要件定義', 'ロードマップ策定', 'アジャイル', 'SQL'],
  },
  '4': {
    id: 4,
    name: '佐藤 美咲',
    role: 'QA エンジニア',
    avatar: '🔍',
    bio: '品質にこだわるテストエンジニア。',
    skills: ['E2Eテスト', 'Playwright', 'CI/CD', 'TypeScript'],
  },
}

export const GET = createRoute((c) => {
  const id = c.req.param('id')
  const user = USERS[id]

  if (!user) {
    return c.notFound()
  }

  return c.render('Users/Show', {
    title: user.name,
    user,
  })
})
