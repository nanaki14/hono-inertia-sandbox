import { createRoute } from 'honox/factory'

export const GET = createRoute((c) => {
  return c.render('Counter', {
    title: 'グローバルカウンター',
    description:
      'このページのカウンターは React Context で管理されています。' +
      '他のページに移動してもリセットされません。',
  })
})
