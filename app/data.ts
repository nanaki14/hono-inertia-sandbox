export type User = {
  id: number
  name: string
  email: string
  bio: string
}

let nextId = 5
const USERS: User[] = [
  { id: 1, name: '山田 太郎', email: 'taro@example.com', bio: 'Hono と React が大好きなフルスタックエンジニア。' },
  { id: 2, name: '鈴木 花子', email: 'hanako@example.com', bio: 'ユーザー体験にこだわる UI/UX デザイナー。' },
  { id: 3, name: '田中 次郎', email: 'jiro@example.com', bio: '開発チームとビジネス側をつなぐ PM。' },
  { id: 4, name: '佐藤 美咲', email: 'misaki@example.com', bio: '品質にこだわるテストエンジニア。' },
]

export const listUsers = (): User[] => [...USERS]

export const findUser = (id: number): User | undefined => USERS.find((u) => u.id === id)

export const createUser = (data: { name: string; email: string; bio: string }): User => {
  const user: User = { id: nextId++, ...data }
  USERS.push(user)
  return user
}
