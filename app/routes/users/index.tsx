import { createRoute } from 'honox/factory'

const USERS = [
  { id: 1, name: '山田 太郎', role: 'エンジニア', avatar: '🧑‍💻' },
  { id: 2, name: '鈴木 花子', role: 'デザイナー', avatar: '🎨' },
  { id: 3, name: '田中 次郎', role: 'プロダクトマネージャー', avatar: '📋' },
  { id: 4, name: '佐藤 美咲', role: 'QA エンジニア', avatar: '🔍' },
]

export const GET = createRoute((c) => {
  return c.render('Users/Index', {
    title: 'ユーザー一覧',
    users: USERS,
  })
})
